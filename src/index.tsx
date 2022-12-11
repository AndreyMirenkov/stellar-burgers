import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { Reducer } from 'redux';
import { configurationStore } from './services/store';
import { Provider } from 'react-redux';
import { initialState } from './services/reducers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const store = configurationStore(initialState);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
