import React                from 'react';
import AddTimer             from '../containers/AddTimer';
import TimerList            from '../containers/TimerList';
import Summary              from '../containers/Summary';
import AppEvents            from '../enums/AppEvents';
import AppIcon              from '../components/AppIcon';
import Options              from '../components/Options';
import { isElectronApp }    from '../utils/utils';

// Require ipcRenderer only in electron app
const { ipcRenderer }   = (isElectronApp()) ? window.require('electron') : {};

let App = () => {

    /**
     *
     * @desc Handle electron quit event for electron App
     *
     */
    let onQuit = () => {
        ipcRenderer.send('async-message', AppEvents.QUIT);
    };

    let renderQuitButton = () => {
        if (isElectronApp()) {
            return (
                <p className="col-xs-12">
                    <button onClick={onQuit} className="btn btn-success">Quit</button>
                </p>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="main-wrapper">

            <div className="container">
                <div className="header clearfix">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="app__title"><AppIcon /> Project Timer <Options /></h1>
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
                    {renderQuitButton()}
                    <p className="col-xs-12">&copy; 2017 <a href="https://www.amayamedia.com" target="_blank">Amaya Media</a></p>
                </div>
            </footer>

        </div>
    );
};

export default App;
