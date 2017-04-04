import React            from 'react';
import AddTimer         from '../containers/AddTimer';
import TimerList        from '../containers/TimerList';
import Summary          from '../containers/Summary';

let App = () => {

    /**
     *
     * @desc Handle electron quit event
     *
     */
    let onQuit = () => {
        // ipcRenderer.send('async-message', 'quit');
    }

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
                            <Summary />
                        </div>
                    </div>
                </div>
            </div>

            <footer className="container footer">
                <div className="row">
                    <p className="col-xs-12">
                        <button onClick={onQuit} className="btn btn-success">Quit</button>
                    </p>
                    <p className="col-xs-12">&copy; 2017 Amaya Media</p>
                </div>
            </footer>

        </div>
    );
};

export default App;
