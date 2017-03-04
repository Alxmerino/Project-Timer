const React     = require('react');

class TimerRow extends React.Component {
    render() {

        let {timer} = this.props;
        let timerStatus = (timer.isPaused) ? 'pause' : 'play';

        return (
            <li className="list-group-item">
                <a href="#" className="timer-close"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                <div className="timer-title">{timer.title}</div>
                <div className="timer-stats">
                    <span className="timer-current">01:23:34</span> / <span className="timer-planned">2:00:00</span>
                    <button type="button" className={`timer-${timerStatus} btn btn-info btn-xs`}><span className={`glyphicon glyphicon-${timerStatus}`} aria-hidden="true"></span></button>
                </div>
            </li>
        );
    }
}

module.exports = TimerRow;
