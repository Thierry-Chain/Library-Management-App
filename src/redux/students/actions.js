/* eslint-disable no-unused-vars */
import axios from 'axios'
import * as actionTypes from './actionTypes'
import {location,headers,authHeader} from '../../locations'
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
    url:`${location}/student/${getUserId()}`,
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
    url:`${location}/student/borrower/${getUserId()}`,
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

const addStudentFail=(error)=>{
    return{
        type:actionTypes.ADD_STUDENT_FAIL,
        payload:error
    }
}
export const addStudentPassed=()=>{
    return{
        type:actionTypes.ADD_STUDENT_PASSED
    }
}

export const addNewStudent= (student)=>{
    return (dispatch)=> {
        const data=student
        const config={
          url:`${location}/student/${getUserId()}`,
          method:'post',
          headers:authHeader,data
        }
        axios(config).then((resp)=>{
            dispatch(fetchList())
            dispatch(addStudentPassed())
        }).catch((error)=>{
            dispatch(addStudentFail(error.response.data.message))
        })
    }
}

export const deleteTheStudent= (studentId)=>{
    return (dispatch)=> {
        const config={
          url:`${location}/student/${getUserId()}/${studentId}`,
          method:'delete',
          headers:authHeader
        }
        axios(config).then((resp)=>{
            dispatch(fetchList())
           // console.log(resp)
        }).catch((error)=>{
            dispatch(addStudentFail(error.response.data.message))
            console.log(error.response)
        })
    }
}

export const editStudentData= (data,studentId)=>{
    return (dispatch)=> {
        const config={
          url:`${location}/student/${getUserId()}/${studentId}`,
          method:'patch',
          headers:authHeader,data
        }
        axios(config).then(()=>{
          dispatch(fetchList())
          dispatch(addStudentPassed())
        }).catch((error)=>{
            dispatch(addStudentFail(error.response.data.message))
        })
    }
}

export const lendbook= (data,studentId)=>{
    return (dispatch)=> {
        const config={
          url:`${location}/student/lend/${getUserId()}/${studentId}`,
          method:'post',
          headers:authHeader,data
        }
        axios(config).then(()=>{
            dispatch(fetchList())
            dispatch(fetchBorrowers())
            dispatch(addStudentPassed())
        }).catch((error)=>{
            
            dispatch(addStudentFail(error.response.data.message))
        })
    }
}

export const retunBook= (data,studentId)=>{
    return (dispatch)=> {
        const config={
          url:`${location}/student/record/${getUserId()}/${studentId}`,
          method:'post',
          headers:authHeader,data
        }
        axios(config).then(()=>{
           dispatch(fetchList())
           dispatch(fetchBorrowers())
        }).catch((error)=>{
            alert('Book is not returned Please Restart')
        dispatch(addStudentFail(error.response.data.message))
        })
    }
}