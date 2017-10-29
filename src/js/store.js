const {
    createStore,
    combineReducers,
    applyMiddleware }   = require('redux');
const _                 = require('underscore');

const Storage           = require('./helpers/Storage');
const Logger            = require('./components/Logger');
const TimerReducer      = require('./reducers/TimerReducer');
const AppReducer        = require('./reducers/AppReducer');

/* eslint-disable no-unused-vars */
const Debug = new Logger('Store');
/* eslint-enable no-unused-vars */

// Default state
const preloadedState = {
    TimerReducer: {}
};

const persistState = (() => {
    let timers = Storage.all();

    preloadedState.TimerReducer.timers = _.toArray(timers);
});

persistState();

// Combine reducers
const rootReducer = combineReducers({
    TimerReducer,
    AppReducer
});

// Apply middleware
const middleware = applyMiddleware();

module.exports = createStore(rootReducer, preloadedState, middleware);
