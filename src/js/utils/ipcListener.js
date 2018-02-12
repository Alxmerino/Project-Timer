const { ipcRenderer } = window.require('electron');
const AppEvents = require('../enums/AppEvents');
const actions = require('../actions/AppActions')

const ipcListener = (dispatch, getState) => {

    /** Handle successful API response */
    ipcRenderer.on(AppEvents.API_RESPONSE, (event, response) => {
        // Dispatch success response
        if (actions.hasOwnProperty(response.onSuccess)) {
            const onSuccess = actions[response.onSuccess];
            dispatch(onSuccess(response));
        }
    });

    /** Handle API error response */
    ipcRenderer.on(AppEvents.API_ERROR, (event, response) => {
        // Dispatch error response
        if (actions.hasOwnProperty(response.onError)) {
            const onError = actions[response.onError];
            dispatch(onError(response));
        }
    });
}

module.exports = ipcListener;
