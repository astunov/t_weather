import { FETCH_CITY } from '../actions/types'
import { v4 } from 'uuid'

export default ({ dispatch }) => {
  return next => action => {
    let { payload, type } = action
    if (type === FETCH_CITY) {
      payload = Object.assign(payload, { id: v4() })
    }

    next(action)
  }
}
