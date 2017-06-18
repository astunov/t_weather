import axios from 'axios'
import { FETCH_CITY, REMOVE_CITY } from './types'

const API_KEY = '74cd51f280d3a0e329b7e48ba7e90225'
const ROOT = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

export function fetchWeather(city) {
  const url = `${ROOT}&q=${city},us`
  const request = axios.get(url)

  return {
    type: FETCH_CITY,
    payload: request
  }
}

export function removeCity(id) {
  return {
    type: REMOVE_CITY,
    payload: id
  }
}
