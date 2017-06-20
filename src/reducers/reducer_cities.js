import {
  FETCH_CITY,
  REMOVE_CITY,
  ERROR_CITY,
  ERROR_CLEAR,
  FETCH_CURRENT_CITY
} from '../actions/types'

export default function(state = {}, action) {
  const { payload } = action
  switch (action.type) {
    case FETCH_CITY:
      return { ...state, queryCities: [...state.queryCities, payload] }
    case FETCH_CURRENT_CITY:
      return { ...state, currentCity: payload }
    case REMOVE_CITY:
      return {
        ...state,
        queryCities: state.queryCities.filter(item => item.id !== payload)
      }
    case ERROR_CITY:
      return { ...state, error: payload }
    case ERROR_CLEAR:
      return { ...state, error: {} }

    default:
      return state
  }
  return state
}
