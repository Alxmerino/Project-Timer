const React                        = require('react');
const PropTypes                    = require('prop-types');
const { connect }                  = require('react-redux');
const _                            = require('underscore');

const TimerItem                    = require('../components/TimerItem');
const Logger                       = require('../components/Logger');
const {
    stopTimer,
    startTimer,
    resetTimer,
    destroyTimer,
    toggleDurationInputOn,
    toggleDurationInputOff,
    updateTimeDuration,
    togglePlannedInputOn,
    togglePlannedInputOff,
    updateTimePlanned,
    toggleTitleChangeOn,
    toggleTitleChangeOff,
    updateTitle,
    toggleDescInputOn,
    toggleDescInputOff,
    updateTimeDescription }         = require('../actions/TimerActions');

/* eslint-disable no-unused-vars */
let Debug = new Logger('TimerList');
/* eslint-enable no-unused-vars */

let TimerList = ({ timers, onClose, onStart, onStop, onReset, onTitleEditOn, onTitleEditOff, onTitleUpdate, onDurationEditOn, onDurationEditOff, onDurationUpdate, onPlannedEditOn, onPlannedEditOff, onPlannedUpdate, onDescEditOn, onDescEditOff, onDescEditUpdate }) => {

    return (
        <ul className="list-group">
            {_.map(timers, timer =>
                <TimerItem
                    {...timer}
                    onClose={() => onClose(timer.id)}
                    onStart={() => onStart(timer.id)}
                    onStop={() => onStop(timer.id)}
                    onReset={() => onReset(timer.id)}
                    onTitleEditOn={onTitleEditOn}
                    onTitleEditOff={onTitleEditOff}
                    onTitleUpdate={onTitleUpdate}
                    onDurationEditOn={onDurationEditOn}
                    onDurationEditOff={onDurationEditOff}
                    onDurationUpdate={onDurationUpdate}
                    onPlannedEditOn={onPlannedEditOn}
                    onPlannedEditOff={onPlannedEditOff}
                    onPlannedUpdate={onPlannedUpdate}
                    onDescEditOn={onDescEditOn}
                    onDescEditOff={onDescEditOff}
                    onDescEditUpdate={onDescEditUpdate}
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
    timers:             PropTypes.array,
    onClose:            PropTypes.func.isRequired,
    onStart:            PropTypes.func.isRequired,
    onStop:             PropTypes.func.isRequired,
    onReset:            PropTypes.func.isRequired,
    onTitleEditOn:      PropTypes.func.isRequired,
    onTitleEditOff:     PropTypes.func.isRequired,
    onTitleUpdate:      PropTypes.func.isRequired,
    onDurationEditOn:   PropTypes.func.isRequired,
    onDurationEditOff:  PropTypes.func.isRequired,
    onDurationUpdate:   PropTypes.func.isRequired,
    onPlannedEditOn:    PropTypes.func.isRequired,
    onPlannedEditOff:   PropTypes.func.isRequired,
    onPlannedUpdate:    PropTypes.func.isRequired,
    onDescEditOn:       PropTypes.func.isRequired,
    onDescEditOff:      PropTypes.func.isRequired,
    onDescEditUpdate:   PropTypes.func.isRequired,
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
    let timers = _.map(state.TimerReducer.timers, (timer) => {
        return timer;
    });

    return {
        timers
    };
};

/**
 * Key map to test key press
 * @type {Object}
 */
let keyMap = {}

/**
 * Test keys to see if they were pressed
 * @param  {String} keys
 * @return {Boolean}
 */
const testKeys = (...keys) => {
    const testSingleKey = (key) => {
        let alias = {
            cmd: 91,
            enter: 13
        }

        return keyMap[alias[key]];
    }

    /** Return false if all keys to test are not pressed */
    for (var i = 0; i < keys.length; i++) {
        if (!testSingleKey(keys[i])) {
            return false;
        }
    }

    return true;
}

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
        onReset: (id) => {
            dispatch(resetTimer(id));
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
        onTitleUpdate: (id, proxyData) => {
            keyMap[proxyData.keyCode] = proxyData.type === 'keydown';

            if (testKeys('enter')) {
                let title = proxyData.target.value;
                dispatch(updateTitle(id, title));
                dispatch(toggleTitleChangeOff(id));

                // Clear keymap
                keyMap = {};
            }
        },
        onDurationEditOn: (id) => {
            dispatch(stopTimer(id));
            dispatch(toggleDurationInputOn(id));
        },
        onDurationEditOff: (id, proxyData) => {
            // Get the input value
            let newDuration = proxyData.currentTarget.parentElement.previousSibling.value;
            dispatch(updateTimeDuration(id, newDuration));
            dispatch(toggleDurationInputOff(id));
        },
        onDurationUpdate: (id, proxyData) => {
            keyMap[proxyData.keyCode] = proxyData.type === 'keydown';

            if (testKeys('enter')) {
                let newDuration = proxyData.target.value;
                dispatch(updateTimeDuration(id, newDuration));
                dispatch(toggleDurationInputOff(id));

                // Clear keymap
                keyMap = {};
            }
        },
        onPlannedEditOn: (id) => {
            dispatch(stopTimer(id));
            dispatch(togglePlannedInputOn(id));
        },
        onPlannedEditOff: (id, proxyData) => {
            // get the input value
            let newPlannedTime = proxyData.currentTarget.parentElement.previousSibling.value;
            dispatch(updateTimePlanned(id, newPlannedTime));
            dispatch(togglePlannedInputOff(id));
        },
        onPlannedUpdate: (id, proxyData) => {
            keyMap[proxyData.keyCode] = proxyData.type === 'keydown';

            if (testKeys('enter')) {
                let newPlannedTime = proxyData.target.value;
                dispatch(updateTimePlanned(id, newPlannedTime));
                dispatch(togglePlannedInputOff(id));

                // Clear keymap
                keyMap = {};
            }
        },
        onDescEditOn: (id) => {
            dispatch(stopTimer(id));
            dispatch(toggleDescInputOn(id));
        },
        onDescEditOff: (id, proxyData) => {
            // get the input value
            let desc = proxyData.currentTarget.previousSibling.value;
            dispatch(updateTimeDescription(id, desc));
            dispatch(toggleDescInputOff(id));
        },
        onDescEditUpdate: (id, proxyData) => {
            keyMap[proxyData.keyCode] = proxyData.type === 'keydown';

            if (testKeys('cmd', 'enter')) {
                // get the input value
                let desc = proxyData.currentTarget.value;
                dispatch(updateTimeDescription(id, desc));
                dispatch(toggleDescInputOff(id));

                // Clear keymap
                keyMap = {};
            }
        }
    };
};

TimerList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerList);

module.exports = TimerList;
