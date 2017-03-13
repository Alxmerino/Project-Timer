import React                    from 'react'
import { connect }              from 'react-redux'
import moment                   from 'moment'

import TimeTracker              from '../containers/TimeTracker'
import Storage                  from '../helpers/Storage'
import { addTimer, updateTimer} from '../actions'

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
            }

            // Dispatch action
            dispatch(addTimer(timer));

            // Lets clear the form to allow for a new entry
            clearForm();
        }
    }

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
        if (formInputs.title.value !== "") {
            formInputs.title.parentElement.classList.remove('has-error');

            return true;
        } else {
            formInputs.title.parentElement.classList.add('has-error');

            return false;
        }
    }

    /**
     *
     * @desc Get planned time in minutes from the form
     * @return {Number}
     *
     */
    let getPlannedTime = () => {
        if (formInputs.time.value === "") {
            // No time planned, set to 0:00:00 and start counting up
            return '0:00';
        } else {
            // Get planned time string
            let plannedStr = formInputs.time.value.split(' ');
            let totalMinutes = 0;

            plannedStr.forEach((str) => {
                totalMinutes += parseTimeStr(str);
            });

            return totalMinutes;
        }
    }

    /**
     *
     * @desc Parse the time string to check if it's an hour value. If
     *       so, multiply by 60 to get the total number in minutes
     *
     * @param  {String} str
     * @return {Number}
     *
     */
    let parseTimeStr = (str) => {
        str = str.toLowerCase();

        if (str.indexOf('h') > -1) {
            str = parseFloat(str);

            return (str * 60);
        }

        return parseFloat(str);
    }

    /**
     *
     * @desc Clear form inputs to allow for a new entry
     * @return {void}
     *
     */
    let clearForm = () => {
        formInputs.title.value = '';
        formInputs.time.value = '';
    }

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
    )

}

AddTimer = connect()(AddTimer)

export default AddTimer;
