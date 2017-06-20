import axios from 'axios'
import {FETCH_CITY, REMOVE_CITY, ERROR_CITY, ERROR_CLEAR} from './types'

const API_KEY = '74cd51f280d3a0e329b7e48ba7e90225'
const ROOT = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

// todo: idea to get list of identical cities
// const ROOT_FIND = `http://api.openweathermap.org/data/2.5/find?appid=${API_KEY}`
// url = `${ROOT_FIND}&q=${name}&type=like&sort=population&cnt=30`

export function fetchCity({ name, lat, lon }, type = FETCH_CITY) {
  let url
  if (name) {
    url = `${ROOT}&q=${name},us`
  } else if (lat & lon) {
    url = `${ROOT}&lat=${lat}&lon=${lon}`
  }
  const request = axios.get(url)

  return function(dispatch) {
    request
      .then(response => {
        dispatch({ type, payload: response.data })
      })
      .catch(err => {
        dispatch({
          type: ERROR_CITY,
          payload: { message: err.message, errQuery: name }
        })
      })
  }
}

export function removeCity(id) {
  return {
    type: REMOVE_CITY,
    payload: id
  }
}

export function clearError() {
  return {type: ERROR_CLEAR}
}