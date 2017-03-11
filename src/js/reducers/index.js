import Logger from '../components/Logger'
import _ from 'underscore';
let Debug = new Logger('Reducer');

export default function reducer(state={
    timers: [],
    timeTracker: undefined
}, action) {

    switch(action.type) {
        case 'TIMER_ADD': {
            let newTimer = action.payload.timer.timer;
            let id = newTimer.id;
            let newState = Object.assign({}, state);

            newState.timers.push(newTimer);

            return newState;
        }

        case 'TIMER_DESTROY': {
            let id = action.payload
            let newState = Object.assign({}, state);

            newState.timers = _.reject(newState.timers, (timer) => {
                return timer.id === id;
            });

            return newState;
        }

        case 'TIMER_TOGGLE': {
            let id = action.payload;

            // Pause running timer and toggle matching timer by ID
            let newState = _.mapObject(state, (timer) => {
                timer.started = (timer.id === id) ? !timer.started : false;

                return timer;
            });

            return Object.assign({}, state, newState);
        }
    }

    return state;
}
