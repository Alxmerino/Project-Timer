const moment = require('moment');
require('moment-duration-format');

/**
 * @desc Format duration time string
 * @param  {Number} time
 * @param  {string} format
 * @return {String}
 */
const formatTime = (time, format) => {
    format = (typeof(format) !== 'undefined') ? format : 'minutes';

    return moment.duration(time, format).format('h:mm:ss', { trim: false });
};

/**
 * @desc Get total timer duration in specified format
 * @param {Number} duration
 * @param  {String} format
 * @return {Number}
 */
const getTimeIn = (duration, format) => {
    if (!duration) {
        return 0;
    }

    switch(format) {
        case 'minutes': {
            return ((duration/1000) / 60);
        }

        case 'seconds':
        default: {
            return (duration/1000);
        }
    }
};

module.exports = {
    getTimeIn,
    formatTime
};
