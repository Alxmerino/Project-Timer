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

        this.buildTimer()
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
                    <span className="timer-current" ref={(el) => this.timerEl = el}>0:00</span> / <span className="timer-planned">{this.formatTime(rowTimer.planned)}</span>
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

    buildTimer() {
        let {rowTimer}  = this.props;
        let timerEl     = this.timerEl;

        this.timer = new Timer(() => {
            this.debug.log('Timer runnning');
        });
    }

    toggleTimer() {
        this.debug.log('Timer is running:', this.timer.started)
        let {rowTimer} = this.props;

        if (!this.timer.started) {
            this.debug.log('Start timer', rowTimer.id);
            this.timer.start();
        } else {
            this.debug.log('Stop timer', rowTimer.id);
            this.timer.stop();
        }
    }

    formatTime(time) {
        return moment.duration(time, 'minutes').format('h:mm', { trim: false });
    }
}

module.exports = TimerRow;
