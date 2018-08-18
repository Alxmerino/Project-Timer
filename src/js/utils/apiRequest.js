const axios = require('axios');

const apiRequest = (config) => {
    let { url, method, data, meta, headers } = config;

    // Combine url
    url = meta.api_url + url;

    // Set default method if not defined
    method = (typeof method !== 'undefined') ? method : 'GET';

    // Set data if any
    data = (typeof data !== 'undefined') ? data : {};

    // Set headers
    headers = (typeof headers !== 'undefined') ? headers : {};

    // Use Logger on dev
    // console.log({ method, url, data, headers });

    return axios({
        method,
        url,
        data,
        headers,
    });
}

module.exports = apiRequest
