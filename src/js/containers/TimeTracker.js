const _        = require('underscore');
const moment   = require('moment');
const Logger   = require('../components/Logger');
require('../vendors/moment-timer');

/* eslint-disable no-unused-vars */
let Debug = new Logger('TimeTracker');
/* eslint-enable no-unused-vars */

let TimeTracker = (callback, options) => {
    options = (typeof options !== 'undefined') ? options : {};

    let defaultOpts = {
        loop: true,
        start: false
    };

    options = _.assign({}, defaultOpts, options);

    return moment.duration(1, 'seconds').timer(options, callback);

};

module.exports = TimeTracker;
