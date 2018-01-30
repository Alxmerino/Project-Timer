const React               = require('react');
const { Route }           = require('react-router');
const { render }          = require('react-dom');
const { Provider }        = require('react-redux');
const { ConnectedRouter } = require('react-router-redux');

const App                 = require('./js/components/App');
const Landing             = require('./js/components/Landing');
const LoginJira           = require('./js/components/login/Jira');
const Logger              = require('./js/utils/Logger');
const PersistStore        = require('./js/helpers/PersistStore');
const { history, store }  = require('./js/store');

/* eslint-disable no-unused-vars */
const Debug = new Logger('App');
/* eslint-enable no-unused-vars */
new PersistStore();

render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            <Route exact path="/" component={Landing}/>
            <Route path="/login/jira" component={LoginJira} />
            <Route path="/app" component={App}/>
        </div>
    </ConnectedRouter>
    {/* <App/> */}
</Provider>, document.getElementById('app'));

/** Distpatch initial app load */
store.dispatch({type: 'APP_LOADED'});
