import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'underscore';

import { destroyTimer } from '../actions'
import TimerItem from '../components/TimerItem'

let TimerList = ({ timers, onClose }) => {
    return (
        <ul className="list-group">
            {_.map(timers, timer =>
                <TimerItem
                    {...timer}
                    onClose={() => onClose(timer.id)}
                    key={timer.id}
                />
            )}
        </ul>
    )
}

/**
 *
 * @desc Set component prop types
 * @type {Object}
 *
 */
TimerList.propTypes = {
    onClose: PropTypes.func.isRequired
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
    return {
        timers: state
    }
}

/**
 * @desc Maps the dispatcher onto properties to pass onto the
 *       component
 *
 * @type {Object}
 */
const mapDispatchToProps = {
    onClose: destroyTimer
}

TimerList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerList);

export default TimerList;
