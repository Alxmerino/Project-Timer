const React             = require('react');
const { connect }       = require('react-redux');
const { push }          = require('react-router-redux');
const PropTypes         = require('prop-types');

const Toolbar           = require('../../../components/Toolbar');
const Header            = require('../../../components/Header');
const Footer            = require('../../../components/Footer');
const { Jira }          = require('../../../components/Vendors');
const { loginWithJira } = require('../../../actions/AppActions');

class LoginJira extends React.Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {};

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Redirect the user if logged in
        this.redirect(this.props.app.loggedIn);
    }

    componentWillReceiveProps(props) {
        // Redirect the user if logged in
        this.redirect(props.app.loggedIn);
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

        dispatch(loginWithJira(this.state));
    }

    /**
     * Redirect user if logged
     *
     * @param {Object} props
     */
    redirect(loggedIn) {
        if (loggedIn) {
            this.props.dispatch(push('/app'));
        }
    }

    /**
     * Render form messages
     */
    renderMessages() {
        const { messages } = this.props.app;

        if (messages.error) {
            return (<div className="alert alert-danger" role="alert">{ messages.error }</div>);
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="main-wrapper">
                <Toolbar />

                <Header showAddTimer={false} />

                <div className="container container--app">
                    <div className="row">
                        <div className="col-xs-12">
                            <div>
                                Loging in with: <Jira />
                            </div>

                            { this.renderMessages() }

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

                <Footer />

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
