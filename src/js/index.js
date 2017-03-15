'use strict';

import React            from 'react';
import { render }       from 'react-dom';
import { Provider }     from 'react-redux';

import App              from './components/App';
import Logger           from './components/Logger';
import PersistStore     from './helpers/PersistStore';
import store            from './store';

const app = document.getElementById('app');
/* eslint-disable no-unused-vars */
const Debug = new Logger('App');
/* eslint-enable no-unused-vars */
new PersistStore();

// Distpatch initial app load
store.dispatch({type: 'APP_LOADED'});

render(<Provider store={store}>
    <App/>
</Provider>, app);
