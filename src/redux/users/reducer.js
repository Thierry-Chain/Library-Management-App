import * as actionTypes from './actionTypes'
import { getUser } from './saveUser'
const oldData=getUser()
  /*const initialState={
    auth:false,
    more:{},
    error:''
    } */
    const initialState= oldData ? JSON.parse(oldData):
    { auth:false, more:{}, error:'' }


const userReducer=(state=initialState,action)=>{
switch (action.type) {
    case actionTypes.USER_ERROR:
        return{
            ...state,error:action.payload
        } ;
    case actionTypes.USER_LOGIN:
        return{
            ...state,auth:true,error:'',more:action.payload
        }

    case actionTypes.USER_LOGOUT:
        return{
            ...state,auth:false,error:'',more:{}
        }

    default:
       return state
}
}
export default userReducer