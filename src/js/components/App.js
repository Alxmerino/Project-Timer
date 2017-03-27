import React  from 'react';
import AddTimer             from '../containers/AddTimer';
import TimerList            from '../containers/TimerList';

let App = () => {
    return (
        <div className="main-wrapper">

            <div className="container">
                <div className="header clearfix">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1>Projects Timer</h1>
                        </div>
                    </div>
                    <AddTimer />
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="panel panel-default">
                            <TimerList />
                            <div className="panel-footer timerSumary">
                                <h4 className="timerSumary__text">Summary</h4>
                                <div className="timerSumary__totals">
                                    <span className="timerSumary__legend">Worked/Planned - </span>
                                    03:45:00/07:00:00
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="container footer">
                <div className="row">
                    <p className="col-xs-12">&copy; 2017 Amaya Media</p>
                </div>
            </footer>

        </div>
    );
};

export default App;
