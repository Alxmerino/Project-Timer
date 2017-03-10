import moment from 'moment'
import 'moment-duration-format'

/**
 * @desc Format duration time string
 * @param  {Number} time
 * @param  {string} format
 * @return {String}
 */
export const formatTime = (time, format) => {
    format = (typeof(format) !== 'undefined') ? format : 'minutes';

    return moment.duration(time, format).format('h:mm:ss', { trim: false });
}
