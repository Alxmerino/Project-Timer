import React, { PropTypes }     from 'react';
import { connect }              from 'react-redux';
import moment                   from 'moment';
import _                        from 'underscore';

import Logger                   from '../components/Logger';
import TimeTracker              from '../containers/TimeTracker';
import { addTimer, updateTimer} from '../actions';

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
            return '0:00';
        } else {
            // Get planned time string
            let plannedStr = formInputs.time.value;
            plannedStr = plannedStr.toLowerCase();
            plannedStr = plannedStr.match(/[a-zA-Z]+|[0-9]+/g);

            // We are dealing with a `3 hours 45 minutes`-like format
            if (plannedStr.length > 2) {
                let totalMinutes = 0;

                // Group into arrays of 2 values each e.g. [[3, 'hours'], [45, 'minutes']]
                // @reference: http://stackoverflow.com/questions/10456218/javascript-to-return-a-new-array-of-paired-values-from-an-array-of-single-values/10456344#10456344
                let plannedStrArr = _.map(plannedStr, (val, i) => {
                    if (i%2 === 0) {
                        return [val, plannedStr[ i + 1 ]];
                    }
                });

                // Cleanup array from falsy values
                plannedStrArr = _.compact(plannedStrArr);

                // Combine total minutes
                _.each(plannedStrArr, (timeArr) => {
                    totalMinutes += parseTimeStr(timeArr);
                });

                return totalMinutes;
            }

            return parseTimeStr(plannedStr);
        }
    };

    /**
     *
     * @desc Parse the time string to check if it's an hour value. If
     *       so, multiply by 60 to get the total number in minutes
     *
     * @param  {String} str
     * @return {Number}
     *
     */
    let parseTimeStr = (timeArr) => {
        let timeStr = timeArr[0];
        let format = timeArr[1];

        let totalMinutes = 0;
        let hoursArr = ['h', 'hour', 'hours'];
        let minutesArr = ['m', 'min', 'mins', 'minute', 'minutes'];

        // What time format are we dealing with?
        // Minutes
        if (_.contains(minutesArr, format) || _.isUndefined(format)) {
            totalMinutes += parseFloat(timeStr);
        }

        // Hours
        if (_.contains(hoursArr, format)) {
            totalMinutes += (parseFloat(timeStr) * 60);
        }

        return totalMinutes;
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
            <div className="form-group col-xs-7">
                <input
                    type="text"
                    placeholder="What are you working on today?"
                    className="form-control"
                    ref={(input) => formInputs.title = input}
                />
            </div>
            <div className="form-group col-xs-5 col-sm-3">
                <input
                    type="text"
                    placeholder="How long?"
                    className="form-control"
                    ref={(input) => formInputs.time = input}
                />
            </div>
            <div className="form-group col-xs-12 col-sm-2">
                <button type="submit" className="btn btn-success">Add Timer</button>
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

export default AddTimer;
