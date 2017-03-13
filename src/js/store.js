import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import _ from 'underscore'

import Storage from './helpers/Storage'
import Logger from './components/Logger'
import reducer from './reducers'

const Debug = new Logger('Store');


// Default state
const preloadedState = {};

const persistState = (() => {
    let timers = Storage.all();

    preloadedState.timers = _.toArray(timers);
})();
// Apply middleware
const middleware = applyMiddleware(logger());

export default createStore(reducer, preloadedState, middleware);
