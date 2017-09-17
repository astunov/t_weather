import { FETCH_CITY, FETCH_CURRENT_CITY } from '../actions/types'

export default () => {
  return next => action => {
    let { payload, type } = action
    if (type === FETCH_CITY) {
      payload = { ...payload, id: Math.random + Date.now() }
    }
    if (type === FETCH_CURRENT_CITY) {
      payload = { ...payload, id: 'currentCity' }
    }

    next(action)
  }
}
