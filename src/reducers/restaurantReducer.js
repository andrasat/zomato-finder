import * as types from '../constants'

export const restaurantReducer = (state = [], action) => {
  switch(action.type) {
    case types.FETCH_REST_SUCCESS : return action.payload
    case types.FETCH_REST_FAIL : return action.error
    default: return state
  }
}