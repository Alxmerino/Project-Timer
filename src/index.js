const React            = require('react');
const { render }       = require('react-dom');
const { Provider }     = require('react-redux');

const App              = require('./js/components/App');
const Logger           = require('./js/components/Logger');
const PersistStore     = require('./js/helpers/PersistStore');
const store            = require('./js/store');

/* eslint-disable no-unused-vars */
const Debug = new Logger('App');
/* eslint-enable no-unused-vars */
new PersistStore();

// Distpatch initial app load
store.dispatch({type: 'APP_LOADED'});

render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('app'));
