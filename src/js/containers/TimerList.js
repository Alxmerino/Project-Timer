import React, { PropTypes }         from 'react';
import { connect }                  from 'react-redux';
import _                            from 'underscore';

import TimerItem                    from '../components/TimerItem';
import Logger                       from '../components/Logger';
import {
    stopTimer,
    startTimer,
    destroyTimer,
    toggleTimeInputOn,
    toggleTimeInputOff,
    toggleTitleChangeOn,
    toggleTitleChangeOff,
    updateTitle }                   from '../actions';

/* eslint-disable no-unused-vars */
let Debug = new Logger('TimerList');
/* eslint-enable no-unused-vars */

let TimerList = ({ timers, onClose, onStart, onStop, onTitleEditOn, onTitleEditOff, onTitleUpdate, onTimeInputOn, onTimeInputOff }) => {

    return (
        <ul className="list-group">
            {_.map(timers, timer =>
                <TimerItem
                    {...timer}
                    onClose={() => onClose(timer.id)}
                    onStart={() => onStart(timer.id)}
                    onStop={() => onStop(timer.id)}
                    onTitleEditOn={onTitleEditOn}
                    onTitleEditOff={onTitleEditOff}
                    onTitleUpdate={onTitleUpdate}
                    onTimeInputOn={onTimeInputOn}
                    onTimeInputOff={onTimeInputOff}
                    key={timer.id}
                />
            )}
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
    onTitleEditOn:  PropTypes.func.isRequired,
    onTitleEditOff: PropTypes.func.isRequired,
    onTitleUpdate:  PropTypes.func.isRequired,
    onTimeInputOn:  PropTypes.func.isRequired,
    onTimeInputOff: PropTypes.func.isRequired,
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
        onTitleEditOn: (id) => {
            dispatch(stopTimer(id));
            dispatch(toggleTitleChangeOn(id));
        },
        onTitleEditOff: (id, proxyData) => {
            // Get input value
            let title = proxyData.currentTarget.parentElement.previousSibling.value;
            dispatch(updateTitle(id, title));
            dispatch(toggleTitleChangeOff(id));
        },
        onTitleUpdate: (id, proxyData, event) => {
            if (event.type === 'react-keyup') {
                // Only toggle title on Enter press (13)
                if (proxyData.keyCode === 13) {
                    let title = proxyData.target.value;
                    dispatch(updateTitle(id, title));
                    dispatch(toggleTitleChangeOff(id));
                }
            }
        },
        onTimeInputOn: (id, prop) => {
            dispatch(toggleTimeInputOn(id, prop));
        },
        onTimeInputOff: (id, prop) => {
            // Get the input value
            // let duration = proxyData.currentTarget.parentElement.previousSibling.value;
            dispatch(toggleTimeInputOff(id, prop));
        }
    };
};

TimerList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerList);

export default TimerList;
