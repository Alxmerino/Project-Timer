import _        from 'underscore';
import moment   from 'moment';
import Storage  from '../helpers/Storage';
import Logger   from '../components/Logger';

/* eslint-disable no-unused-vars */
let Debug = new Logger('Reducer');
/* eslint-enable no-unused-vars */

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
            let id = action.payload;
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

        case 'TIMER_START': {
            let id = action.payload;
            let newState = _.assign({}, state);

            newState.timers = _.map(newState.timers, (timer) => {
                if (timer.id === id) {
                    timer.started = true;
                    timer.startTime = moment.now();
                    delete timer.editingTitle;

                    // Start time tracker
                    timer.timeTracker.start();

                    // Update local storage
                    Storage.set(id, timer);
                }

                return timer;
            });

            return _.assign({}, state, newState);
        }

        case 'TIMER_STOP': {
            let id = action.payload;
            let newState = _.assign({}, state);

            newState.timers = _.map(newState.timers, (timer) => {

                if (timer.id === id) {
                    timer.started = false;
                    timer.endTime = moment.now();
                    // Save duration in case we want to start timer again
                    timer.durationCycle = timer.duration;

                    // Stop time tracker
                    timer.timeTracker.stop();

                    // Update local storage
                    Storage.set(id, timer);
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
                    // Set duration as milliseconds count from the startTime
                    let currentTime = moment();
                    let timeDiff = currentTime.diff(timer.startTime);
                    timeDiff = moment.duration(timeDiff).asMilliseconds();

                    // Check to see if we have run this previously and combine the total duration
                    timer.duration = (timer.durationCycle) ?
                        (timeDiff + timer.durationCycle) :
                        timeDiff;

                    // Update local storage entry
                    Storage.set(id, timer);
                }

                return timer;
            });

            return newState;
        }

        case 'TIMER_TITLE_CHANGE_ON': {
            let id = action.payload;
            let newState = _.assign({}, state);

            // Set editingTitle prop as true
            newState.timers = _.map(newState.timers, (timer) => {
                // Add editingTitle
                if (timer.id === id) {
                    if (!timer.editingTitle) {
                        timer.editingTitle = true;
                    }

                    // Update local storage entry
                    Storage.set(id, timer);
                }

                return timer;
            });

            return newState;
        }

        case 'TIMER_TITLE_CHANGE_OFF': {
            let id = action.payload;
            let newState = _.assign({}, state);

            // Delete editingTitle
            newState.timers = _.map(newState.timers, (timer) => {
                // Delete editingTitle prop
                if (timer.id === id) {
                    delete timer.editingTitle;

                    // Update local storage entry
                    Storage.set(id, timer);
                }

                return timer;
            });

            return newState;
        }

        case 'TIMER_TITLE_UPDATE': {
            let id = action.payload.id;
            let title = action.payload.title;
            let newState = _.assign({}, state);

            // Update title
            newState.timers = _.map(newState.timers, (timer) => {
                if (timer.id === id) {
                    timer.title = title;
                    delete timer.editingTitle;

                    // Update local storage entry
                    Storage.set(id, timer);
                }

                return timer;
            });

            return newState;
        }

        case 'TIMER_DURATION_ON': {
            let id = action.payload.id;
            let prop = action.payload.prop;
            let newState = _.assign({}, state);

            // Set `prop` as true
            newState.timers = _.map(newState.timers, (timer) => {
                if (timer.id === id) {
                    timer[prop] = true;

                    // Update local storage entry
                    Storage.set(id, timer);
                }

                return timer;
            });

            return newState;
        }

        case 'TIMER_DURATION_OFF': {
            let id = action.payload.id;
            let prop = action.payload.prop;
            let newState = _.assign({}, state);

            // Delete `prop`
            newState.timers = _.map(newState.timers, (timer) => {
                if (timer.id === id) {
                    delete timer[prop];

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
