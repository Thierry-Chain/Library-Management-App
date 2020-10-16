/* eslint-disable no-unused-vars */
import axios from 'axios'
import * as actionTypes from './actionTypes'
import { location,headers } from '../../locations'
import { getUserId } from '../users/saveUser'
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

// borrowed books list data
const fetchBorrowedRequest=()=>{
    return {
        type:actionTypes.FETCH_BORROWED_REQUEST
    }
}

const fetchBorrowedSuccess=(borrowed)=>{
    return {
        type:actionTypes.FETCH_BORROWED_PASS,
        payload:borrowed
    }
}


export const fetchList = ()=>{
    return (dispatch)=>{
        dispatch(fetchListRequest())
const config={
    url:`${location}/book/${getUserId()}`,
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

export const fetchBorrowed = ()=>{
    return (dispatch)=>{
        dispatch(fetchBorrowedRequest())
const config={
    url:`${location}/student/borrowedBook/${getUserId()}`,
    method:'get',
    header:headers
}
axios(config).then((resp)=>resp.data)
.then((books)=>{
    dispatch(fetchBorrowedSuccess(books))
} )
.catch((resp)=>{
    dispatch(fetchListFailure(resp.response.data.message))
})
    }
}