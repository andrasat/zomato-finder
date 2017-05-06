import * as types from '../constants'

export const loginReducer = (state = null, action) => {
  switch(action.type) {
    case types.LOGIN_USER_SUCCESS : return action.payload
    case types.LOGIN_USER_FAIL : return action.error
    default: return state
  }
}