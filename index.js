const {
    app,
    ipcMain,
    BrowserWindow } = require('electron');
const menubar = require('menubar');
const path = require('path');
const url = require('url');
const Events = require('./src/js/enums/events');

/**
 * Get started with menubar
 */
let mb = menubar({
    icon: __dirname + '/src/img/app-icon.png',
    width: 650,
    height: 420
});

/**
 * Start the app
 */
mb.on('ready', () => {});

/**
 * Listen for events from the renderer process
 */
ipcMain.on('async-message', (event, arg) => {
    switch(arg) {
        case Events.QUIT: {
            mb.app.quit();
        }
    }
});
