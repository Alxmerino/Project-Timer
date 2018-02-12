const AppEvents            = require('../enums/AppEvents');
const { isElectronApp }    = require('../utils/utils');
const Storage              = require('../helpers/Storage');
// Require ipcRenderer only in electron app
const { ipcRenderer }      = (isElectronApp()) ? window.require('electron') : {};

module.exports = function reducer(state={
    menuOpen: false,
    focused: false,
    loggedIn: false,
    messages: {},
    login_info: {},
}, action) {

    switch(action.type) {
        case AppEvents.APP_READY: {
            // let { loggedIn } = action.payload;
            let newState = Object.assign({}, state);

            // newState.loggedIn = loggedIn;

            return newState;
        }

        case AppEvents.MENU_TOGGLE: {
            let { menuOpen } = action.payload;
            let newState = Object.assign({}, state);

            newState.menuOpen = menuOpen;

            return newState;
        }

        case AppEvents.FOCUSED: {
            let { focused } = action.payload;
            let newState = Object.assign({}, state);

            newState.focused = focused;

            if (isElectronApp()) {
                ipcRenderer.send(AppEvents.FOCUSED, newState.focused);
            }

            return newState;
        }

        case AppEvents.JIRA_SET_LOGIN_COOKIE: {
            console.log('API PAYLOAD', action.payload);
            const { payload } = action;
            const { session } = payload;
            let newState = Object.assign({}, state);

            newState.loggedIn = true;

            // Set JIRA cookie
            const cookie = session.name + '=' + session.value;

            newState.login_info = Object.assign({}, {
                cookie,
                api_url: payload.api_url,
            });

            // Save JIRA info on local storage
            Storage.set('jira_login', newState.login_info);

            return newState;
        }

        case AppEvents.JIRA_LOGIN_ERROR: {
            const { message } = action.payload;
            let newState = Object.assign({}, state);
            newState.messages.error = `Failed to login: ${message}`;

            return newState;
        }

        default:
    }

    return state;
};
