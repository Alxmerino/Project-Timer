const {
    app,
    ipcMain,
    BrowserWindow } = require('electron');
const menubar = require('menubar');
const path = require('path');
const url = require('url');
const AppEvents = require('./src/js/enums/AppEvents');
const TimerEvents = require('./src/js/enums/TimerEvents');

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
