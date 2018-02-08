const React     = require('react');
const PropTypes = require('prop-types');
const { connect }   = require('react-redux');

const AppEvents     = require('../enums/AppEvents');
const Logger        = require('../utils/Logger');

let Debug = new Logger('Modal');

let Modal = ({loggedIn}) => {

    let isUserLoggedIn = (loggedIn) ? 'app-modal--open' : '';

    return (
        <div className={`app-modal ${isUserLoggedIn}`}>
            <div className="app-modal__box">
                <div className="app-modal__header">
                    <button className="btn btn-default pull-right app-modal__close">×</button>
                </div>
                <div className="app-modal__content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi imperdiet tortor id ligula vulputate volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur tempor vehicula porta. Phasellus magna arcu, commodo non porta vulputate, mattis eget lacus. Nulla eget leo ipsum. Suspendisse semper consequat nisi, vitae tristique neque euismod a. Aenean fringilla porttitor massa eu tincidunt. </p>
                </div>
                <div className="app-modal__footer">
                    <button className="btn btn-default app-modal__close">Submit</button>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    loggedIn:   PropTypes.bool
}

const mapStateToProps = (state) => {
    return state.AppReducer;
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

/** Connect component to redux */
Modal = connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal)

module.exports = Modal;
