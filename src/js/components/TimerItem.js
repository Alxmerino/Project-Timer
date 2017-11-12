const React                = require('react');
const PropTypes            = require('prop-types');

const {
    formatTime,
    getTimeIn }            = require('../helpers');
const TimerTitle           = require('../components/TimerTitle');
const Logger               = require('../components/Logger');
const TimerEvents          = require('../enums/TimerEvents');

/* eslint-disable no-unused-vars */
let Debug = new Logger('TimerItem');
/* eslint-enable no-unused-vars */

const TimerItem = ({onClose, onStart, onStop, onReset, onTitleEditOn, onTitleEditOff, onTitleUpdate, onDurationEditOn, onDurationEditOff, onDurationUpdate, onPlannedEditOn, onPlannedEditOff, onPlannedUpdate, started, title, duration, plannedTime, editingTitle, editingDuration, editingPlannedTime, onDescEditOn, onDescEditOff, onDescEditUpdate, editingDescription, description, status, id}) => {
    let active = (started) ? 'active' : 'inactive';
    let playingStatus = (started) ? 'pause' : 'play';
    let clickAction = (started) ? onStop : onStart;
    let statusClass = '';

    switch (status) {
        case TimerEvents.TIMER_DONE:
            statusClass = 'timer--done';
            break;
        case TimerEvents.TIMER_ERROR:
            statusClass = 'timer--error';
            break;
        case TimerEvents.TIMER_OVERTIME:
            statusClass = 'timer--overtime';
            break;
        case TimerEvents.TIMER_LOGGED:
            statusClass = 'timer--logged';
            break;
        default:
    }

    let renderDurationInput = (value, isEditing, type, onClickOn, onClickOff, onUpdate) => {
        let timeInSeconds = getTimeIn(value, 'seconds');

        if (isEditing) {
            return (
                <div className="input-group timer__inputGroup">
                    <input onKeyUp={onUpdate.bind(this, id)} onKeyDown={onUpdate.bind(this, id)} type="text" autoFocus defaultValue={formatTime(timeInSeconds, 'seconds')} className={`timer__${type}Input form-control input-sm`} />
                    <span className="input-group-btn">
                        <button onClick={onClickOff.bind(this, id)} className="btn btn-sm btn-success"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
                    </span>
                </div>
            );
        } else {
            return (
                <div className="input-group timer__inputGroup">
                    <span onClick={onClickOn.bind(this, id)} className={`timer__${type}`}>{formatTime(timeInSeconds, 'seconds')}</span>
                </div>
            );
        }
    };

    let renderDescription = () => {
        if (!editingDescription) {
            return null;
        }

        return (
            <div className="timer__descContainer">
                <textarea onKeyDown={onDescEditUpdate.bind(this, id)} onKeyUp={onDescEditUpdate.bind(this, id)} className="form-control timer__description" defaultValue={description} maxLength="500"></textarea>
                <button onClick={onDescEditOff.bind(this, id)} className="timer__descConfirm btn btn-sm btn-success"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
            </div>
        );
    };

    return (
        <li className={`timer list-group-item ${active} ${statusClass}`}>
            <a
                href="#timer__close"
                className="timer__close"
                onClick={onClose}
            >
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </a>
            <div className="list-group-item-heading timer__titleWrapper">
                {/* (editingTitle) ? renderTitleInput() : renderTitle() */}
                <TimerTitle
                    id={id}
                    title={title}
                    description={description}
                    editingTitle={editingTitle}
                    onTitleUpdate={onTitleUpdate}
                    onTitleEditOn={onTitleEditOn}
                    onTitleEditOff={onTitleEditOff}
                    onDescEditOn={onDescEditOn}
                    onDescEditOff={onDescEditOff}
                />
            </div>
            <div className="timer__stats">
                {renderDurationInput(
                    duration,
                    editingDuration,
                    'duration',
                    onDurationEditOn,
                    onDurationEditOff,
                    onDurationUpdate
                )}
                <div className="timer__separator">/</div>
                {renderDurationInput(
                    plannedTime,
                    editingPlannedTime,
                    'plannedTime',
                    onPlannedEditOn,
                    onPlannedEditOff,
                    onPlannedUpdate
                )}
                <div className="timer__btnGroup btn-group" role="group" aria-label="...">
                    <button
                        type="button"
                        onClick={clickAction}
                        className={`timer__${playingStatus} btn btn-info btn-sm`}
                    >
                        <span className={`glyphicon glyphicon-${playingStatus}`} aria-hidden="true"></span>
                    </button>
                    <button
                        type="button"
                        onClick={onReset}
                        className="timer__reset btn btn-default btn-sm"
                    >
                        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
            {renderDescription()}
        </li>
    );
};

/**
 *
 * @desc Set component prop types
 * @type {Object}
 *
 */
TimerItem.propTypes = {
    onClose:            PropTypes.func.isRequired,
    onStart:            PropTypes.func.isRequired,
    onStop:             PropTypes.func.isRequired,
    onReset:            PropTypes.func.isRequired,
    onTitleEditOn:      PropTypes.func.isRequired,
    onTitleEditOff:     PropTypes.func.isRequired,
    onTitleUpdate:      PropTypes.func.isRequired,
    onDurationEditOn:   PropTypes.func.isRequired,
    onDurationEditOff:  PropTypes.func.isRequired,
    onDurationUpdate:   PropTypes.func.isRequired,
    onPlannedEditOn:    PropTypes.func.isRequired,
    onPlannedEditOff:   PropTypes.func.isRequired,
    onPlannedUpdate:    PropTypes.func.isRequired,
    onDescEditOn:       PropTypes.func.isRequired,
    onDescEditOff:      PropTypes.func.isRequired,
    onDescEditUpdate:   PropTypes.func.isRequired,
    id:                 PropTypes.number.isRequired,
    title:              PropTypes.string.isRequired,
    duration:           PropTypes.number.isRequired,
    plannedTime:        PropTypes.number.isRequired,
    description:        PropTypes.string,
    status:             PropTypes.string,
    editingTitle:       PropTypes.bool,
    editingDuration:    PropTypes.bool,
    editingPlannedTime: PropTypes.bool,
    editingDescription: PropTypes.bool,
    started:            PropTypes.bool,
};

module.exports = TimerItem;
