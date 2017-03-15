import _        from 'underscore';
import moment   from 'moment';
import Logger   from '../components/Logger';
import          '../vendors/moment-timer';

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

export default TimeTracker;
