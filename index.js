const {
    app,
    BrowserWindow,
    Tray,
    Menu,
    ipcMain
} = require('electron');
const { isDev } = require('./src/js/utils/utils');
const apiRequest = require('./src/js/utils/apiRequest');
const AppEvents = require('./src/js/enums/AppEvents');
const TimerEvents = require('./src/js/enums/TimerEvents');
const menuTmpl = require('./src/js/helpers/menuTemplate');
const path = require('path');
const url = require('url');
const http = require('http');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');

class App {

    constructor() {
        this.serverPort = isDev()
            ? 3000 // Common local port
            : 47700; // Relatively "safe" port to use for prod
        this.assignedPort = null;
        this.server = null;
        this.win = null;
        this.cachedBounds = null;
        this.menu = {
            selectionMenu: null,
            inputMenu: null
        }
        this.timers = {};
        this.opts = {
            state: {
                iconActive: false,
                alwaysOnTop: false
            },
            icon: {
                default: __dirname + '/src/img/app-icon.png',
                active: __dirname + '/src/img/app-icon-active.png',
                hover: __dirname + '/src/img/app-icon-hover.png'
            }
        }

        this.initListeners();
    }

    /**
     * Initialize app listeners
     * @return {void}
     */
    initListeners() {
        /** On App Ready */
        app.on(AppEvents.READY, this.appReady.bind(this));

        /** On App Activate*/
        app.on(AppEvents.ACTIVATE, () => {
            if (this.win === null) {
                this.createWindow();
            } else {
                this.showWindow();
            }
        });

        /** Window Ecents */
        app.on(AppEvents.WINDOW_CREATED, this.onWindowCreated.bind(this));
        app.on(AppEvents.CLOSE, this.hideWindow.bind(this));

        /** App Events */
        ipcMain.on(AppEvents.CLOSE, this.hideWindow.bind(this));
        ipcMain.on(AppEvents.MINIMIZE, this.minimizeWindow.bind(this));
        ipcMain.on(AppEvents.QUIT, this.onQuit.bind(this));
        ipcMain.on(AppEvents.FOCUSED, this.onAppFocused.bind(this));

        /** Timer events */
        ipcMain.on(TimerEvents.TIMER_START, this.onTimerStart.bind(this));
        ipcMain.on(TimerEvents.TIMER_STOP, this.onTimerStop.bind(this));

        // When tray icon is clicked
        app.on(AppEvents.TRAY_CLICKED, this.onTrayClicked.bind(this));
        app.on(AppEvents.SHOW, this.toggleTrayIcon.bind(this, true));
        app.on(AppEvents.HIDE, this.toggleTrayIcon.bind(this, false));

        /** Context menu */
        app.on(AppEvents.CONTEXT_MENU, this.onContextMenu.bind(this));

        /** API events */
        ipcMain.on(AppEvents.API_REQUEST, this.onApiEvents.bind(this));
    }

    /**
     * When the app is ready to run
     * @return {void}
     */
    appReady() {
        this.initAppTray();
        // Create app window
        this.createWindow();
        // Create app menu
        this.createMenu();
    }

    /**
     * Initialize menu bar tray icon
     * @return {void}
     */
    initAppTray() {
        let { default: iconPath } = this.opts.icon;
        this.tray = new Tray(iconPath);

        // Tray listeners
        this.tray.on('click', (e, bounds) => {
            app.emit(AppEvents.TRAY_CLICKED, e, bounds);
        });
    }

    /**
     * Create a new browser window
     * @return {void}
     */
    createWindow() {
        // Create the browser
        this.win = new BrowserWindow({
            width: 650,
            height: 420,
            minWidth: 400,
            minHeight: 365,
            frame: false
        });

        this.createStaticServer((port) => {
            console.log(`http://localhost:${port}`);
            this.win.loadURL(`http://localhost:${port}`);

            // Open dev tools if in dev mode
            // if (isDev()) {
                this.win.webContents.openDevTools();
            // }

            // Emmited when the window is closed.
            this.win.on('closed', () => {
                this.win = null;
            });

            /** Emmited when window focus is lost */
            this.win.on(AppEvents.BLUR, () => {
                if (this.opts.state.alwaysOnTop) {
                    return;
                }

                this.hideWindow();
            });
        });
    }

    /**
     * Create a static server to serve React App
     * @param {Function} callback
     * @return {void}
     */
    createStaticServer(callback) {
        // Return port 3000 if in dev mode
        // if (isDev()) {
        //     console.log('Dev', this.serverPort)
        //     return callback(this.serverPort);
        // }

        // Server has been created, lets return with the callback
        if (this.server !== null) {
            return callback(this.server.address().port);
        }

        // Load the start url for the app
        const staticUrl = isDev()
            ? path.join(__dirname, '/build')
            : path.join(__dirname);

        // Create static server
        const serve = serveStatic(staticUrl);

        this.server = http.createServer((req, res) => {
            serve(req, res, finalhandler(req, res));
        }).listen(this.serverPort, () => {
            callback(this.server.address().port);
        });
    }

    /**
     * Creates application menu
     * @return {void}
     */
    createMenu() {
        const menuTemplate = menuTmpl.getMenuTemplate(app);
        const menu = Menu.buildFromTemplate(menuTemplate);
        const editMenu = menuTmpl.editMenu.submenu;
        const selectionMenu = menuTmpl.selectionMenu;

        // Add context menus
        this.menu.inputMenu = Menu.buildFromTemplate(editMenu);
        this.menu.selectionMenu = Menu.buildFromTemplate(selectionMenu);

        Menu.setApplicationMenu(menu);
    }

    /**
     * On menu bar tray icon click
     * @param  {object} e
     * @param  {object} bounds
     * @return {void}
     */
    onTrayClicked(e, bounds) {
        if (this.win && this.win.isVisible()) {
            return this.hideWindow();
        }

        // Cache tray position
        this.cachedBounds = bounds;
        this.showWindow(this.cachedBounds);
    }

    toggleTrayIcon(show) {
        let { state, icon } = this.opts;
        /** Remove highlight mode by default */
        this.tray.setHighlightMode('never');

        // Bail if timer is running
        if (state.iconActive) {
            return;
        }

        if (show) {
            this.tray.setImage(icon.hover);
            this.tray.setHighlightMode('always');
        } else {
            this.tray.setImage(icon.default);
            this.tray.setHighlightMode('never');
        }
    }

    /**
     * Emit context menu event when the browser window is created
     * @param  {Object} event
     * @param  {Object} win
     * @return {void}
     */
    onWindowCreated(event, win) {
        // Fire context menu event
        win.webContents.on(AppEvents.CONTEXT_MENU, (e, params) => {
            app.emit(AppEvents.CONTEXT_MENU, params, win);
        });
    }

    /**
     * Fire context menu
     * @param  {Object} event
     * @param  {Object} params
     * @return {void}
     */
    onContextMenu(params, win) {
        const { selectionText, isEditable } = params;

        if (isEditable) {
            this.menu.inputMenu.popup(win)
        } else if (selectionText && selectionText.trim() !== '') {
            this.menu.selectionMenu.popup(win);
        }
    }

    /**
     * Quit the app
     * @return {void}
     */
    onQuit() {
        app.quit();
    }

    /**
     * Set on/off always on top
     * @param  {Object} event
     * @param  {Boolean} focus
     * @return {void}
     */
    onAppFocused(event, focus) {
        this.opts.state.alwaysOnTop = focus;
    }

    /**
     * On timer start change tray icon and update app timers object
     * @return {void}
     */
    onTimerStart(event, timer) {
        const { icon } = this.opts;

        this.opts.state.iconActive = true;
        this.tray.setHighlightMode('never');
        this.tray.setImage(icon.active);
        this.timers[timer.id] = timer;
    }

    /**
     * On timer stop change tray icon and update timers object
     */
    onTimerStop(event, timer) {
        const { icon } = this.opts;

        /** Remove timer from list */
        if (timer.id in this.timers) {
            delete this.timers[timer.id];
        }

        /** Only change icon if no timers are active */
        if (Object.keys(this.timers).length === 0) {
            this.opts.state.iconActive = false;

            this.tray.setHighlightMode('always');
            this.tray.setImage(icon.hover);
        } else {
            this.tray.setImage(icon.active);
        }
    }

    /**
     * Show broswer window
     * @return {void}
     */
    showWindow(trayPos) {
        if (!this.win) {
            this.createWindow();
        }

        app.emit(AppEvents.SHOW);

        this.win.show();
    }

    /**
     * Hide browser window
     * @return {void}
     */
    hideWindow() {
        if (!this.win) {
            return;
        }

        // Hide window
        app.emit(AppEvents.HIDE);
        this.win.hide();
    }

    /**
     * Minimize browser window
     * @return {void}
     */
    minimizeWindow() {
        if (!this.win) {
            return;
        }

        // Minimize window
        app.emit(AppEvents.MINIMIZE);
        this.win.minimize();
    }

    /**
     * Handles API requests
     *
     * @param {Object} event
     * @param {Object} data
     */
    onApiEvents(event, config) {
        apiRequest(config)
            .then(response => {
                // Use Logger on dev
                // Combine response with any meta props
                const data = (config.hasOwnProperty('meta'))
                    ? Object.assign(response.data, config.meta, config)
                    : response.data;

                event.sender.send(AppEvents.API_RESPONSE, data);
            })
            .catch(error => {
                // Use Logger on dev
                // Combine response with any meta props
                const data = (config.hasOwnProperty('meta'))
                    ? Object.assign(
                        {
                            message: error.toString(),
                            response: error.response
                        },
                        config.meta, config
                    )
                    : {
                        message: error.toString(),
                        response: error.response
                    };

                console.log('ERROR', error)
                console.log('ERROR DATA', data)
                event.sender.send(AppEvents.API_ERROR, data);
            });
    }
}

/**
 * Fire up the app
 */
new App();
