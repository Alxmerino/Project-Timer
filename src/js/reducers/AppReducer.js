import AppEvents            from '../enums/AppEvents';
import { isElectronApp }    from '../utils/utils';
// Require ipcRenderer only in electron app
const { ipcRenderer }       = (isElectronApp()) ? window.require('electron') : {};

export default function reducer(state={
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

            newState.focused = focused

            return newState;
        }
    }

    return state;
}
