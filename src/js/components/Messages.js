const React             = require('react');
const { connect }       = require('react-redux');
const { push }          = require('react-router-redux');
const PropTypes         = require('prop-types');

class Messages extends React.Component {
    /**
     * Render login link if Unauthorize (401)
     */
    loginLink() {
        const { status } = this.props.app.messages;
        if (status && status === 401) {
            return (<span>Unauthorize, please <button className="btn btn-link" onClick={this.props.onLoginClick}>Log in</button></span>);
        } else {
            return null;
        }
    }

    render() {
        const { messages } = this.props.app;

        if (messages.error) {
            return (
                <div className="alert alert-danger" role="alert">{ messages.error } { this.loginLink() }</div>
            );
        } else {
            return null;
        }
    }
}

Messages.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onLoginClick: PropTypes.func,
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
 * @desc Returns dispatcher to use it within the component
 */
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        onLoginClick: () => {
            console.log('SHOULD REDIRECT');
            dispatch(push('/login/jira'));
        }
    };
};

Messages = connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages);

module.exports = Messages;
