import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from '../js/components/App';
import PersistStore  from '../js/helpers/PersistStore';
import store from '../js/store';

it('renders without crashing', () => {
    const app = document.createElement('div');

    render(<Provider store={store}>
        <App/>
    </Provider>, app);
});

it('persists store', () => {
    let store = new PersistStore();

    expect(store).toBeInstanceOf(PersistStore);
});
