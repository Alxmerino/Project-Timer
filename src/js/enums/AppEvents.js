/**
 *
 * @desc List of enums used for the app options. It's in CommonJS-like
 *       format as some of these are used in the electron side of the app
 * @type {Object}
 *
 */
/* eslint-disable no-undef */
module.exports = {
    READY:          'ready',
    ACTIVATE:       'activate',
    SHOW:           'show',
    HIDE:           'hide',

    TRAY_CLICKED:   '__app_tray_clicked',

    QUIT:           '__app_quit',
    FOCUSED:        '__app_focused',
    MENU_TOGGLE:    '__app_menu_open',

    CLOSE:          '__app_close',
    MINIMIZE:       '__app_minimize',
};
