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

export const loginUserSuccess = payload => ({
  type: types.LOGIN_USER_SUCCESS,
  payload
})

export const loginUserFail = error => ({
  type: types.LOGIN_USER_FAIL,
  error
})

export const fetchUserSuccess = payload => ({
  type: types.FETCH_USER_DATA_SUCCESS,
  payload
})

export const fetchUserFail = error => ({
  type: types.FETCH_USER_DATA_FAIL,
  error
})

export const addWishListSuccess = () => ({
  type: types.ADD_RESTAURANT_WISHLIST_SUCCESS
})

export const addWishListFail = error => ({
  type: types.ADD_RESTAURANT_WISHLIST_FAIL,
  error
})

export const deleteWishListSuccess = () => ({
  type: types.DELETE_RESTAURANT_WISHLIST_SUCCESS
})

export const deleteWishListFail = error => ({
  type: types.DELETE_RESTAURANT_WISHLIST_FAIL,
  error
})

export const fetchRest = (city, query) => (
  dispatch => (
    fetch('https://developers.zomato.com/api/v2.1/cities?q='+city,
    { headers: { 'user-key': keys.ZOMATO_API }})
      .then(res => res.json())
      .then(data => {
        const cityId = data.location_suggestions[0].id
        return fetch('https://developers.zomato.com/api/v2.1/search?entity_id='+cityId+'&entity_type=city&sort=rating&q='+query,
      { headers: { 'user-key': keys.ZOMATO_API }})
      })
      .then(res => res.json())
      .then(data => dispatch(fetchRestSuccess(data)))
      .catch(err => dispatch(fetchRestFail(err)))
  )
)

export const fetchUser = id => (
  dispatch => (
    fetch('https://zomato-finder.herokuapp.com/user/'+id)
      .then(res => res.json())
      .then(data => dispatch(fetchUserSuccess(data)))
      .catch(err => dispatch(fetchUserFail(err)))
  )
)

export const addRestaurant = (restaurant, token) => (
  dispatch => (
    fetch('https://zomato-finder.herokuapp.com/fav', {
      method: 'post',
      body: JSON.stringify(restaurant),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(() => dispatch(addWishListSuccess()))
      .catch(err => dispatch(addWishListFail(err)))
  )
)

export const deleteRestaurant = (id, token) => (
  dispatch => (
    fetch('https://zomato-finder.herokuapp.com/fav/'+id, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(() => dispatch(deleteWishListSuccess()))
      .catch(err => dispatch(deleteWishListFail(err)))
  )
)

export const login = user => (
  dispatch => (
    fetch('https://zomato-finder.herokuapp.com/user/login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => dispatch(loginUserSuccess(data)))
      .catch(err => dispatch(loginUserFail(err)))
  )
)

export const register = user => (
  dispatch => (
    fetch('https://zomato-finder.herokuapp.com/user/register', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => dispatch(registerUserSuccess()))
      .catch(err => dispatch(registerUserFail(err)))
  )
)

