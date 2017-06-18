import { combineReducers } from 'redux'
import weather from './reducer_cities'

const rootReducer = combineReducers({
  weather
})

export default rootReducer
