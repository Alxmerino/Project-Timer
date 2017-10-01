const {
    app,
    BrowserWindow,
    Tray,
    Menu,
    ipcMain
    } = require('electron');
const { isDev } = require('./src/js/utils/utils');
const AppEvents = require('./src/js/enums/AppEvents');
const events = require('events');
const path = require('path');
const url = require('url');

class App {

    constructor() {
        this.win = null;
        this.cachedBounds
        this.event = new events.EventEmitter();
        this.opts = {
            state: {
                active: false,
            },
            icons: {
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
            }
        });

        /** App Events */
        ipcMain.on(AppEvents.CLOSE, this.hideWindow.bind(this));
        ipcMain.on(AppEvents.MINIMIZE, this.minimizeWindow.bind(this));

        // When tray icon is clicked
        this.event.on(AppEvents.TRAY_CLICKED, this.onTrayClicked.bind(this));
    }

    /**
     * When the app is ready to run
     * @return {void}
     */
    appReady() {
        this.initAppTray();
        // Create app window
        this.createWindow();
    }

    /**
     * Initialize menu bar tray icon
     * @return {void}
     */
    initAppTray() {
        let { default: iconPath } = this.opts.icons;
        this.tray = new Tray(iconPath);

        // Tray listeners
        this.tray.on('click', (e, bounds) => {
            this.event.emit(AppEvents.TRAY_CLICKED, e, bounds);
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
            frame: false
        });

        // Load the index.html of the app
        // let indexPath = (isDev()) ? 'build/index.html' : 'index.html';
        this.win.loadURL(url.format({
            pathname: path.join(__dirname, 'build/index.html'),
            protocol: 'file:',
            slashes: true
        }));

        // Emmited when the window is closed.
        this.win.on('closed', () => {
            this.win = null;
        });
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

    /**
     * Show broswer window
     * @return {void}
     */
    showWindow(trayPos) {
        if (!this.win) {
            this.createWindow();
        }

        this.event.emit(AppEvents.SHOW);

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
        this.event.emit(AppEvents.HIDE);
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
        this.event.emit(AppEvents.MINIMIZE);
        this.win.minimize();
    }
}

/**
 * Fire up the app
 */
new App();
