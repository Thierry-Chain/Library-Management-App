import * as actionNames from './actionTypes.js'
import axios from 'axios'
import {
    location,
    headers,
    /*authHeader*/
} from '../../locations'
import {
    saveUser,
    getUserId,
    getUserEmail
} from './saveUser'
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

        const data = JSON.stringify(user)
        const config = {
            url: `${location}/user/login`,
            method: 'post',
            headers,
            data
        }
        axios(config).then((resp) => {
                saveUser(resp.data);
                dispatch(studentActions.connectionIsBack())
                dispatch(frontendLogin(resp.data))
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

const fullLogout = () => {
    return (dispatch) => {
        dispatch(logoutFrontend())
        dispatch(studentActions.connectionIsBack())
        localStorage.clear()
        //backend logout   
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
        //console.log('auth config',config)
        axios(config).then(() => {
                dispatch(studentActions.connectionIsBack())
            })
            .catch(err => {
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
        const {
            token
        } = allData.user.more
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
        //console.log('auth-header with store students', authHeader)
        ///////////////////////////
        let oldData = {
            'email': getUserEmail(),
            'password': data.oldPassword
        }
        const config = {
            url: `${location}/user/checkPassword/${getUserId()}`,
            method: 'post',
            headers: authHeader,
            data: oldData
        }
        console.log('verify', config)
        axios(config).then(() => {

                const newData = {
                    password: data.newPassword
                }
                const configs = {
                    url: `${location}/user/changePassword/${getUserId()}`,
                    method: 'patch',
                    headers: authHeader,
                    data: newData
                }
                /// console.log(config)
                axios(configs).then((resp) => {
                    console.log('edited password', resp.data)
                }).catch((error) => {
                    console.log('errorx', error.response)
                    dispatch(loginError(error.response.data.message))
                })

            })

            .catch((error) => {
                console.log('failed to check', error.response.data.message)
                loginError(error.response.data.message)

            })
        ///////////////////////

    }
}
export const removeMyAccount = () => {
    return (dispatch) => {
        let allData = store.getState()
        const {
            token
        } = allData.user.more
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
        const config = {
            url: `${location}/user/deleteAccount/${getUserId()}`,
            method: 'delete',
            headers: authHeader,

        }
        axios(config).then(() => {

        }).catch((error) => {
            dispatch(loginError(error.response.data.message))

        })
    }
}



export const edituserInfo = (data) => {
    return (dispatch) => {
        let allData = store.getState()
        const {
            token
        } = allData.user.more
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
        //console.log('auth-header with store students', authHeader)
        const config = {
            url: `${location}/user/changeEmailOrUsername/${getUserId()}`,
            method: 'patch',
            headers: authHeader,
            data
        }
        /// console.log(config)
        axios(config).then((resp) => {
            dispatch(redirect())

        }).catch((err) => {
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

export {
    frontendLogin,
    fullLogin,
    fullLogout,
    checkUserCredentials,
    redirect,
    loginAdvanced,
    logoutAdvanced
}