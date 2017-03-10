import React, { PropTypes } from 'react'

const TimerItem = ({onClose, onToggle, started, title, plannedTime}) => {
    let active = (started) ? 'active' : 'inactive';
    let timerStatus = (started) ? 'pause' : 'play';

    return (
        <li className={`list-group-item ${active}`}>
            <a
                href="#"
                className="timer-close"
                onClick={onClose}
            >
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </a>
            <div className="timer-title">{title}</div>
            <div className="timer-stats">
                <span className="timer-current">01:23:34</span> / <span className="timer-planned">{plannedTime}</span>
                <button
                    type="button"
                    onClick={onToggle}
                    className={`timer-${timerStatus} btn btn-info btn-xs`}
                >
                    <span className={`glyphicon glyphicon-${timerStatus}`} aria-hidden="true"></span>
                </button>
            </div>
        </li>
    )
}

TimerItem.propTypes = {
    // onClose: PropTypes.func.isRequired,
    // onToggle: PropTypes.func.isRequired,
    // status: PropTypes.bool.isRequired,
    // title: PropTypes.string.isRequired
}

export default TimerItem;
