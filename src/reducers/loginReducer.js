import { AsyncStorage } from 'react-native'

import * as types from '../constants'

const loggedIn = (state, payload) => {
  try {
    AsyncStorage.multiSet([
      ['token': payload.token],
      ['id': payload.id]
    ])
    return payload
  } catch(error) {
    return error
  }
}

export const loginReducer = (state = null, action) => {
  switch(action.type) {
    case types.LOGIN_USER_SUCCESS : return loggedIn(state, action.payload)
    case types.LOGIN_USER_FAIL : return action.error
    default: return state
  }
}