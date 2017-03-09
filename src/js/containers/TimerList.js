import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore';

// import {closeTimer, toggleTimer} from '../actions'
// import TimerItem from './TimerItem'

let TimerList = ({timers, onClose, onToggle}) => {
    console.log('TImers', timers)

    return (
        <ul className="list-group">
        </ul>
    )
}

TimerList = connect()(TimerList);

export default TimerList;
