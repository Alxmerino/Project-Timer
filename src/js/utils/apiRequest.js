const axios = require('axios');

const apiRequest = (config) => {
    let { url, method, data } = config;

    // Set default method if not defined
    method = (typeof method !== 'undefined') ? method : 'GET';

    // Set data if any
    data = (typeof data !== 'undefined') ? data : {};

    return axios({
        method,
        url,
        data
    });
}

module.exports = apiRequest
