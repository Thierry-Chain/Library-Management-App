/* eslint-disable no-unused-vars */
import axios from 'axios'
import * as actionTypes from './actionTypes'
import * as bookActions from '../books/actions'
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
            dispatch(bookActions.fetchList())
            dispatch(bookActions.fetchBorrowed())
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
            dispatch(bookActions.fetchList())
            dispatch(bookActions.fetchBorrowed())

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
            dispatch(bookActions.fetchList())
            dispatch(bookActions.fetchBorrowed())
        }).catch((error) => {
            alert('Book is not returned Please Restart')
            dispatch(addStudentFail(error.response.data.message))
        })
    }
}

export const promoteStudents = () => {
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
            url: `${location}/studentSettings/promoteStudents/${getUserId()}`,
            method: 'post',
            headers: authHeader,

        }
        console.log(config)
        axios(config).then((resp) => {
            dispatch(fetchList())
            dispatch(fetchBorrowers())
            dispatch(fetchRecords())
            console.log('promote', resp)
        }).catch((error) => {
            console.log('not promoted', error.response.data)
            dispatch(addStudentFail(error.response.data.message))

        })
    }
}

export const deleteStudentRecords = () => {
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
            url: `${location}/studentSettings/deleteAllRecords/${getUserId()}`,
            method: 'delete',
            headers: authHeader,

        }
        console.log(config)
        axios(config).then((resp) => {
            dispatch(fetchRecords())
            console.log('deleteStudentrecords', resp)
        }).catch((error) => {
            console.log('deleteStudentrecords', error.response.data)
            dispatch(addStudentFail(error.response.data.message))

        })
    }
}



export const deleteStudentBorrowers = () => {
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
            url: `${location}/studentSettings/deleteAllBorrowers/${getUserId()}`,
            method: 'delete',
            headers: authHeader,

        }
        console.log(config)
        axios(config).then((resp) => {
            // dispatch(fetchfinalists)

            console.log('deleteStudentBorrowers', resp)
        }).catch((error) => {
            console.log('deleteStudentBorrowers', error.response.data)
            dispatch(addStudentFail(error.response.data.message))

        })
    }
}

export const deleteStudentList = () => {
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
            url: `${location}/studentSettings/deleteAllStudents/${getUserId()}`,
            method: 'delete',
            headers: authHeader,

        }
        console.log(config)
        axios(config).then((resp) => {
            // dispatch(fetchfinalists)

            console.log('deleteStudentList', resp)
        }).catch((error) => {
            console.log('deleteStudentList', error.response.data)
            dispatch(addStudentFail(error.response.data.message))

        })
    }
}
const fetchFinalistsRequest = () => {
    return {
        type: actionTypes.FETCH_FINALIST_REQUEST
    }
}

const fetchFinalistsPass = (list) => {
    return {
        type: actionTypes.FETCH_FINALIST_PASS,
        payload: list
    }
}
export const fetchFinalists = () => {
    return (dispatch) => {
        dispatch(fetchFinalistsRequest())
        const config = {
            url: `${location}/studentSettings/allFinalists/${getUserId()}`,
            method: 'get',
            header: headers
        }
        axios(config).then((resp) => resp.data)
            .then((list) => {
                dispatch(fetchFinalistsPass(list))
            })
            .catch((resp) => {
                dispatch(fetchListFailure(resp.response.data.message))
            })
    }
}

export const deleteFinalist = (studentId) => {
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
            url: `${location}/studentSettings/deleteFinalist/${getUserId()}/${studentId}`,
            method: 'delete',
            headers: authHeader
        }
        axios(config).then(() => {
            dispatch(fetchFinalists())
        }).catch((error) => {
            dispatch(addStudentFail(error.response.data.message))
        })
    }
}

export const returnFinalistBook = (studentId) => {
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
            url: `${location}/studentSettings/returnForFinalist/${getUserId()}/${studentId}`,
            method: 'post',
            headers: authHeader
        }
        axios(config).then(() => {
            dispatch(fetchFinalists())
        }).catch((error) => {
            dispatch(addStudentFail(error.response.data.message))
        })
    }
}