import React, { PropTypes }         from 'react';
import { connect }                  from 'react-redux';
import _                            from 'underscore';

import TimerItem                    from '../components/TimerItem';
import Logger                       from '../components/Logger';
import { formatTime, getTimeIn }    from '../helpers';
import {
    stopTimer,
    startTimer,
    destroyTimer,
    toggleTitleChange,
    updateTitle }                   from '../actions';

/* eslint-disable no-unused-vars */
let Debug = new Logger('TimerList');
/* eslint-enable no-unused-vars */

let TimerList = ({ timers, onClose, onStart, onStop, onTitleToggle }) => {

    return (
        <ul className="list-group">
            {_.map(timers, timer =>
                <TimerItem
                    {...timer}
                    onClose={() => onClose(timer.id)}
                    onStart={() => onStart(timer.id)}
                    onStop={() => onStop(timer.id)}
                    onTitleToggle={onTitleToggle}
                    key={timer.id}
                />
            )}
            <li className="timer-row timer-totals list-group-item panel-footer">
                <span>07:00:00</span>
            </li>
        </ul>
    );
};

/**
 *
 * @desc Set component prop types
 * @type {Object}
 *
 */
TimerList.propTypes = {
    timers:         PropTypes.array,
    onClose:        PropTypes.func.isRequired,
    onStart:        PropTypes.func.isRequired,
    onStop:         PropTypes.func.isRequired,
    onTitleToggle:  PropTypes.func.isRequired,
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
    let timers = _.map(state.timers, (timer) => {
        let duration = getTimeIn(timer.duration, 'seconds');
        timer.plannedTime = formatTime(timer.plannedTime);
        timer.displayDuration = formatTime(duration, 'seconds');

        return timer;
    });

    return {
        timers
    };
};

/**
 * @desc Maps the dispatcher onto properties to pass onto the
 *       component
 *
 * @type {Object}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onClose: (id) => {
            dispatch(destroyTimer(id));
        },
        onStart: (id) => {
            dispatch(startTimer(id));
        },
        onStop: (id) => {
            dispatch(stopTimer(id));
        },
        onTitleToggle: (id, proxyData, event) => {
            if (event.type === 'react-keyup') {
                // Only toggle title on Enter press (13)
                if (proxyData.keyCode === 13) {
                    let title = proxyData.target.value;
                    dispatch(updateTitle(id, title));
                }
            } else {
                // This was a double click event
                dispatch(toggleTitleChange(id));
                dispatch(stopTimer(id));
            }
        }
    };
};

TimerList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerList);

export default TimerList;
