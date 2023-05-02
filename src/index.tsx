import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import { inject } from '@vercel/analytics'
import { store } from './store/store'

import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

inject()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)

serviceWorkerRegistration.register()
