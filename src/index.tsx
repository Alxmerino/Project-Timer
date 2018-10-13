import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/Header';

function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Header />
        </React.Fragment>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
