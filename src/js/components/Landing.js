const React         = require('react');
const { connect }   = require('react-redux');
const { push }      = require('react-router-redux');
const PropTypes     = require('prop-types');

const Toolbar   = require('../components/Toolbar');
const AppIcon   = require('../components/AppIcon');
const { Jira }  = require('../components/Vendors');

class Landing extends React.Component {

    constructor(props) {
        super(props);

        console.log('PROPS', this.props);
    }

    componentWillMount() {
        // Redirect the user if logged in
        if (this.props.app.loggedIn) {
            this.props.dispatch(push('/app'));
        }
    }

    render() {
        return (
            <div className="main-wrapper">

                <Toolbar />

                <div className="container container--app">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="app__title app__title--landing"><AppIcon /> Project Timer</h1>
                        </div>
                    </div>
                </div>

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

                <footer className="container footer">
                    <div className="row">
                        <p className="col-xs-12">&copy; 2017 <a href="https://www.amayamedia.com" target="_blank" rel="noopener noreferrer">Amaya Media</a></p>
                    </div>
                </footer>

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
