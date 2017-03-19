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
            return (<input onKeyUp={onTitleToggle.bind(this, id)} type="text" autoFocus defaultValue={title} className="timer__titleInput form-control input-sm" />);
        } else {
            return (<span className="timer__title" onDoubleClick={onTitleToggle.bind(this, id)}>{title}</span>);
        }
    };

    return (
        <li className={`timer list-group-item ${active}`}>
            <a
                href="#"
                className="timer__close"
                onClick={onClose}
            >
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </a>
            <div className="list-group-item-heading timer__titleWrapper">
                {titleOrInput()}
            </div>
            <div className="timer__stats">
                <span className="timer__current">{displayDuration}</span> / <span className="timer__planned">{plannedTime}</span>
                <button
                    type="button"
                    onClick={clickAction}
                    className={`timer__${timerStatus} btn btn-info btn-sm`}
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
