import * as types from '../constants'

export const restaurantReducer = (state = [], action) => {
  switch(action.type) {
    case types.FETCH_REST_SUCCESS : return action.payload.restaurants
    case types.FETCH_REST_FAIL : return action.error
    default: return state
  }
}