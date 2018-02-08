const React = require('react');
const { connect } = require('react-redux');
const { push } = require('react-router-redux');
const PropTypes = require('prop-types');

const Toolbar = require('../../../components/Toolbar');
const AppIcon = require('../../../components/AppIcon');
const { Jira } = require('../../../components/Vendors');
const { requestAuthJira } = require('../../../actions/AppActions');

class LoginJira extends React.Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {};

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        // Redirect the user if logged in
        if (this.props.app.loggedIn) {
            this.props.dispatch(push('/app'));
        }
    }

    onInputChange(e) {
        const target = e.target;
        const value =
            target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    onSubmit(e) {
        e.preventDefault();

        const { dispatch } = this.props;

        dispatch(requestAuthJira(this.state));
    }

    render() {
        return (
            <div className="main-wrapper">
                <Toolbar />

                <div className="container container--app">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="app__title app__title--landing">
                                <AppIcon /> Project Timer
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="container container--app">
                    <div className="row">
                        <div className="col-xs-12">
                            <div>
                                Loging in with: <Jira />
                            </div>

                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="serverUrl">
                                        Jira Server
                                    </label>
                                    <input
                                        onChange={this.onInputChange}
                                        value={this.state.serverUrl}
                                        type="text"
                                        className="form-control"
                                        id="serverUrl"
                                        name="serverUrl"
                                        placeholder="https://jira.example.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        onChange={this.onInputChange}
                                        value={this.state.username}
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        onChange={this.onInputChange}
                                        value={this.state.password}
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="checkbox disabled">
                                    <label>
                                        <input
                                            onChange={this.onInputChange}
                                            checked={this.state.createAccount}
                                            type="checkbox"
                                            id="createAccount"
                                            name="createAccount"
                                            disabled
                                        />{' '}
                                        Create Saturn Account
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-default"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <footer className="container footer">
                    <div className="row">
                        <p className="col-xs-12">
                            &copy; 2017{' '}
                            <a
                                href="https://www.amayamedia.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Amaya Media
                            </a>
                        </p>
                    </div>
                </footer>
            </div>
        );
    }
}

LoginJira.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

/**
 *
 * @desc Modify the state to properties to passed onto the
 *       component
 *
 * @param  {Object} state
 * @return {Object}
 *
 */
const mapStateToProps = state => {
    return { app: state.AppReducer };
};

/**
 * @desc Returns dispatcher to use it within the component
 */
const mapDispatchToProps = dispatch => {
    return { dispatch };
};

LoginJira = connect(mapStateToProps, mapDispatchToProps)(LoginJira);

module.exports = LoginJira;
