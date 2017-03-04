const React     = require('react');
const $         = require('jquery');

class App extends React.Component {
    constructor() {
        super();

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
    }

    render() {
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

                <div className="container">Container1
                </div>

                <footer className="container footer">
                    <div className="row">
                        <p className="col-xs-12">&copy; 2016 Amaya Media</p>
                    </div>
                </footer>

            </div>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        let $form = $(e.target);

        if (this.validTimerForm()) {
            this._addTimer($form);
        }
    }

    _addTimer($form) {
        // Lets clear the form to allow for a new entry
        this.clearForm();

        console.log('Add a timer woot!');
    }

    clearForm() {
        this.timerForm.title.value = '';
        this.timerForm.time.value = '';
    }

    /**
     * @desc Determines if we can add a timer or not, returns valid
     *       if at least the title is not empty, time can be left
     *       empty in which case a counter should be started
     *       instead of a timer.
     * @return {Boolean}
     */
    validTimerForm() {
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
