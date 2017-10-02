const AppEvents            = require('../enums/AppEvents');
const { isElectronApp }    = require('../utils/utils');
// Require ipcRenderer only in electron app
const { ipcRenderer }      = (isElectronApp()) ? window.require('electron') : {};

module.exports = function reducer(state={
    menuOpen: false,
    focused: false
}, action) {

    switch(action.type) {
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

        default:
    }

    return state;
};
