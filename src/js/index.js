import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import App from './components/App'
import Logger from './components/Logger'

const app = document.getElementById('app')
const Debug = new Logger('App');

// Distpatch initial app load
store.dispatch({type: 'APP_LOADED'});

render(<Provider store={store}>
    <App/>
</Provider>, app);
