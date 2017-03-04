const React     = require('react');
const $         = require('jquery');

class TimerRow extends React.Component {
    render() {

        let {timer} = this.props;
        let timerStatus = (timer.isPaused) ? 'pause' : 'play';

        return (
            <li className="list-group-item">
                <a
                    href="#"
                    className="timer-close"
                    data-id={timer.id}
                    onClick={this.handleClick.bind(this)}
                >
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </a>
                <div className="timer-title">{timer.title}</div>
                <div className="timer-stats">
                    <span className="timer-current">0:00:00</span> / <span className="timer-planned">0:00:00</span>
                    <button type="button" className={`timer-${timerStatus} btn btn-info btn-xs`}><span className={`glyphicon glyphicon-${timerStatus}`} aria-hidden="true"></span></button>
                </div>
            </li>
        );
    }

    handleClick(e) {
        e.preventDefault();

        let id = $(e.currentTarget).data('id');

        // Remove timer
        this.props.removeTimer(id);
    }
}

module.exports = TimerRow;
