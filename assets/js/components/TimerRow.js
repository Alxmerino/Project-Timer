const React                 = require('react');
const $                     = require('jquery');
const moment                = require('moment');
const momentDurationFormat  = require('moment-duration-format');
const Logger                = require('../components/Logger');
const Timer                 = require('../components/Timer');

class TimerRow extends React.Component {

    constructor() {
        super();

        this.totalDuration = 0;

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
        let timerStatus = (rowTimer.started) ? 'pause' : 'play';

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

    /**
     *
     * @desc Removes a timer from the state when clicking on the
     *       close button
     *
     * @param  {Object} e
     * @return {void}
     *
     */
    handleCloseClick(e) {
        e.preventDefault();

        let id = $(e.currentTarget).data('id');

        // Remove timer
        this.props.removeTimer(id);
    }

    /**
     *
     * @desc Create a new timer
     * @return {void}
     *
     */
    buildTimer() {
        let {rowTimer}  = this.props;

        this.timer = new Timer(this.updateTimerTime.bind(this));
    }

    /**
     *
     * @desc Update html element with current timer duration
     * @return {void}
     *
     */
    updateTimerTime() {
        this.debug.log('Total duration:', this.totalDuration);

        let timerEl     = this.timerEl;
        this.totalDuration += this.timer.getDuration();

        // Total duration is in milliseconds, divide by 1000 to get second amount
        let secondsDuration = (this.totalDuration/1000);

        $(timerEl).html(
            this.formatTime(secondsDuration, 'seconds')
        );
    }

    /**
     *
     * @desc Toggle the timer's play/stop state
     * @return {void}
     *
     */
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

    /**
     * @desc Format duration time string
     * @param  {Number} time
     * @param  {string} format
     * @return {String}
     */
    formatTime(time, format) {
        format = (typeof(format) !== 'undefined') ? format : 'minutes';

        return moment.duration(time, format).format('h:mm:ss', { trim: false });
    }
}

module.exports = TimerRow;
