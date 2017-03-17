import React, { PropTypes } from 'react';

import Logger                from '../components/Logger';

/* eslint-disable no-unused-vars */
let Debug = new Logger('TimerItem');
/* eslint-enable no-unused-vars */

const TimerItem = ({onClose, onStart, onStop, onTitleToggle, started, title, displayDuration, plannedTime, editingTitle, id}) => {
    let active = (started) ? 'active' : 'inactive';
    let timerStatus = (started) ? 'pause' : 'play';
    let clickAction = (started) ? onStop : onStart;

    let titleOrInput = () => {
        if (editingTitle) {
            return (<input onKeyUp={onTitleToggle.bind(this, id)} type="text" autoFocus defaultValue={title} />);
        } else {
            return (<span onDoubleClick={onTitleToggle.bind(this, id)}>{title}</span>);
        }
    };

    return (
        <li className={`list-group-item ${active}`}>
            <a
                href="#"
                className="timer-close"
                onClick={onClose}
            >
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </a>
            <div className="timer-title">
                {titleOrInput()}
            </div>
            <div className="timer-stats">
                <span className="timer-current">{displayDuration}</span> / <span className="timer-planned">{plannedTime}</span>
                <button
                    type="button"
                    onClick={clickAction}
                    className={`timer-${timerStatus} btn btn-info btn-xs`}
                >
                    <span className={`glyphicon glyphicon-${timerStatus}`} aria-hidden="true"></span>
                </button>
            </div>
        </li>
    );
};

/**
 *
 * @desc Set component prop types
 * @type {Object}
 *
 */
TimerItem.propTypes = {
    onClose:            PropTypes.func.isRequired,
    onStart:            PropTypes.func.isRequired,
    onStop:             PropTypes.func.isRequired,
    onTitleToggle:      PropTypes.func.isRequired,
    editingTitle:       PropTypes.bool,
    started:            PropTypes.bool,
    id:                 PropTypes.number.isRequired,
    title:              PropTypes.string.isRequired,
    displayDuration:    PropTypes.string.isRequired,
    plannedTime:        PropTypes.string.isRequired
};

export default TimerItem;
