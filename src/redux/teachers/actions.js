import axios from 'axios'
import * as actionTypes from './actionTypes'
import * as bookActions from '../books/actions'
import * as studentsActions from '../students/actions'
import {
    redirect
} from '../users/action'
import {
    location,
    headers
} from '../../locations'

import store from '../store'
import {
    getUserId
} from '../users/saveUser'



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
                dispatch(studentsActions.connectionIsBack())
                dispatch(fetchListSuccess(list))
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    dispatch(studentsActions.connectionError())
                } else {

                    if (error.response.data.message === 'Ivalid user credentials!!') {
                        dispatch(redirect())
                    }
                    dispatch(fetchListFailure(error.response.data.message))
                }

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
                dispatch(studentsActions.connectionIsBack())
                dispatch(fetchBorrowersSuccess(borrowers))
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    dispatch(studentsActions.connectionError())
                } else {

                    if (error.response.data.message === 'Ivalid user credentials!!') {
                        dispatch(redirect())
                    }
                    dispatch(fetchListFailure(error.response.data.message))
                }
            })
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

        const config = {
            url: `${location}/teacher/${getUserId()}`,
            method: 'post',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(studentsActions.connectionIsBack())
            dispatch(fetchList())
            dispatch(addTeacherPassed())
        }).catch((error) => {
            if (error.message === 'Network Error') {
                dispatch(studentsActions.connectionError())
            } else {

                if (error.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(redirect())
                }
                dispatch(fetchListFailure(error.response.data.message))
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

        const config = {
            url: `${location}/teacher/${getUserId()}/${teacherId}`,
            method: 'delete',
            headers: authHeader
        }

        axios(config).then(() => {
            dispatch(studentsActions.connectionIsBack())
            dispatch(fetchList())
            dispatch(fetchBorrowers())
            dispatch(fetchTeacherRecords())
        }).catch((error) => {

            if (error.message === 'Network Error') {
                dispatch(studentsActions.connectionError())
            } else {

                if (error.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(redirect())
                }
                dispatch(fetchListFailure(error.response.data.message))
                alert('teacher is not deleted')
            }
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

        const config = {
            url: `${location}/teacher/${getUserId()}/${teacherId}`,
            method: 'patch',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(studentsActions.connectionIsBack())
            dispatch(fetchList())
            dispatch(fetchBorrowers())
            dispatch(addTeacherPassed())
            dispatch(fetchTeacherRecords())
        }).catch((error) => {
            if (error.message === 'Network Error') {
                dispatch(studentsActions.connectionError())
            } else {

                if (error.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(redirect())
                }
                dispatch(fetchListFailure(error.response.data.message))
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

        const config = {
            url: `${location}/teacher/lend/${getUserId()}/${teacherId}`,
            method: 'post',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(studentsActions.connectionIsBack())
            dispatch(fetchBorrowers())
            dispatch(addTeacherPassed())
            dispatch(fetchTeacherRecords())
            dispatch(bookActions.fetchList())
        }).catch((error) => {
            if (error.message === 'Network Error') {
                dispatch(studentsActions.connectionError())
            } else {

                if (error.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(redirect())
                }
                dispatch(fetchListFailure(error.response.data.message))
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

        const config = {
            url: `${location}/teacher/record/${getUserId()}/${teacherId}`,
            method: 'post',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(studentsActions.connectionIsBack())
            dispatch(fetchBorrowers())
            dispatch(fetchTeacherRecords())
            dispatch(bookActions.fetchList())
        }).catch((error) => {
            if (error.message === 'Network Error') {
                dispatch(studentsActions.connectionError())
            } else {

                if (error.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(redirect())
                }
                dispatch(fetchListFailure(error.response.data.message))
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
                dispatch(studentsActions.connectionIsBack())
                dispatch(fetchRecordsPassTeacher(list))
            })
            .catch((error) => {

                if (error.message === 'Network Error') {
                    dispatch(studentsActions.connectionError())
                } else {

                    if (error.response.data.message === 'Ivalid user credentials!!') {
                        dispatch(redirect())
                    }
                    dispatch(fetchListFailure(error.response.data.message))
                }
            })
    }
}

export const deleteTeacherBorrowers = () => {
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
            url: `${location}/teacherSettings/deleteAllBorrowers/${getUserId()}`,
            method: 'delete',
            headers: authHeader,

        }
        console.log(config)
        axios(config).then(() => {
            dispatch(studentsActions.connectionIsBack())
            dispatch(fetchBorrowers())
            dispatch(bookActions.fetchList())
            dispatch(fetchTeacherRecords())
        }).catch((error) => {
            if (error.message === 'Network Error') {
                dispatch(studentsActions.connectionError())
            } else {

                if (error.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(redirect())
                }
                dispatch(fetchListFailure(error.response.data.message))
            }

        })
    }
}

export const deleteTeacherRecords = () => {
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
            url: `${location}/teacherSettings/deleteAllRecords/${getUserId()}`,
            method: 'delete',
            headers: authHeader,

        }
        console.log(config)
        axios(config).then(() => {
            dispatch(studentsActions.connectionIsBack())
            dispatch(fetchTeacherRecords())

        }).catch((error) => {
            if (error.message === 'Network Error') {
                dispatch(studentsActions.connectionError())
            } else {

                if (error.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(redirect())
                }
                dispatch(fetchListFailure(error.response.data.message))
            }
        })
    }
}

export const deleteTeacherList = () => {
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
            url: `${location}/teacherSettings/deleteAllTeachers/${getUserId()}`,
            method: 'delete',
            headers: authHeader,

        }

        axios(config).then(() => {
            dispatch(studentsActions.connectionIsBack())
            dispatch(fetchList())
            dispatch(fetchBorrowers())
            dispatch(fetchTeacherRecords())
            dispatch(bookActions.fetchList())
        }).catch((error) => {
            if (error.message === 'Network Error') {
                dispatch(studentsActions.connectionError())
            } else {

                if (error.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(redirect())
                }
                dispatch(fetchListFailure(error.response.data.message))
            }
        })
    }
}