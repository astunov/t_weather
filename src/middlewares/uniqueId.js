import { FETCH_CITY, FETCH_CURRENT_CITY } from '../actions/types'
import { v4 } from 'uuid'

export default () => {
  return next => action => {
    let { payload, type } = action
    if (type === FETCH_CITY) {
      payload = Object.assign(payload, { id: v4() })
    }
    if (type === FETCH_CURRENT_CITY) {
      payload = Object.assign(payload, { id: 'currentCity' })
    }

    next(action)
  }
}
