/* eslint-disable no-unused-vars */
import axios from 'axios'
import * as actionTypes from './actionTypes'
import {location,headers} from '../../locations'
import {getUserId} from '../users/saveUser'
// student list data 
const fetchListRequest=()=>{
    return {
        type:actionTypes.FETCH_LIST_REQUEST
    }
} 

const fetchListSuccess=(list)=>{
    return {
        type:actionTypes.FETCH_LIST_PASS,
        payload:list
    }
}

const fetchListFailure=(error)=>{
    return {
        type:actionTypes.FETCH_ERROR,
        payload:error
    }
}

// borrowers list data
const fetchBorrowersRequest=()=>{
    return {
        type:actionTypes.FETCH_BORROWERS_REQUEST
    }
}

const fetchBorrowersSuccess=(borrowers)=>{
    return {
        type:actionTypes.FETCH_BORROWERS_PASS,
        payload:borrowers
    }
}



export const fetchList = ()=>{
    return (dispatch)=>{
        dispatch(fetchListRequest())
const config={
    url:`${location}/teacher/${getUserId()}`,
    method:'get',
    header:headers
}
axios(config).then((resp)=>resp.data)
.then((list)=>{
    dispatch(fetchListSuccess(list))
} )
.catch((resp)=>{
    dispatch(fetchListFailure(resp.response.data.message))
})
    }
}

export const fetchBorrowers = ()=>{
    return (dispatch)=>{
        dispatch(fetchBorrowersRequest())
const config={
    url:`${location}/teacher/borrowers/${getUserId()}`,
    method:'get',
    header:headers
}
axios(config).then((resp)=>resp.data)
.then((borrowers)=>{
    dispatch(fetchBorrowersSuccess(borrowers))
} )
.catch((resp)=>{
    dispatch(fetchListFailure(resp.response.data.message))
})
    }
}