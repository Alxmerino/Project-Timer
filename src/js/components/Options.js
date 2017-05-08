import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';

import { isElectronApp }    from '../utils/utils';
import { toggleAppMenu }    from '../actions/AppActions';
import AppEvents            from '../enums/AppEvents';
import Logger               from '../components/Logger';

// Require ipcRenderer only in electron app
const { ipcRenderer }   = (isElectronApp()) ? window.require('electron') : {};

/* eslint-disable no-unused-vars */
let Debug = new Logger('Options');
/* eslint-enable no-unused-vars */

let Options = ({ onMenuToggle, menuOpen }) => {
    // Bail early if it's not an Electron app
    if (!isElectronApp()) {
        return null;
    }

    let isMenuOpen = (menuOpen) ? 'open' : '';
    let activeBtnClass = (menuOpen) ? 'btn-primary' : '';

    /**
     *
     * @desc Handle electron quit event for electron App
     *
     */
    let onQuit = () => {
        ipcRenderer.send('async-message', AppEvents.QUIT);
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
                <li><a href="#">Focus</a></li>
                <li role="separator" className="divider"></li>
                <li><a onClick={onQuit}>Quit</a></li>
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
    onMenuToggle: PropTypes.func.isRequired,
    menuOpen: PropTypes.bool
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
        }
    };
};

// Connect Component to redux
Options = connect(
    mapStateToProps,
    mapDispatchToProps
)(Options);

export default Options;
