import { loadState, saveState } from '../localStorage'
import { FETCH_CITY, REMOVE_CITY } from '../actions/types'

export default () => {
  return next => action => {
    let { payload, type } = action
    const state = loadState()

    if (type === FETCH_CITY) {
      saveState({
        cities: {
          queryCities: [...state.cities.queryCities, payload]
        }
      })
    }

    if (type === REMOVE_CITY) {
      saveState({
        cities: {
          queryCities: state.cities.queryCities.filter(
            city => city.id !== payload
          )
        }
      })
    }

    next(action)
  }
}
