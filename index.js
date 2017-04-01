const {
    app,
    Tray,
    Menu,
    ipcMain,
    BrowserWindow } = require('electron');
const menubar = require('menubar');
const path = require('path');
const url = require('url');

/**
 * Get started with menubar
 */
let mb = menubar({
    // icon: icons.default
    width: 650,
    height: 420
});

/**
 * Start the app
 */
mb.on('ready', () => {
    console.log('App is ready to go!');
});

/**
 * Listen for events from the renderer process
 */
ipcMain.on('async-message', (event, arg) => {
    console.log('EVENT', event);
    console.log('ARG', arg);
});
