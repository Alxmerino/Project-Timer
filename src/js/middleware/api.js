const axios = require('axios');
const { isElectronApp }    = require('../utils/utils');
const AppEvents = require('../enums/AppEvents');

const api = ({dispatch, getState}) => next => action => {
    if (action.type !== AppEvents.API) {
        return next(action);
    }

    let { url, method, onSuccess, data, onError } = action.payload;

    // Set default method if not defined
    method = (typeof method !== 'undefined') ? method : 'GET';

    // Set data if any
    data = (typeof data !== 'undefined') ? data : {};

    if (isElectronApp()) {
        // route request through electron app
    }

    // Make HTTP request
    axios({
        method,
        url,
        data
    })
    .then(data => dispatch(onSuccess(data)))
    .catch(error => dispatch(onError(error)));
}

module.exports = api;
