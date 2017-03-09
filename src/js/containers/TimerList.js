import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore';

// import {closeTimer, toggleTimer} from '../actions'
// import TimerItem from './TimerItem'

let TimerList = ({ state }) => {
    return (
        <ul className="list-group">
        </ul>
    )
}

TimerList = connect(function(state) {
    return {state}
})(TimerList);

export default TimerList;
