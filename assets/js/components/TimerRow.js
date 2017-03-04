const React     = require('react');

class TimerRow extends React.Component {
    render() {
        return (
            <li className="list-group-item">
                <a href="#" className="timer-close"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                <div className="timer-title">Dapibus ac facilisis in</div>
                <div className="timer-stats">
                    <span className="timer-current">01:23:34</span> / <span className="timer-planned">2:00:00</span>
                    <button type="button" className="timer-play btn btn-info btn-xs"><span className="glyphicon glyphicon-play" aria-hidden="true"></span></button>
                </div>
            </li>
        );
    }
}

module.exports = TimerRow;
