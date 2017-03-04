const React     = require('react');


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            timers: {}
        }
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
                        <form className="row">
                            <div className="form-group col-xs-7">
                                <input type="text" placeholder="What are you working on today?" className="form-control" />
                            </div>
                            <div className="form-group col-xs-5 col-sm-3">
                                <input type="text" placeholder="How long?" className="form-control" />
                            </div>
                            <div className="form-group col-xs-12 col-sm-2">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    onClick={this._addTimer.bind(this)}
                                >
                                    Add Timer
                                </button>
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

    _addTimer() {
        console.log('add a timer')
    }
}

module.exports = App;
