import moment from 'moment'
import '../vendors/moment-timer'

import { updateTimer } from '../actions'
import Logger from '../components/Logger'
let Debug = new Logger('TimeTracker');

let TimeTracker = (callback) => {

    return moment.duration(1, 'seconds').timer({
        loop: true,
        start: false
    }, callback);

}

export default TimeTracker;
