import * as types from '../constants'

export const userReducer = (state = [], action) => {
  switch(action.type) {
    case types.FETCH_USER_DATA_SUCCESS : return action.payload
    case types.FETCH_USER_DATA_FAIL : return action.error
    default: return state
  }
}