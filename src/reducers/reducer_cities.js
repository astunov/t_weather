import { FETCH_CITY, REMOVE_CITY, ERROR_CITY } from '../actions/types'

export default function(state = [], action) {
  const { payload } = action
  switch (action.type) {
    case FETCH_CITY:
      return [payload, ...state]
    case REMOVE_CITY:
      return state.filter(item => item.city.id !== payload)
    case ERROR_CITY:
      return [payload, ...state]
  }
  return state
}
