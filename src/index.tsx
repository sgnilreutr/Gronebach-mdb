import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { Provider } from 'react-redux'
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