import registerServiceWorker from './registerServiceWorker'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

const loggerMiddleware = createLogger();

function saveToLocalStorage(state) {
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }
  catch (e) {
    console.log(e);
  }
}

function loadfromLocalStorage() {
  try{
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  }
  catch (e) {
    console.log(e);
    return undefined;
  }
}



const persistedState = loadfromLocalStorage();

export const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
