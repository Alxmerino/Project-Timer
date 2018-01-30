const axios = require('axios');

/**
 * Create HTTP request
 * @param  {String} url
 * @param  {String} method
 * @param  {Object} data
 * @param  {Object} config
 * @return {Promise}
 */
const request = (url, method, data = {}, config = {}) => {
    let requestOptions = {
        url,
        method,
        // headers: { 'Content-Type': 'application/json' },
    };

    // Add data if any
    if (Object.keys(data).length > 0) {
        requestOptions.data = data;
    }

    // Add more config options if any
    if (Object.keys(config).length > 0) {
        requestOptions = Object.assign({}, requestOptions, config);
    }

    console.log('OPTIONS', requestOptions);
    return axios(requestOptions);
};

/**
 * Creates a HTTP GET request
 * @param  {String} url
 * @param  {Object} params
 * @return {Promise}
 */
const get = (url, params) => {
    return request(url, 'GET', {}, params);
};

/**
 * Creates a HTTP POST request
 * @param  {String} url
 * @param  {Object} params
 * @return {Promise}
 */
const post = (url, data, params) => {
    return request(url, 'POST', data, params);
};

const loginWithJira = params => {
    const { serverUrl, username, password } = params;
    console.log('PARAMS', { serverUrl, username, password: '****' });

    return get('https://jira.vectormediagroup.com/rest/api/2/issue/FIR-1', {
        auth: {
            username: 'rene',
            password: 'AlexanderJira1?',
        },
    });
    // return post(`${serverUrl}/rest/auth/1/session`, {
    //     username,
    //     password,
    // });
};

module.exports = {
    loginWithJira,
};
