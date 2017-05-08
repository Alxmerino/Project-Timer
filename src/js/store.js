'use strict';

import {
    createStore,
    combineReducers,
    applyMiddleware }   from 'redux';
import logger           from 'redux-logger';
import _                from 'underscore';

import Storage          from './helpers/Storage';
import Logger           from './components/Logger';
import TimerReducer     from './reducers/TimerReducer';
import AppReducer       from './reducers/AppReducer';

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
const middleware = applyMiddleware(logger());

export default createStore(rootReducer, preloadedState, middleware);
