import * as types from '../constants'
import keys from '../../config'

export const fetchRestSuccess = payload => ({
  type: types.FETCH_REST_SUCCESS,
  payload
})

export const fetchRestFail = error => ({
  type: types.FETCH_REST_FAIL,
  error
})

export const registerUserSuccess = () => ({
  type: types.REGISTER_USER_SUCCESS
})

export const registerUserFail = error => ({
  type: types.REGISTER_USER_FAIL,
  error
})

export const fetchRest = (city, query) => (
  dispatch => (
    fetch('https://developers.zomato.com/api/v2.1/cities?q='+city,
    { headers: { 'user-key': keys.ZOMATO_API }})
      .then(res => res.json())
      .then(data => {
        const cityId = data.location_suggestions[0].id
        return fetch('https://developers.zomato.com/api/v2.1/search?entity_id='+cityId+'&entity_type=city&sort=rating&q='+query)
      })
      .then(res => res.json())
      .then(data => dispatch(fetchRestSuccess(data)))
      .catch(err => dispatch(fetchRestFail(err)))
  )
)