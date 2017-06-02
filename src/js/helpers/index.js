const _      = require('underscore');
const moment = require('moment');
require('moment-duration-format');

/**
 *
 * @desc Format duration time string
 * @param  {Number} time
 * @param  {string} format
 * @return {String}
 *
 */
const formatTime = (time, format) => {
    format = (typeof(format) !== 'undefined') ? format : 'minutes';

    return moment.duration(time, format).format('h:mm:ss', { trim: false });
};

/**
 *
 * @desc Get total timer duration in specified format
 * @param {Number} duration
 * @param  {String} format
 * @return {Number}
 *
 */
const getTimeIn = (duration, format) => {
    if (!duration) {
        return 0;
    }

    switch(format) {
        case 'minutes': {
            return ((duration/1000) / 60);
        }

        case 'milliseconds': {
            return (duration*1000);
        }

        case 'seconds':
        default: {
            return (duration/1000);
        }
    }
};

/**
 *
 * @desc Get minute interval to ping electron app when app
 *       is in overtime
 * @param  {Number} pingArray
 * @return {Number}
 *
 */
const getIpcPingInterval = (ping) => {
    // @TODO Hacky way so it keeps returning last interval
    // 35 minutes
    let lastPingInterval = 2100;
    // 5, 15, 30, minutes
    let pingIntervalArray = [300, 900, 1800];
    let pingIndex = _.indexOf(pingIntervalArray, ping);

    // We just started pinging
    if (typeof(ping) === 'undefined' || ping === null) {
        return pingIntervalArray[0];
    }

    // We maxed out the ping array
    if (ping === lastPingInterval) {
        return lastPingInterval;
    }

    return pingIntervalArray[pingIndex+1] || lastPingInterval;
};

module.exports = {
    getTimeIn,
    formatTime,
    getIpcPingInterval
};
