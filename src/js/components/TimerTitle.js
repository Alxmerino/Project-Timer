import React, { PropTypes } from 'react';

const TimerTitle = (props) => {
    if (props.editingTitle) {
        return (
            <div className="input-group">
                <input onKeyUp={props.onTitleUpdate.bind(this, props.id)} type="text" autoFocus defaultValue={props.title} className="timer__titleInput form-control input-sm" />
                <span className="input-group-btn">
                    <button className="btn btn-sm btn-success" onClick={props.onTitleEditOff.bind(this, props.id)} >
                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                    </button>
                </span>
            </div>
        );
    } else {
        return (<span className="timer__title" onClick={props.onTitleEditOn.bind(this, props.id)}>{props.title}</span>);
    }
};

TimerTitle.propTypes = {
    id:                 PropTypes.number.isRequired,
    title:              PropTypes.string.isRequired,
    onTitleEditOn:      PropTypes.func.isRequired,
    onTitleEditOff:     PropTypes.func.isRequired,
    onTitleUpdate:      PropTypes.func.isRequired,
    editingTitle:       PropTypes.bool,
};

export default TimerTitle;
