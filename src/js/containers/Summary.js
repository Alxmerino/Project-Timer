import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import _                    from 'underscore';

import {
    getTimeIn,
    formatTime }            from '../helpers';
import Logger               from '../components/Logger';

/* eslint-disable no-unused-vars */
let Debug = new Logger('Summary');
/* eslint-enable no-unused-vars */

let Summary = ({totalWorked, totalPlanned}) => {
    let totalWorkedSeconds = getTimeIn(totalWorked, 'seconds');
    let totalPlannedSeconds = getTimeIn(totalPlanned, 'seconds');

    return (
        <div className="panel-footer timerSumary">
            <h4 className="timerSumary__text">Summary</h4>
            <div className="timerSumary__totals">
                <span className="timerSumary__legend">Worked/Planned - </span>
                {formatTime(totalWorkedSeconds, 'seconds')}/{formatTime(totalPlannedSeconds, 'seconds')}
            </div>
        </div>
    );
};

/**
 *
 * @desc Set component prop types
 * @type {Object}
 *
 */
Summary.propTypes = {
    totalWorked:    PropTypes.number,
    totalPlanned:   PropTypes.number,
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
    let totalWorked = 0;
    let totalPlanned = 0;

    _.each(state.TimerReducer.timers, (timer) => {
        totalPlanned += timer.plannedTime;
        totalWorked += timer.duration;
    });

    return { totalWorked, totalPlanned };
};

Summary = connect(mapStateToProps)(Summary);

export default Summary;
