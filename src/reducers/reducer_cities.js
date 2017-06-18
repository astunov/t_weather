import { FETCH_CITY, REMOVE_CITY } from '../actions/types'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CITY:
      return [action.payload.data, ...state]
    case REMOVE_CITY:
      console.log(state)
      return state.filter(item => item.city.id !== action.payload)
  }
  return state
}
