const React      = require('react');

const AppIcon    = require('../components/AppIcon');
const Options    = require('../components/Options');
const AddTimer   = require('../components/AddTimer');

class Header extends React.Component {
    render() {
        const showAddTimer = this.props.hasOwnProperty('showAddTimer')
            ? this.props.showAddTimer
            : true;

        return (
            <div className="container container--app">
                <div className="header clearfix">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="app__title"><AppIcon /> Saturn <Options /></h1>
                        </div>
                    </div>

                    {showAddTimer ? <AddTimer /> : null}
                </div>
            </div>
        );
    }
}

module.exports = Header;
