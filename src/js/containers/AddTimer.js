import React from 'react'
import { connect } from 'react-redux'
import {addTimer} from '../actions'

let AddTimer = ({ dispatch }) => {

    return (
        <form className="row" onSubmit="">
            <div className="form-group col-xs-7">
                <input
                    type="text"
                    placeholder="What are you working on today?"
                    className="form-control"
                />
            </div>
            <div className="form-group col-xs-5 col-sm-3">
                <input
                    type="text"
                    placeholder="How long?"
                    className="form-control"
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
