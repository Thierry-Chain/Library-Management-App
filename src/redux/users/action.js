import  * as actionNames from './actionTypes.js' 
import axios from 'axios'
import { location,headers } from '../../locations'
import { saveUser } from './saveUser'

const frontendLogin= (user)=>{
    return{
        type:actionNames.USER_LOGIN,
        payload:user
    }
}

const loginError =(msg)=>{
    return{
        type:actionNames.USER_ERROR,
        payload:msg
    }
}

const logoutFrontend=()=>{
    return{
        type:actionNames.USER_LOGOUT
    }
}

const fullLogin=(user)=>{
    return (dispatch)=>{
const data=JSON.stringify(user)        
const config={
    url:`${location}/user/login`,
    method:'post',
    headers,
    data
}
axios(config).then((resp)=>{
    saveUser(resp.data);
   dispatch( frontendLogin(resp.data) )
})
.catch( (err)=>{
 dispatch( loginError(err.response.data.message) )
})
    }
}

const fullLogout=()=>{
    return (dispatch)=>{
     dispatch(logoutFrontend())
     localStorage.clear()
     //backend logout   
    }
}
export { frontendLogin,fullLogin,fullLogout } 