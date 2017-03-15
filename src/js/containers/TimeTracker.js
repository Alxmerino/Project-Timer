import _        from 'underscore';
import moment   from 'moment';
import Logger   from '../components/Logger';
import          '../vendors/moment-timer';

let Debug = new Logger('TimeTracker');

let TimeTracker = (callback, options) => {
    Debug.log('Init new TimeTracker');
    options = (typeof options !== 'undefined') ? options : {};

    let defaultOpts = {
        loop: true,
        start: false
    };

    options = _.assign({}, defaultOpts, options);

    return moment.duration(1, 'seconds').timer(options, callback);

};

export default TimeTracker;
