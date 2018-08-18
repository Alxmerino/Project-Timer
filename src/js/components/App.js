const React      = require('react');
const TimerList  = require('../containers/TimerList');
const Summary    = require('../components/Summary');
const Toolbar    = require('../components/Toolbar');
const Header     = require('../components/Header');
const Footer     = require('../components/Footer');
const Messages   = require('../components/Messages');

let App = () => {

    return (
        <div className="main-wrapper">

            <Toolbar />

            <Header />

            <div className="container container--app">
                <div className="row">
                    <div className="col-xs-12">

                        <Messages />

                        <div className="panel panel-default">
                            <TimerList />
                            <Summary />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    );
};

module.exports = App;
