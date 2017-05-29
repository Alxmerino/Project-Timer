const React                    = require('react');
const PropTypes                = React.PropTypes;
const { connect }              = require('react-redux');
const moment                   = require('moment');
const _                        = require('underscore');

const Logger                   = require('../components/Logger');
const TimeTracker              = require('../containers/TimeTracker');
const { addTimer, updateTimer} = require('../actions/TimerActions');

/* eslint-disable no-unused-vars */
let Debug = new Logger('AddTimer');
/* eslint-enable no-unused-vars */

let AddTimer = ({ dispatch }) => {
    let formInputs = {};

    /**
     *
     * @desc Handle form submission and start adding timer process
     * @param  {Object} e
     * @return {void}
     *
     */
    let handleSubmit = (e) => {
        e.preventDefault();

        if (validTimerForm()) {
            let id = moment.now();

            // Create new timer object
            let timer = {
                id,
                title: formInputs.title.value,
                createdTime: id,
                started: false,
                duration: 0,
                plannedTime: getPlannedTime(),
                timeTracker: new TimeTracker(() => dispatch(updateTimer(id))),
            };

            // Dispatch action
            dispatch(addTimer(timer));

            // Lets clear the form to allow for a new entry
            clearForm();
        }
    };

    /**
     *
     * @desc Determines if we can add a timer or not, returns valid
     *       if at least the title is not empty, time can be left
     *       empty in which case a counter should be started
     *       instead of a timer.
     *
     * @return {Boolean}
     *
     */
    let validTimerForm = () => {
        if (formInputs.title.value !== '') {
            formInputs.title.parentElement.classList.remove('has-error');

            return true;
        } else {
            formInputs.title.parentElement.classList.add('has-error');

            return false;
        }
    };

    /**
     *
     * @desc Get planned time in minutes from the form
     * @return {Number}
     *
     */
    let getPlannedTime = () => {
        if (formInputs.time.value === '') {
            // No time planned, set to 0:00:00 and start counting up
            return 0;
        } else {
            // Get planned time string
            let plannedStr = formInputs.time.value;
            plannedStr = plannedStr.toUpperCase();
            plannedStr = plannedStr.match(/[a-zA-Z]+|[0-9]+/g);

            plannedStr = createISOstr(plannedStr);

            return moment.duration(plannedStr).asMilliseconds();
        }
    };

    /**
     *
     * @desc Parse the time string and convert it into an ISO 8601 string.
     *       Then use moment to return milliseconds from the new string
     *
     * @param  {String} str
     * @return {Number}
     *
     */
    let createISOstr = (timeStr) => {
        let prefix = 'PT';
        let outputStr = prefix;

        _.each(timeStr, (str) => {
            if (!_.isNaN(+str)) {
                // Number
                outputStr += (+str);
            } else {
                // Letter
                outputStr += str.charAt(0);
            }
        });

        return outputStr;
    };

    /**
     *
     * @desc Clear form inputs to allow for a new entry
     * @return {void}
     *
     */
    let clearForm = () => {
        formInputs.title.value = '';
        formInputs.time.value = '';
    };

    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className="form-group col-xs-12 col-sm-7">
                <input
                    type="text"
                    placeholder="What are you working on today?"
                    className="form-control"
                    ref={(input) => formInputs.title = input}
                />
            </div>
            <div className="form-group col-xs-12 col-sm-5">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="How long?"
                        className="form-control"
                        ref={(input) => formInputs.time = input}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-success" type="submit">Add timer</button>
                    </span>
                </div>
            </div>
        </form>
    );
};

/**
 *
 * @desc Set component prop types
 * @type {Object}
 *
 */
AddTimer.propTypes = {
    dispatch: PropTypes.func
};

AddTimer = connect()(AddTimer);

module.exports = AddTimer;
