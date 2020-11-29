import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './app/styles/global.scss';
import App from './app';
import VmProvider from './app/contexts/VmContext';

import createStore from './app/redux';

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <VmProvider>
        <App />
      </VmProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
