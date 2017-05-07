import { isElectronApp }    from '../utils/utils';
// Require ipcRenderer only in electron app
const { ipcRenderer }       = (isElectronApp()) ? window.require('electron') : {};

export default function reducer(state={
    menuOpen: false,
    focused: false
}, action) {

    switch(action.type) {

    }

    return state;
}
