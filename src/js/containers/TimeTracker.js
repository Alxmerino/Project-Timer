import _ from 'underscore'
import moment from 'moment'
import '../vendors/moment-timer'

import { updateTimer } from '../actions'
import Logger from '../components/Logger'
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
