import _        from 'underscore'
import moment   from 'moment'
import Storage  from '../helpers/Storage'
import Logger   from '../components/Logger'

let Debug = new Logger('Reducer');

export default function reducer(state={
    timers: []
}, action) {

    switch(action.type) {
        case 'TIMER_ADD': {
            let newTimer = action.payload;
            let id = newTimer.id;
            let newState = _.assign({}, state);

            // Add local storage entry
            Storage.set(id, newTimer);

            newState.timers.push(newTimer);

            return newState;
        }

        case 'TIMER_DESTROY': {
            let id = action.payload
            let newState = _.assign({}, state);

            // Remove timer from timers array
            newState.timers = _.reject(newState.timers, (timer) => {
                if (timer.id === id) {

                    // Stop if running
                    if (timer.started) {
                        timer.timeTracker.stop();
                    }

                    return timer;
                }
            });

            // Remove from localStorage
            // TODO find way to add prefix
            Storage.remove(['projectTimer:'+id]);

            return newState;
        }

        case 'TIMER_TOGGLE': {
            let id = action.payload;
            let newState = _.assign({}, state);

            // Pause running timer and toggle matching timer by ID
            newState.timers = _.map(newState.timers, (timer) => {
                if (timer.id === id) {
                    timer.started = !timer.started;

                    // Update local storage
                    Storage.set(id, timer);
                } else {
                    timer.started = false;
                }

                // Start/Stop timer
                if (timer.started) {
                    timer.startTime = moment.now();
                    timer.timeTracker.start();
                } else {
                    timer.endTime = moment.now();
                    timer.timeTracker.stop();
                }

                return timer;
            });

            return _.assign({}, state, newState);
        }

        case 'TIMER_UPDATE': {
            let id = action.payload;
            let newState = _.assign({}, state);

            // Update the total duration of the running timer
            newState.timers = _.map(newState.timers, (timer) => {
                if (timer.id === id) {
                    let currentTime = moment();
                    let timeDiff = currentTime.diff(timer.startTime);

                    // Set endTime
                    timer.endTime = moment.now();

                    // Set duration as milliseconds count from the startTime
                    timer.duration = moment.duration(timeDiff).asMilliseconds();

                    // Update local storage entry
                    Storage.set(id, timer);
                }

                return timer;
            });

            return newState;
        }
    }

    return state;
}
