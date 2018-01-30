const _                = require('underscore');

const TimeTracker      = require('../utils/TimeTracker');
const { updateTimer}   = require('../actions/TimerActions');
const { store }            = require('../store');

class PersistStore {
    constructor() {
        let state = store.getState();

        // Build a time tracker on every timer
        _.each(state.TimerReducer.timers, (timer) => {
            let start = timer.started;

            timer.timeTracker = new TimeTracker(
                () => store.dispatch(updateTimer(timer.id)),
                {start}
            );
        });
    }
}

module.exports = PersistStore;
