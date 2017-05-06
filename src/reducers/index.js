import { combineReducers } from 'redux'

import { restaurantReducer } from './restaurantReducer'
import { userReducer } from './userReducer'
import { loginReducer } from './loginReducer'

export default combineReducers({
  restaurants: restaurantReducer,
  loginData: loginReducer,
  userData: userReducer
})