/**
 *
 * @desc List of enums used for the app options. It's in CommonJS-like
 *       format as some of these are used in the electron side of the app
 * @type {Object}
 *
 */
/* eslint-disable no-undef */
module.exports = {
    READY:                  'ready',
    ACTIVATE:               'activate',
    SHOW:                   'show',
    HIDE:                   'hide',
    WINDOW_CREATED:         'browser-window-created',
    CONTEXT_MENU:           'context-menu',
    BLUR:                   'blur',

    TRAY_CLICKED:           '__app_tray_clicked',

    QUIT:                   '__app_quit',
    FOCUSED:                '__app_focused',
    MENU_TOGGLE:            '__app_menu_open',

    CLOSE:                  '__app_close',
    MINIMIZE:               '__app_minimize',

    API_REQUEST:            '__app_api_request',
    API_RESPONSE:           '__app_api_response',
    API_ERROR:              '__app_api_error',
    API_ERROR_401:          '__app_api_error_401',

    JIRA_SET_LOGIN_COOKIE:  '__app_set_jira_cookie',
    JIRA_LOGIN_ERROR:       '__app_jira_login_error',
    JIRA_IS_LOGGED_IN:      '__app_jira_is_logged_in',
};
