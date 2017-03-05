const React     = require('react');
const $         = require('jquery');
const moment    = require('moment');
const _         = require('underscore');
const Logger    = require('../components/Logger');

// React Components
let TimerRow    = require('../components/TimerRow');

class App extends React.Component {
    constructor() {
        super();

        // Debugger
        this.debug = new Logger('Main');

        this.state = {
            timers: {}
        }

        // Timer Form
        this.timerForm = {
            title: '',
            time: ''
        }

        // Bind methods
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeTimer = this.removeTimer.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
    }

    render() {

        // Set Timer Rows
        let timerRows = _.map(this.state.timers, (timer) => {
            return <TimerRow
                rowTimer={timer}
                removeTimer={this.removeTimer}
                toggleTimer={this.toggleTimer}
                buildTimer={this.buildTimer}
                key={timer.id}/>
        });

        return (
            <div className="main-wrapper">

                <div className="container">
                    <div className="header clearfix">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1>Projects Timer</h1>
                            </div>
                        </div>
                        <form className="row" onSubmit={this.handleSubmit}>
                            <div className="form-group col-xs-7">
                                <input
                                    type="text"
                                    placeholder="What are you working on today?"
                                    className="form-control"
                                    ref={(input) => this.timerForm.title = input}
                                />
                            </div>
                            <div className="form-group col-xs-5 col-sm-3">
                                <input
                                    type="text"
                                    placeholder="How long?"
                                    className="form-control"
                                    ref={(input) => this.timerForm.time = input}
                                />
                            </div>
                            <div className="form-group col-xs-12 col-sm-2">
                                <button type="submit" className="btn btn-success">Add Timer</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <ul className="list-group">
                                {timerRows}
                            </ul>
                        </div>
                    </div>
                </div>

                <footer className="container footer">
                    <div className="row">
                        <p className="col-xs-12">&copy; 2016 Amaya Media</p>
                    </div>
                </footer>

            </div>
        );
    }

    /**
     * @desc Handle form submission and start adding timer process
     * @param  {Object} e
     * @return {void}
     */
    handleSubmit(e) {
        e.preventDefault();

        if (this.validTimerForm()) {
            this.addTimer();
        }
    }

    /**
     *
     * @desc Create a timer and add it to the state
     *
     */
    addTimer() {
        // Set the timestamp as the timer's ID
        let id = moment().format('x');

        // Get all timers
        let {timers} = this.state;

        // Set new timer object
        let timer = {
            id,
            title: this.timerForm.title.value,
            startTime: moment().format(),
            isPaused: false,
            planned: this.getPlannedTime(),
            // description = 'TODO',
        }

        // Add timer to timers object
        timers[id] = timer;

        // Update State
        this.setState({timers: timers});

        // Lets clear the form to allow for a new entry
        this.clearForm();
    }

    /**
     *
     * @desc Remove a timer from the state
     * @param  {string} id
     * @return {void}
     *
     */
    removeTimer(id) {
        let {timers} = this.state;

        // Delete timer
        delete timers[id];

        // Update State
        this.setState({timers: timers});
    }

    /**
     *
     * @desc Get planned time in minutes from the form
     * @return {Number}
     *
     */
    getPlannedTime() {
        if (this.timerForm.time.value === "") {
            // No time planned, set to 0:00:00 and start counting up
            return '0:00';
        } else {
            // Get planned time string
            let plannedStr = this.timerForm.time.value.split(' ');
            let totalMinutes = 0;

            _.each(plannedStr, (str) => {
                totalMinutes += this.parseTimeStr(str);
            });

            return totalMinutes;
        }
    }

    /**
     *
     * @desc Parse the time string to check if it's an hour value. If
     *       so, multiply by 60 to get the total number in minutes
     *
     * @param  {String} str
     * @return {Number}
     *
     */
    parseTimeStr(str) {
        str = str.toLowerCase();

        if (str.indexOf('h') > -1) {
            str = parseFloat(str);

            return (str * 60);
        }

        return parseFloat(str);
    }

    /**

     * @desc Clear form inputs to allow for a new entry
     * @return {void}
     *
     */
    clearForm() {
        this.timerForm.title.value = '';
        this.timerForm.time.value = '';
    }

    /**
     *
     * @desc Determines if we can add a timer or not, returns valid
     *       if at least the title is not empty, time can be left
     *       empty in which case a counter should be started
     *       instead of a timer.
     *
     * @return {Boolean}
     *
     */
    validTimerForm() {
        if (this.debug.debug) {
            return true;
        }

        if (this.timerForm.title.value !== "") {
            $(this.timerForm.title).parent().removeClass('has-error');

            return true;
        } else {
            $(this.timerForm.title).parent().addClass('has-error');

            return false;
        }
    }
}

module.exports = App;
