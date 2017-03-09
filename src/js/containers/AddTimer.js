import React from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import {addTimer} from '../actions'

let AddTimer = ({ dispatch }) => {
    let formInputs = {};

    let handleSubmit = (e) => {
        e.preventDefault();

        // if (validTimerForm())
        console.log('VALID', validTimerForm())
        dispatch(addTimer({timer: 'foo'}));
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
            $(formInputs.title).parent().removeClass('has-error');

            return true;
        } else {
            $(formInputs.title).parent().addClass('has-error');

            return false;
        }
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
