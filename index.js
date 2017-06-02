const {
    app,
    ipcMain,
    Menu,
    BrowserWindow } = require('electron');
const menubar       = require('menubar');
const path          = require('path');
const url           = require('url');
const AppEvents     = require('./src/js/enums/AppEvents');
const TimerEvents   = require('./src/js/enums/TimerEvents');

/**
 *
 * Icons Map
 *
 */
const icons = {
    default: __dirname + '/src/img/app-icon.png',
    active: __dirname + '/src/img/app-icon-active.png',
    hover: __dirname + '/src/img/app-icon-hover.png'
}

/**
 *
 * Icon state
 *
 */
const iconState = {
    active: false
}

/**
 *
 * Context Menu
 *
 */
const selectionMenu = Menu.buildFromTemplate([
    {role: 'copy', accelerator: 'CmdOrCtrl+C'},
    {type: 'separator'},
    {role: 'selectall', accelerator: 'CmdOrCtrl+A'}
]);

const inputMenu = Menu.buildFromTemplate([
    {role: 'undo', accelerator: 'CmdOrCtrl+Z'},
    {role: 'redo', accelerator: 'Shift+CmdOrCtrl+Z'},
    {type: 'separator'},
    {role: 'cut', accelerator: 'CmdOrCtrl+X'},
    {role: 'copy', accelerator: 'CmdOrCtrl+C'},
    {role: 'paste', accelerator: 'CmdOrCtrl+V'},
    {type: 'separator'},
    {role: 'selectall', accelerator: 'CmdOrCtrl+A'}
]);

/**
 *
 * Get started with menubar
 *
 */
let mb = menubar({
    icon: icons.default,
    preloadWindow: true,
    width: 650,
    height: 420
});

/**
 *
 * Listen for App events
 *
 */
mb.on('ready', () => {});

mb.on('show', () => {
    if (!iconState.active) {
        mb.tray.setImage(icons.hover)
    }
});

mb.on('hide', () => {
    if (!iconState.active) {
        mb.tray.setImage(icons.default)
    }
});

/** Contect menu */
mb.app.on('browser-window-created', (event, win) => {
    win.webContents.on('context-menu', (e, params) => {
        const { selectionText, isEditable } = params;

        if (isEditable) {
            inputMenu.popup(win);
        } else if (selectionText && selectionText.trim() !== '') {
            selectionMenu.popup(win);
        }
    });
});

/**
 *
 * Listen for events from the renderer process
 *
 */
ipcMain.on('async-message', (event, arg) => {
    let timer = null;
    let status = '';
    let notification = null;

    switch(arg.event) {
        case AppEvents.QUIT:
            mb.app.quit();
            break;

        case TimerEvents.TIMER_START:
            iconState.active = true;
            mb.tray.setImage(icons.active);
            break;

        case TimerEvents.TIMER_STOP:
            iconState.active = false;
            mb.tray.setImage(icons.hover);
            break;

        case AppEvents.FOCUSED:
            let { focused } = arg.payload;
            mb.setOption('alwaysOnTop', focused);
            break;

        case TimerEvents.TIMER_DONE:
            break;

        case TimerEvents.TIMER_OVERTIME:
            break;
    }
});
