import _                from 'underscore'
import moment           from 'moment'
import                       '../vendors/moment-timer'

import Logger           from '../components/Logger'
import { updateTimer }  from '../actions'
import store            from '../store'

let Debug = new Logger('TimeTracker');

let TimeTracker = (callback, options) => {
    options = (typeof options !== 'undefined') ? options : {};

    let defaultOpts = {
        loop: true,
        start: false
    }

    options = _.assign({}, defaultOpts, options);

    return moment.duration(1, 'seconds').timer(options, callback);

}

export default TimeTracker;
