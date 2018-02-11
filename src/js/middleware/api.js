const apiRequest = require('../utils/apiRequest');
const { isElectronApp } = require('../utils/utils');
// Require ipcRenderer only in electron app
const { ipcRenderer } = (isElectronApp()) ? window.require('electron') : {};
const AppEvents = require('../enums/AppEvents');

const api = ({dispatch, getState}) => next => action => {
    if (action.type !== AppEvents.API_REQUEST) {
        return next(action);
    }

    let { onSuccess, onError } = action.payload;

    // // Set default method if not defined
    // method = (typeof method !== 'undefined') ? method : 'GET';

    // // Set data if any
    // data = (typeof data !== 'undefined') ? data : {};

    if (isElectronApp()) {
        ipcRenderer.send(AppEvents.API_REQUEST, action.payload);
        return;
    }

    // Make HTTP request
    apiRequest(action.payload)
        .then(data => dispatch(onSuccess(data)))
        .catch(error => dispatch(onError(error)));
}

module.exports = api;
