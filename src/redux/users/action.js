import * as actionNames from './actionTypes.js'
import axios from 'axios'
import { location, headers } from '../../locations'
import { saveUser, getUserId, getUserEmail } from './saveUser'
import store from '../store'
import * as studentActions from '../students/actions'

const frontendLogin = (user) => {
  return {
    type: actionNames.USER_LOGIN,
    payload: user
  }
}

const loginError = (msg) => {
  return {
    type: actionNames.USER_ERROR,
    payload: msg
  }
}

const logoutFrontend = () => {
  return {
    type: actionNames.USER_LOGOUT
  }
}

const fullLogin = (user) => {
  return (dispatch) => {
    dispatch(loadingUser())
    const data = JSON.stringify(user)
    const config = {
      url: `${location}/user/login`,
      method: 'post',
      headers,
      data
    }
    axios(config)
      .then((resp) => {
        saveUser(resp.data)
        dispatch(studentActions.connectionIsBack())
        dispatch(frontendLogin(resp.data))
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          dispatch(studentActions.connectionError())
          dispatch(pauseLoadingUser())
          setTimeout(() => {
            window.location.reload()
          }, 810)
        } else {
          if (err.response.data.message === 'Ivalid user credentials!!') {
            dispatch(redirect())
          }
          dispatch(loginError(err.response.data.message))
          dispatch(pauseLoadingUser())
        }
      })
  }
}

const fullLogout = () => {
  return (dispatch) => {
    dispatch(logoutFrontend())
    dispatch(studentActions.connectionIsBack())
    localStorage.clear()
  }
}
const redirect = () => {
  return {
    type: actionNames.INVALID_CREDENTIALS
  }
}
const checkUserCredentials = () => {
  return (dispatch) => {
    const authHeader = {
      'Content-Type': 'application/json',
      'auth-token': `${JSON.parse(localStorage.getItem('token'))}`
    }
    const config = {
      url: `${location}/user/`,
      method: 'get',
      headers: authHeader
    }

    axios(config)
      .then(() => {
        dispatch(studentActions.connectionIsBack())
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          dispatch(studentActions.connectionError())
        } else {
          if (err.response.data.message === 'Ivalid user credentials!!') {
            dispatch(redirect())
          }
          dispatch(loginError(err.response.data.message))
        }
      })
  }
}
const loginAdvanced = () => {
  return {
    type: actionNames.LOGIN_ADVANCED
  }
}
const logoutAdvanced = () => {
  return {
    type: actionNames.LOGOUT_ADVANCED
  }
}
export const editUserPassword = (data) => {
  return (dispatch) => {
    let allData = store.getState()
    const { token } = allData.user.more
    const authHeader = {
      'Content-Type': 'application/json',
      'auth-token': `${token}`
    }

    let oldData = {
      email: getUserEmail(),
      password: data.oldPassword
    }
    const config = {
      url: `${location}/user/checkPassword/${getUserId()}`,
      method: 'post',
      headers: authHeader,
      data: oldData
    }

    axios(config)
      .then(() => {
        const newData = {
          password: data.newPassword
        }
        const configs = {
          url: `${location}/user/changePassword/${getUserId()}`,
          method: 'patch',
          headers: authHeader,
          data: newData
        }

        axios(configs)
          .then(() => {
            dispatch(studentActions.connectionIsBack())
          })
          .catch((error) => {
            dispatch(loginError(error.response.data.message))
          })
      })

      .catch((error) => {
        loginError(error.response.data.message)
      })
  }
}
export const removeMyAccount = () => {
  return (dispatch) => {
    let allData = store.getState()
    const { token } = allData.user.more
    const authHeader = {
      'Content-Type': 'application/json',
      'auth-token': `${token}`
    }
    const config = {
      url: `${location}/user/deleteAccount/${getUserId()}`,
      method: 'delete',
      headers: authHeader
    }
    axios(config)
      .then(() => {
        dispatch(fullLogout())
        localStorage.clear()
      })
      .catch((error) => {
        dispatch(loginError(error.response.data.message))
      })
  }
}

export const edituserInfo = (data) => {
  return (dispatch) => {
    let allData = store.getState()
    const { token } = allData.user.more
    const authHeader = {
      'Content-Type': 'application/json',
      'auth-token': `${token}`
    }

    const config = {
      url: `${location}/user/changeEmailOrUsername/${getUserId()}`,
      method: 'patch',
      headers: authHeader,
      data
    }

    axios(config)
      .then((resp) => {
        dispatch(redirect())
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          dispatch(studentActions.connectionError())
        } else {
          if (err.response.data.message === 'Ivalid user credentials!!') {
            dispatch(redirect())
          }
          dispatch(loginError(err.response.data.message))
        }
      })
  }
}
const loadingUser = () => {
  return {
    type: actionNames.LOADING_USER
  }
}
const pauseLoadingUser = () => {
  return {
    type: actionNames.PAUSE_LOADING_USER
  }
}
const clearUserErrors = () => {
  return {
    type: actionNames.CLEAR_ERRORS
  }
}
export {
  frontendLogin,
  fullLogin,
  fullLogout,
  checkUserCredentials,
  redirect,
  loginAdvanced,
  logoutAdvanced,
  loadingUser,
  pauseLoadingUser,
  clearUserErrors
}
