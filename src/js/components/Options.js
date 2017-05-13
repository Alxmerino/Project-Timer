const React                = require('react');
const PropTypes            = React.PropTypes;
const { connect }          = require('react-redux');

const { isElectronApp }    = require('../utils/utils');
const { toggleAppMenu,
    toggleAppFocus }       = require('../actions/AppActions');
const AppEvents            = require('../enums/AppEvents');
const Logger               = require('../components/Logger');

// Require ipcRenderer only in electron app
const { ipcRenderer }   = (isElectronApp()) ? window.require('electron') : {};

/* eslint-disable no-unused-vars */
let Debug = new Logger('Options');
/* eslint-enable no-unused-vars */

let Options = ({ onMenuToggle, onFocusApp, menuOpen, focused }) => {
    // Bail early if it's not an Electron app
    if (!isElectronApp()) {
        return null;
    }

    let isMenuOpen = (menuOpen) ? 'open' : '';
    let activeBtnClass = (menuOpen) ? 'btn-primary' : '';
    let activeLinkClass = (focused) ? 'active' : '';

    /**
     *
     * @desc Handle electron quit event for electron App
     *
     */
    let onQuit = () => {
        ipcRenderer.send('async-message', {
            event: AppEvents.QUIT
        });
    };

    return (
        <div className={`options btn-group ${isMenuOpen}`}>
            <button
                onClick={() => onMenuToggle(menuOpen)}
                type="button"
                className={`options__toggle btn btn-default ${activeBtnClass}`}
            >
                <span className="glyphicon glyphicon-cog" />
            </button>
            <ul className="options__menu dropdown-menu">
                <li><a href="#" className={`options__link ${activeLinkClass}`} onClick={() => onFocusApp(focused)}>Focus <span className="options__focus-icon glyphicon glyphicon-ok pull-right" aria-hidden="true"></span></a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#" className="options__link" onClick={onQuit}>Quit</a></li>
            </ul>
        </div>
    );
};

/**
 *
 * @desc Set component prop types
 * @type {Object}
 *
 */
Options.propTypes = {
    onMenuToggle:   PropTypes.func.isRequired,
    onFocusApp:     PropTypes.func.isRequired,
    menuOpen:       PropTypes.bool,
    focused:        PropTypes.bool
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
const mapStateToProps = (state) => {
    return state.AppReducer;
};

/**
 * @desc Maps the dispatcher onto properties to pass onto the
 *       component
 *
 * @type {Object}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onMenuToggle: (isMenuOpen) => {
            // Toggle the opposite of current menu state
            isMenuOpen = !isMenuOpen;
            dispatch(toggleAppMenu(isMenuOpen));
        },

        onFocusApp: (focused) => {
            // Toggle the opposite of current focus app
            focused = !focused;
            dispatch(toggleAppFocus(focused));
            dispatch(toggleAppMenu(false));
        }
    };
};

// Connect Component to redux
Options = connect(
    mapStateToProps,
    mapDispatchToProps
)(Options);

module.exports = Options;
