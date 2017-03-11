import Logger from '../components/Logger'
import _ from 'underscore';
let Debug = new Logger('Reducer');

export default function reducer(state={
    timers: []
}, action) {

    switch(action.type) {
        case 'TIMER_ADD': {
            let newTimer = action.payload;
            let id = newTimer.id;
            let newState = _.assign({}, state);

            newState.timers.push(newTimer);

            return newState;
        }

        case 'TIMER_DESTROY': {
            let id = action.payload
            let newState = _.assign({}, state);

            newState.timers = _.reject(newState.timers, (timer) => {
                return timer.id === id;
            });

            return newState;
        }

        case 'TIMER_TOGGLE': {
            let id = action.payload;
            let newState = _.assign({}, state);

            // Pause running timer and toggle matching timer by ID
            newState.timers = _.map(newState.timers, (timer) => {
                if (timer.id === id) {
                    timer.started = !timer.started;
                } else {
                    timer.started = false;
                }

                // Start/Stop timer
                if (timer.started) {
                    timer.timeTracker.start();
                } else {
                    timer.timeTracker.stop();
                }

                return timer;
            });

            return _.assign({}, state, newState);
        }

        case 'TIMER_UPDATE': {
            let newState = _.assign({}, state);

            // Update the total duration of the running timer
            newState.timers = _.map(newState.timers, (timer) => {
                if (timer.id === action.payload) {

                    // Add a millisecon on every update
                    // @TODO find better way to do this
                    timer.duration += 1000;
                }

                return timer;
            });

            return newState;
        }
    }

    return state;
}
