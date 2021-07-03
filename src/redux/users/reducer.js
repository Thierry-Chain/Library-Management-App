import * as actionTypes from './actionTypes'
import { getUser } from './saveUser'
const oldData = getUser()
/*const initialState={
  auth:false,
  more:{},
  error:''
  } */
const initialState = oldData
  ? JSON.parse(oldData)
  : {
      auth: false,
      more: {},
      error: '',
      advancedAuth: false,
      loading: false
    }

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        auth: true,
        error: '',
        more: action.payload,
        loading: false
      }

    case actionTypes.USER_LOGOUT:
      return {
        auth: false,
        more: {},
        error: '',
        advancedAuth: false
      }
    case actionTypes.INVALID_CREDENTIALS:
      return {
        auth: false,
        more: {},
        error: ''
      }
    case actionTypes.LOGIN_ADVANCED:
      return {
        ...state,
        advancedAuth: true
      }
    case actionTypes.LOGOUT_ADVANCED:
      return {
        ...state,
        advancedAuth: false
      }
    case actionTypes.LOADING_USER:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PAUSE_LOADING_USER:
      return {
        ...state,
        loading: false
      }
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: ''
      }
    default:
      return state
  }
}
export default userReducer
