import { FETCH_CITY, FETCH_CURRENT_CITY } from '../actions/types'

export default () => {
  return next => action => {
    const { type } = action
    if (type === FETCH_CITY) {
      action = {
        ...action,
        payload: {
          ...action.payload,
          id: Math.random + Date.now()
        }
      }
    }
    if (type === FETCH_CURRENT_CITY) {
      action = {
        ...action,
        payload: {
          ...action.payload,
          id: 'currentCity'
        }
      }
    }

    next(action)
  }
}
