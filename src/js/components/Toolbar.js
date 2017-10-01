const { isElectronApp } = require('../utils/utils');
const AppEvents         = require('../enums/AppEvents');
const React             = require('react');

// Require ipcRenderer only in electron app
const { ipcRenderer }   = (isElectronApp()) ? window.require('electron') : {};

let Toolbar = () => {
    // Bail early if it's not an Electron app
    if (!isElectronApp()) {
        return null;
    }

    /**
     *
     * @desc Handle electron close event
     *
     */
    let onClose = () => {
        ipcRenderer.send(AppEvents.CLOSE);
    }

    /**
     *
     * @desc Handle electron minimize event
     *
     */
    let onMinimize = () => {
        ipcRenderer.send(AppEvents.MINIMIZE);
    }

    return (
        <div className="toolbar">
            <div className="toolbar__icons">
                <a href="#close" className="toolbar__icon toolbar__icon--close" onClick={onClose}>x</a>
                <a href="#minimize" className="toolbar__icon toolbar__icon--minimize" onClick={onMinimize}>&mdash;</a>
            </div>
        </div>
    );
}

module.exports = Toolbar;
