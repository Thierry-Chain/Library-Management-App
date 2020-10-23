/* eslint-disable no-unused-vars */
import axios from 'axios'
import * as actionTypes from './actionTypes'
import {
    location,
    headers
} from '../../locations'
//import authHeader from '../authHeader' 
import {
    getUserId
} from '../users/saveUser'
import store from '../store'


// student list data 
const fetchListRequest = () => {
    return {
        type: actionTypes.FETCH_LIST_REQUEST
    }
}

const fetchListSuccess = (list) => {
    return {
        type: actionTypes.FETCH_LIST_PASS,
        payload: list
    }
}

const fetchRecordRequest = () => {
    return {
        type: actionTypes.FETCH_RECORDS_REQUEST
    }
}

const fetchRecordPass = (records) => {
    return {
        type: actionTypes.FETCH_RECORDS_PASS,
        payload: records
    }
}

const fetchListFailure = (error) => {
    return {
        type: actionTypes.FETCH_ERROR,
        payload: error
    }
}

// borrowers list data
const fetchBorrowersRequest = () => {
    return {
        type: actionTypes.FETCH_BORROWERS_REQUEST
    }
}

const fetchBorrowersSuccess = (borrowers) => {
    return {
        type: actionTypes.FETCH_BORROWERS_PASS,
        payload: borrowers
    }
}



export const fetchList = () => {
    return (dispatch) => {
        dispatch(fetchListRequest())
        const config = {
            url: `${location}/student/${getUserId()}`,
            method: 'get',
            header: headers
        }
        axios(config).then((resp) => resp.data)
            .then((list) => {
                dispatch(fetchListSuccess(list))
            })
            .catch((resp) => {
                dispatch(fetchListFailure(resp.response.data.message))
            })
    }
}

export const fetchBorrowers = () => {
    return (dispatch) => {
        dispatch(fetchBorrowersRequest())
        const config = {
            url: `${location}/student/borrower/${getUserId()}`,
            method: 'get',
            header: headers
        }
        axios(config).then((resp) => resp.data)
            .then((borrowers) => {
                dispatch(fetchBorrowersSuccess(borrowers))
            })
            .catch((resp) => {
                dispatch(fetchListFailure(resp.response.data.message))
            })
    }
}

const addStudentFail = (error) => {
    return {
        type: actionTypes.ADD_STUDENT_FAIL,
        payload: error
    }
}
export const addStudentPassed = () => {
    return {
        type: actionTypes.ADD_STUDENT_PASSED
    }
}

export const addNewStudent = (student) => {
    return (dispatch) => {
        const data = student
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
            url: `${location}/student/${getUserId()}`,
            method: 'post',
            headers: authHeader,
            data
        }
        axios(config).then((resp) => {
            dispatch(fetchList())
            dispatch(addStudentPassed())
        }).catch((error) => {
            dispatch(addStudentFail(error.response.data.message))
        })
    }
}

export const deleteTheStudent = (studentId) => {
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
            url: `${location}/student/${getUserId()}/${studentId}`,
            method: 'delete',
            headers: authHeader
        }
        axios(config).then(() => {
            dispatch(fetchList())
        }).catch((error) => {
            dispatch(addStudentFail(error.response.data.message))
        })
    }
}

export const editStudentData = (data, studentId) => {
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
            url: `${location}/student/${getUserId()}/${studentId}`,
            method: 'patch',
            headers: authHeader,
            data
        }
        /// console.log(config)
        axios(config).then(() => {
            dispatch(fetchList())
            dispatch(addStudentPassed())
        }).catch((error) => {
            dispatch(addStudentFail(error.response.data.message))
        })
    }
}

export const lendbook = (data, studentId) => {
    return (dispatch) => {
        let allData = store.getState()
        const {
            token
        } = allData.user.more
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
        //  console.log('auth-header with store students', authHeader)
        const config = {
            url: `${location}/student/lend/${getUserId()}/${studentId}`,
            method: 'post',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(fetchList())
            dispatch(fetchBorrowers())
            dispatch(fetchRecords())
            dispatch(addStudentPassed())
        }).catch((error) => {

            dispatch(addStudentFail(error.response.data.message))
        })
    }
}

export const fetchRecords = () => {
    return (dispatch) => {
        dispatch(fetchRecordRequest())
        const config = {
            url: `${location}/student/record/${getUserId()}`,
            method: 'post',
            header: headers
        }
        axios(config).then((resp) => resp.data)
            .then((list) => {
                dispatch(fetchRecordPass(list))
            })
            .catch((error) => {
                //  console.log(error.response.data)
                dispatch(addStudentFail(error.response.data.message))
            })
    }
}

export const returnBook = (data, studentId) => {
    return (dispatch) => {
        let allData = store.getState()
        const {
            token
        } = allData.user.more
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
        /// console.log('auth-header with store students', authHeader)
        const config = {
            url: `${location}/student/record/${getUserId()}/${studentId}`,
            method: 'post',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(fetchList())
            dispatch(fetchBorrowers())
        }).catch((error) => {
            alert('Book is not returned Please Restart')
            dispatch(addStudentFail(error.response.data.message))
        })
    }
}