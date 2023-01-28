import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { Reducer } from 'redux';
import { configurationStore } from './services/store';
import { Provider } from 'react-redux';
import { InitialState } from './services/reducers/combine-reducers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const store = configurationStore(InitialState);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
