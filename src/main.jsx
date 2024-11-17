import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from '@redux-devtools/extension'
import rootReducer from './reducers/index.js'

// store
const store = createStore(rootReducer, composeWithDevTools())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
