const {
    createStore,
    combineReducers,
    applyMiddleware }           = require('redux');
const { createBrowserHistory }  = require('history');
const thunk                     = require('redux-thunk').default;
const {
    routerReducer,
    routerMiddleware }  = require('react-router-redux');

const Storage           = require('./helpers/Storage');
const Logger            = require('./utils/Logger');
const TimerReducer      = require('./reducers/TimerReducer');
const AppReducer        = require('./reducers/AppReducer');
const api               = require('./api/api');

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

// Create browser history
const history = createBrowserHistory();

// Combine reducers
const rootReducer = combineReducers({
    TimerReducer,
    AppReducer,
    router: routerReducer
});

// Apply middleware
const _middlewares = [];

// Add router middleware
_middlewares.push(routerMiddleware(history));

// Add thunk middleware
_middlewares.push(thunk.withExtraArgument(api));

// Add logger on development only
if (process.env.NODE_ENV === 'development') {
    const logger = require('redux-logger');
    _middlewares.push(logger());
}
const middleware = applyMiddleware(..._middlewares);

module.exports = {
    history,
    store: createStore(rootReducer, preloadedState, middleware),
}
