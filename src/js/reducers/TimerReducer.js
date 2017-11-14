const _                         = require('underscore');
const moment                    = require('moment');
const Storage                   = require('../helpers/Storage');
const Logger                    = require('../utils/Logger');
const TimerEvents               = require('../enums/TimerEvents');
const { getIpcPingInterval }     = require('../helpers');
const { isElectronApp }         = require('../utils/utils');
const { TimerNotify,
    requestNotificationPermission } = require('../utils/Notification');

// Require ipcRenderer only in electron app
const { ipcRenderer }       = (isElectronApp()) ? window.require('electron') : {};

/* eslint-disable no-unused-vars */
let Debug = new Logger('Reducer');
/* eslint-enable no-unused-vars */

module.exports = function reducer(state={
    timers: {}
}, action) {

    switch(action.type) {
        case TimerEvents.TIMER_ADD: {
            let newTimer = action.payload;
            let id = newTimer.id;
            let newState = _.assign({}, state);

            Debug.log('Inital state', newState)

            // Request Notification permissions
            requestNotificationPermission();

            newState.timers[id] = newTimer;

            // Add local storage entry
            Storage.set(id, newTimer);

            return newState;
        }

        case TimerEvents.TIMER_DESTROY: {
            let id = action.payload;
            let newState = _.assign({}, state);

            // Remove timer from timers object
            delete newState.timers[id];

            // Remove from localStorage
            Storage.remove(id);

            return newState;
        }

        case TimerEvents.TIMER_START: {
            let id = action.payload;
            let newState = _.assign({}, state);

            let timer = newState.timers[id];
            timer.started = true;
            timer.startTime = moment.now();
            delete timer.editingTitle;
            delete timer.editingDuration;
            delete timer.editingPlannedTime;
            delete timer.editingDescription;

            // Start time tracker
            timer.timeTracker.start();

            if (isElectronApp()) {
                ipcRenderer.send(TimerEvents.TIMER_START, timer);
            }

            // Update local storage
            Storage.set(id, timer);

            return _.assign({}, state, newState);
        }

        case TimerEvents.TIMER_STOP: {
            let id = action.payload;
            let newState = _.assign({}, state);

            let timer = newState.timers[id];
            timer.started = false;
            timer.endTime = moment.now();
            // Save duration in case we want to start timer again
            timer.durationCycle = timer.duration;

            // Stop time tracker
            timer.timeTracker.stop();

            if (isElectronApp()) {
                ipcRenderer.send(TimerEvents.TIMER_STOP, timer);
            }

            // Update local storage
            Storage.set(id, timer);

            return _.assign({}, state, newState);
        }

        case TimerEvents.TIMER_RESET: {
            let id = action.payload;
            let newState = _.assign({}, state);

            let timer = newState.timers[id];
            timer.duration = 0;
            delete timer.durationCycle;
            delete timer.status;
            delete timer.pingedIpc;
            delete timer.timeout;

            // Reset the start date so we can start again from 0
            timer.startTime = moment.now();

            // Update local storage entry
            Storage.set(id, timer);

            return _.assign({}, state, newState);
        }

        case TimerEvents.TIMER_UPDATE: {
            let id = action.payload;
            let newState = _.assign({}, state);

            // Update the total duration of the running timer
            let timer = newState.timers[id];

            // Set duration as milliseconds count from the startTime
            let currentTime = moment();
            let timeDiff = currentTime.diff(timer.startTime);
            timeDiff = moment.duration(timeDiff).asMilliseconds();

            // Check to see if we have run this previously and combine the total duration
            timer.duration = (timer.durationCycle) ?
                (timeDiff + timer.durationCycle) :
                timeDiff;

            // Check if duration has reached planned time
            if (timer.plannedTime > 0) {
                let actualDuration = moment.duration(timer.duration);
                let plannedDuration = moment.duration(timer.plannedTime);
                let actualAsSecs = Math.round(actualDuration.asSeconds());
                let plannedAsSecs = plannedDuration.asSeconds();

                // The timer has reached its planned time
                // @TODO Should the timer be paused here?
                if (actualAsSecs === plannedAsSecs) {
                    timer.status = TimerEvents.TIMER_DONE;

                    // Fire notification
                    TimerNotify({timer});

                    // Electron alert
                    if (isElectronApp()) {
                        ipcRenderer.send(TimerEvents.TIMER_DONE, timer);
                    }
                }

                // The timer is in overtime!
                if (actualAsSecs > plannedAsSecs) {
                    timer.status = TimerEvents.TIMER_OVERTIME;
                    timer.pingedIpc = timer.pingedIpc || getIpcPingInterval(null);

                    // Reached ping timeout
                    if (actualAsSecs === timer.timeout) {
                        // Get new interval
                        timer.pingedIpc = getIpcPingInterval(timer.pingedIpc);

                        // Fire notification
                        TimerNotify({timer});

                        // Electron alert
                        if (isElectronApp()) {
                            ipcRenderer.send(TimerEvents.TIMER_OVERTIME, timer);
                        }

                        // Clear timeout prop
                        delete timer.timeout;
                    }

                    // Set timeout to ping the IPC
                    if (typeof(timer.timeout) === 'undefined') {
                        let pingIn = moment.duration(timer.pingedIpc, 's');

                        // Timeout as seconds because duration is in seconds
                        timer.timeout = Math.round(actualDuration.add(pingIn).asSeconds());
                    }
                }
            }

            // Update local storage entry
            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_TITLE_CHANGE_ON: {
            let id = action.payload;
            let newState = _.assign({}, state);

            // Set editingTitle prop as true
            let timer = newState.timers[id];
            timer.editingTitle = true;

            // Update local storage entry
            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_TITLE_CHANGE_OFF: {
            let id = action.payload;
            let newState = _.assign({}, state);

            // Delete editingTitle
            let timer = newState.timers[id];
            delete timer.editingTitle;

            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_TITLE_UPDATE: {
            let { id, title } = action.payload;
            let newState = _.assign({}, state);

            // Update title
            let timer = newState.timers[id];
            timer.title = title;

            // Update local storage entry
            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_DURATION_ON: {
            let id = action.payload.id;
            let newState = _.assign({}, state);

            // Set `editingDuration` as true
            let timer = newState.timers[id];
            timer.editingDuration = true;

            // Update local storage entry
            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_DURATION_OFF: {
            let id = action.payload.id;
            let newState = _.assign({}, state);

            // Delete `editingDuration` prop
            let timer = newState.timers[id];
            delete timer.editingDuration;

            // Update local storage entry
            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_DURATION_UPDATE: {
            let { id, timeStr } = action.payload;
            let newState = _.assign({}, state);

            /**
             * @TODO: Look into a way to parse `timeStr` with ISO 8601
             */
            let timer = newState.timers[id];
            timer.duration = moment.duration(timeStr).asMilliseconds();
            timer.durationCycle = timer.duration;
            delete timer.editingDuration;

            // Update local storage entry
            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_PLANNED_ON: {
            let id = action.payload.id;
            let newState = _.assign({}, state);

            // Set `editingPlannedTime` as true
            let timer = newState.timers[id];
            timer.editingPlannedTime = true;

            // Update local storage entry
            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_PLANNED_OFF: {
            let id = action.payload.id;
            let newState = _.assign({}, state);

            // Delete `editingDuration` prop
            let timer = newState.timers[id];
            delete timer.editingDuration;

            // Update local storage entry
            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_PLANNED_UPDATE: {
            let { id, timeStr } = action.payload;
            let newState = _.assign({}, state);

            /**
             * @TODO: Look into a way to parse `timeStr` with ISO 8601
             */
            let timer = newState.timers[id];
            timer.plannedTime = moment.duration(timeStr).asMilliseconds();
            delete timer.editingPlannedTime;

            // Update local storage entry
            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_DESCRIPTION_ON: {
            let id = action.payload.id;
            let newState = _.assign({}, state);

            // Set `editingDescription` as true
            let timer = newState.timers[id];
            timer.editingDescription = true;

            // Update local storage
            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_DESCRIPTION_OFF: {
            let id = action.payload.id;
            let newState = _.assign({}, state);

            // Delete `editingDescription` prop
            let timer = newState.timers[id];
            delete timer.editingDescription;

            // Update local storage entry
            Storage.set(id, timer);

            return newState;
        }

        case TimerEvents.TIMER_DESCRIPTION_UPDATE: {
            let { id, desc } = action.payload;
            let newState = _.assign({}, state);

            let timer = newState.timers[id];
            timer.description = desc;

            // Update local storage entry
            Storage.set(id, timer);

            return newState;
        }

        default:

    }

    return state;
};
