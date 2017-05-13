'use strict';

const React            = require('react');
const { render }       = require('react-dom');
const { Provider }     = require('react-redux');

const App              = require('./components/App');
const Logger           = require('./components/Logger');
const PersistStore     = require('./helpers/PersistStore');
const store            = require('./store');

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
