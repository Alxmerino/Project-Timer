const React                 = require('react');
const $                     = require('jquery');
const moment                = require('moment');
const momentDurationFormat  = require('moment-duration-format');
const Logger                = require('../components/Logger');
const Timer                 = require('../components/Timer');

class TimerRow extends React.Component {

    constructor() {
        super();

        // Debugger
        this.debug = new Logger('TimerRow');

        // Bind methods
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
    }

    componentDidMount() {
        // Build timer whent he component has mounted
        this.debug.log('Build timer');

        let {rowTimer, buildTimer} = this.props;

        buildTimer(rowTimer);
    }

    render() {
        let {rowTimer} = this.props;
        let timerStatus = (rowTimer.isPaused) ? 'pause' : 'play';

        return (
            <li className="list-group-item">
                <a
                    href="#"
                    className="timer-close"
                    data-id={rowTimer.id}
                    onClick={this.handleCloseClick}
                >
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </a>
                <div className="timer-title">{rowTimer.title}</div>
                <div className="timer-stats">
                    <span className="timer-current" ref={(el) => this.timerText = el}>0:00</span> / <span className="timer-planned">{this.formatTime(rowTimer.planned)}</span>
                    <button
                        type="button"
                        className={`timer-${timerStatus} btn btn-info btn-xs`}
                        onClick={this.toggleTimer}
                    >
                        <span className={`glyphicon glyphicon-${timerStatus}`} aria-hidden="true"></span>
                    </button>
                </div>
            </li>
        );
    }

    handleCloseClick(e) {
        e.preventDefault();

        let id = $(e.currentTarget).data('id');

        // Remove timer
        this.props.removeTimer(id);
    }

    toggleTimer() {
        let {timer} = this.props;

        var thisTimer = BuildTimer(null, timer.planned)
        console.log('THIS', thisTimer)

        setTimeout(function() {
            console.log('STOP');
            thisTimer.stop();
        }, 5000);
        // this.props.toggleTimer(id);
    }

    formatTime(time) {
        return moment.duration(time, 'minutes').format('h:mm', { trim: false });
    }
}

module.exports = TimerRow;
