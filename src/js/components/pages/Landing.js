const React         = require('react');
const { connect }   = require('react-redux');
const { push }      = require('react-router-redux');
const PropTypes     = require('prop-types');

const Toolbar       = require('../../components/Toolbar');
const Header        = require('../../components/Header');
const Footer        = require('../../components/Footer');
const { Jira }      = require('../../components/Vendors');

class Landing extends React.Component {

    componentWillReceiveProps(props) {
        // Redirect the user if logged in
        if (props.app.loggedIn) {
            props.dispatch(push('/app'));
        }
    }

    render() {
        return (
            <div className="main-wrapper">

                <Toolbar />

                <Header />

                <div className="container container--app">
                    <div className="row">
                        <div className="col-xs-12">
                            <p>Log in with:</p>
                            <ul className="list-group">
                                <li className="list-group-item"><button className="btn btn-link btn-xs" onClick={this.props.onJiraLogin}><Jira /></button></li>
                                <li className="list-group-item"><button className="btn btn-link btn-xs" onClick={this.props.onSkip}>Skip Log in</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        );
    }
}

Landing.propTypes = {
    onJiraLogin: PropTypes.func.isRequired,
    onSkip:     PropTypes.func.isRequired,
}

/**
 *
 * @desc Modify the state to properties to passed onto the
 *       component
 *
 * @param  {Object} state
 * @return {Object}
 *
 */
const mapStateToProps = (state) => {
    return { app: state.AppReducer };
};

/**
 * @desc Maps the dispatcher onto properties to pass onto the
 *       component
 *
 * @type {Object}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        onJiraLogin: () => {
            dispatch(push('/login/jira'));
        },
        onSkip: () => {
            dispatch(push('/app'));
        }
    }
}

Landing = connect(
    mapStateToProps,
    mapDispatchToProps
)(Landing)

module.exports = Landing;
