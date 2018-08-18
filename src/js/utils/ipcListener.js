const _ = require('underscore');
const { ipcRenderer } = window.require('electron');
const AppEvents = require('../enums/AppEvents');
const AppActions = require('../actions/AppActions');
const TimerAction = require('../actions/TimerActions');
const actions = _.assign({}, AppActions, TimerAction);

const ipcListener = (dispatch, getState) => {

    /** Handle successful API response */
    ipcRenderer.on(AppEvents.API_RESPONSE, (event, response) => {
        // @TODO: Use Logger on dev
        // Dispatch success response
        if (actions.hasOwnProperty(response.onSuccess)) {
            const onSuccess = actions[response.onSuccess];
            dispatch(onSuccess(response));
        }
    });

    /** Handle API error response */
    ipcRenderer.on(AppEvents.API_ERROR, (event, response) => {
        // @TODO: Use Logger on dev
        // Dispatch error response
        console.log('RESPONSE', response);
        if (actions.hasOwnProperty(response.onError)) {
            const onError = actions[response.onError];
            dispatch(onError(response));
        }

        // Dispatch Status specific error code
        const status = response.response.status;
        const statusError = `${response.onError}${status}`;
        if (typeof status !== 'undefined' && actions.hasOwnProperty(statusError)) {
            const statusErrorFn = actions[statusError];
            dispatch(statusErrorFn(response));
        }
    });
}

module.exports = ipcListener;
