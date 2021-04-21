import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'regenerator-runtime/runtime'

import store from './src/redux/store';
import App from './src/containers/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
