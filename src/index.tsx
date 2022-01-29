import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App'
import RootReducer from './reducers/reducer'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const store = createStore(RootReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
