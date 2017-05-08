import React, { PropTypes } from 'react';

const TimerTitle = (props) => {
    let descExcerpt = (props.description && props.description.length) ?
        props.description.substr(0, 30) :
        'Description';

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
        return (
            <div className="timer__titleDesc">
                <span className="timer__title" onClick={props.onTitleEditOn.bind(this, props.id)}>{props.title}</span>
                <div
                    className="timer__descExcerpt" onClick={props.onDescEditOn.bind(this, props.id)}>{descExcerpt}</div>
            </div>
        );
    }
};

TimerTitle.propTypes = {
    id:                 PropTypes.number.isRequired,
    title:              PropTypes.string.isRequired,
    onTitleEditOn:      PropTypes.func.isRequired,
    onTitleEditOff:     PropTypes.func.isRequired,
    onDescEditOn:       PropTypes.func.isRequired,
    onTitleUpdate:      PropTypes.func.isRequired,
    description:        PropTypes.string,
    editingTitle:       PropTypes.bool,
};

export default TimerTitle;
