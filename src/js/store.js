const {
    createStore,
    combineReducers,
    applyMiddleware }   = require('redux');

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

(function persistState() {
    let timers = Storage.all();

    preloadedState.TimerReducer.timers = timers;
})();

// Combine reducers
const rootReducer = combineReducers({
    TimerReducer,
    AppReducer
});

// Apply middleware
const _middlewares = [];

// Add logger on development only
if (process.env.NODE_ENV === 'development') {
    const logger = require('redux-logger');
    _middlewares.push(logger());
}
const middleware = applyMiddleware(..._middlewares);

module.exports = createStore(rootReducer, preloadedState, middleware);
