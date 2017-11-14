const React      = require('react');
const TimerList  = require('../containers/TimerList');
const Summary    = require('../containers/Summary');
const AddTimer   = require('../components/AddTimer');
const AppIcon    = require('../components/AppIcon');
const Options    = require('../components/Options');
const Toolbar    = require('../components/Toolbar');

let App = () => {

    return (
        <div className="main-wrapper">

            <Toolbar />

            <div className="container container--app">
                <div className="header clearfix">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="app__title"><AppIcon /> Project Timer <Options /></h1>
                        </div>
                    </div>
                    <AddTimer />
                </div>
            </div>

            <div className="container container--app">
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
                    <p className="col-xs-12">&copy; 2017 <a href="https://www.amayamedia.com" target="_blank" rel="noopener noreferrer">Amaya Media</a></p>
                </div>
            </footer>

        </div>
    );
};

module.exports = App;
