import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { createStore } from 'redux';
import RootReducer from './reducers/reducer';
// import logger from 'redux-logger'

const store = createStore(
  RootReducer,
);
// const store = createStore(
//   RootReducer,
//   applyMiddleware(logger),
// );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
