import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore';

import { destroyTimer } from '../actions'
// import TimerItem from './TimerItem'

let TimerList = ({ state }) => {
    return (
        <ul className="list-group">
        </ul>
    )
}

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
    return {state}
}

/**
 * @desc Maps the dispatcher onto properties to pass onto the
 *       component
 *
 * @type {Object}
 */
const mapDispatchToProps = {
    onClose: removeTimer
}

TimerList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerList);

export default TimerList;
