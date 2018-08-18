const React      = require('react');

class Footer extends React.Component {
    render() {
        const copyYear = new Date();

        return (
            <footer className="container footer">
                <div className="row">
                    <p className="col-xs-12">&copy; {copyYear.getFullYear()} <a href="https://www.amayamedia.com" target="_blank" rel="noopener noreferrer">Amaya Media</a></p>
                </div>
            </footer>
        );
    }
}

module.exports = Footer;
