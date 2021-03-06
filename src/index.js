import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'

import App from './components/app'
import reducers from './reducers'
import { FETCH_CITY } from './actions/types'
import { loadState } from './localStorage'
import UniqueId from './middlewares/uniqueId'
import SaveStateToLocalStorage from './middlewares/saveStateToLocalStorage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedState = loadState()
const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(
    applyMiddleware(ReduxThunk, UniqueId, SaveStateToLocalStorage)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
