import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';

import { isElectronApp }    from '../utils/utils';
import { toggleAppMenu }    from '../actions/AppActions';
import Logger               from '../components/Logger';

/* eslint-disable no-unused-vars */
let Debug = new Logger('Options');
/* eslint-enable no-unused-vars */

let Options = ({ onMenuToggle, menuOpen }) => {
    let isMenuOpen = (menuOpen) ? 'open' : '';
    let activeBtnClass = (menuOpen) ? 'btn-primary' : '';

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
                <li><a href="#">Quit</a></li>
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
