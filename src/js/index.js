import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'
const app = document.getElementById('app')

render(<Provider store={store}>
    <App/>
</Provider>, app);
