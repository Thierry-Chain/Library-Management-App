/* eslint-disable no-unused-vars */
import axios from 'axios'
import * as actionTypes from './actionTypes'
import * as bookActions from '../books/actions'
import {
    redirect
} from '../users/action'
import {
    location,
    headers
} from '../../locations'
//import authHeader from '../authHeader'
import store from '../store'
import {
    getUserId
} from '../users/saveUser'

// teacher list data 
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
            url: `${location}/teacher/${getUserId()}`,
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
            url: `${location}/teacher/borrowers/${getUserId()}`,
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
//adding new teacher
const addTeacherFail = (error) => {
    return {
        type: actionTypes.ADD_TEACHER_FAIL,
        payload: error
    }
}
export const addTeacherPassed = () => {
    return {
        type: actionTypes.ADD_TEACHER_PASSED
    }
}

export const addNewTeacher = (teacher) => {
    return (dispatch) => {
        const data = teacher
        let allData = store.getState()
        const {
            token
        } = allData.user.more
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
        // console.log('auth-header with store teachers', authHeader)
        const config = {
            url: `${location}/teacher/${getUserId()}`,
            method: 'post',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(fetchList())
            dispatch(addTeacherPassed())
        }).catch((error) => {
            dispatch(addTeacherFail(error.response.data.message))
            if (error.response.data.message === 'Ivalid user credentials!!') {
                dispatch(redirect())
                //console.log(error.response.data.message)   

            }
        })
    }
}

export const deleteTeacher = (teacherId) => {
    return (dispatch) => {
        let allData = store.getState()
        const {
            token
        } = allData.user.more
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
        //console.log('auth-header with store teachers', authHeader)
        const config = {
            url: `${location}/teacher/${getUserId()}/${teacherId}`,
            method: 'delete',
            headers: authHeader
        }
        // console.log(config)
        axios(config).then(() => {
            dispatch(fetchList())

        }).catch((error) => {
            dispatch(addTeacherFail(error.response.data.message))
            if (error.response.data.message === 'Ivalid user credentials!!') {
                dispatch(redirect())
                //console.log(error.response.data.message)   

            }
            alert('teacher is not deleted')
        })
    }
}

export const editTeacherData = (data, teacherId) => {
    return (dispatch) => {
        let allData = store.getState()
        const {
            token
        } = allData.user.more
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
        // console.log('auth-header with store teachers', authHeader)
        const config = {
            url: `${location}/teacher/${getUserId()}/${teacherId}`,
            method: 'patch',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(fetchList())
            dispatch(fetchBorrowers())
            dispatch(addTeacherPassed())
        }).catch((error) => {
            dispatch(addTeacherFail(error.response.data.message))
            if (error.response.data.message === 'Ivalid user credentials!!') {
                dispatch(redirect())
                //console.log(error.response.data.message)   

            }

        })
    }
}
export const lendbook = (data, teacherId) => {
    return (dispatch) => {
        let allData = store.getState()
        const {
            token
        } = allData.user.more
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
        // console.log('auth-header with store teachers', authHeader)
        const config = {
            url: `${location}/teacher/lend/${getUserId()}/${teacherId}`,
            method: 'post',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(fetchBorrowers())
            //dispatch(fetchRecords())
            dispatch(addTeacherPassed())
        }).catch((error) => {
            dispatch(addTeacherFail(error.response.data.message))
            if (error.response.data.message === 'Ivalid user credentials!!') {
                dispatch(redirect())
                //console.log(error.response.data.message)   

            }
        })
    }
}
export const returnBook = (data, teacherId) => {
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
            url: `${location}/teacher/record/${getUserId()}/${teacherId}`,
            method: 'post',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(fetchBorrowers())
            //dispatch(fetchrecords)
        }).catch((error) => {
            /*console.log(error.response.data.message)*/
            dispatch(addTeacherFail(error.response.data.message))
            if (error.response.data.message === 'Ivalid user credentials!!') {
                alert('Book is not returned Please Reload Now')
                dispatch(redirect())
                //console.log(error.response.data.message)   

            }
        })
    }
}

const fetchRecordsRequest = () => {
    return {
        type: actionTypes.FETCH_RECORDS_REQUEST
    }
}
const fetchRecordsPassTeacher = (list) => {
    return {
        type: actionTypes.FETCH_RECORDS_PASS,
        payload: list
    }
}

export const fetchTeacherRecords = () => {
    return (dispatch) => {
        dispatch(fetchRecordsRequest())
        const config = {
            url: `${location}/teacher/record/${getUserId()}`,
            method: 'post',
            header: headers
        }
        axios(config).then((resp) => resp.data)
            .then((list) => {
                dispatch(fetchRecordsPassTeacher(list))
            })
            .catch((error) => {

                if (error.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(redirect())
                    //console.log(error.response.data.message)   

                }
                dispatch(addTeacherFail(error.response.data.message))
            })
    }
}