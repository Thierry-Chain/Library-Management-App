import * as actionNames from './actionTypes.js'
import axios from 'axios'
import {
    location,
    headers,
    /*authHeader*/
} from '../../locations'
import {
    saveUser
} from './saveUser'

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
                dispatch(frontendLogin(resp.data))
            })
            .catch((err) => {
                dispatch(loginError(err.response.data.message))
            })
    }
}

const fullLogout = () => {
    return (dispatch) => {
        dispatch(logoutFrontend())
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
        axios(config).then(() => console.log('ok Smart Library'))
            .catch(error => {
                if (error.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(redirect())
                    //console.log(error.response.data.message)   

                }
            })
    }
}
export {
    frontendLogin,
    fullLogin,
    fullLogout,
    checkUserCredentials,
    redirect
}