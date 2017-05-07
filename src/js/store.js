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

/* eslint-disable no-unused-vars */
const Debug = new Logger('Store');
/* eslint-enable no-unused-vars */

// Default state
const preloadedState = {};

const persistState = (() => {
    let timers = Storage.all();

    preloadedState.timers = _.toArray(timers);
});

persistState();

// Apply middleware
const middleware = applyMiddleware(logger());

export default createStore(reducer, preloadedState, middleware);
