import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import ReduxPromise from 'redux-promise'

import App from './components/app'
import reducers from './reducers'
import { FETCH_CITY } from './actions/types'
import { loadState, saveState } from './localStorage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedState = loadState()
const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(ReduxPromise))
)

store.subscribe(() => {
  saveState({ weather: store.getState().weather })
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.container')
)
