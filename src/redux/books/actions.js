/* eslint-disable no-unused-vars */
import axios from 'axios'
import * as actionTypes from './actionTypes'
import {
    location,
    headers
} from '../../locations'
import {
    getUserId
} from '../users/saveUser'
import store from '../store'
import * as studentActions from '../students/actions'
import * as teacherActions from '../teachers/actions'
import * as userActions from '../users/action'

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

const fetchListFailure = (error) => {
    return {
        type: actionTypes.FETCH_ERROR,
        payload: error
    }
}

// borrowed books list data
const fetchBorrowedRequest = () => {
    return {
        type: actionTypes.FETCH_BORROWED_REQUEST
    }
}

const fetchBorrowedSuccess = (borrowed) => {
    return {
        type: actionTypes.FETCH_BORROWED_PASS,
        payload: borrowed
    }
}
export const clearErros = () => {
    return {
        type: actionTypes.CLEAR_ERRORS
    }
}

export const fetchList = () => {
    return (dispatch) => {
        dispatch(fetchListRequest())
        const config = {
            url: `${location}/book/${getUserId()}`,
            method: 'get',
            header: headers
        }
        axios(config).then((resp) => resp.data)
            .then((list) => {
                dispatch(fetchListSuccess(list))
            })
            .catch((resp) => {
                dispatch(fetchListFailure(resp.response.data.message))
                if (resp.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(userActions.redirect())
                }

            })
    }
}

export const fetchBorrowed = () => {
    return (dispatch) => {
        dispatch(fetchBorrowedRequest())
        const config = {
            url: `${location}/student/borrowedBook/${getUserId()}`,
            method: 'get',
            header: headers
        }
        axios(config).then((resp) => resp.data)
            .then((books) => {
                dispatch(fetchBorrowedSuccess(books))
            })
            .catch((resp) => {
                dispatch(fetchListFailure(resp.response.data.message))
                if (resp.response.data.message === 'Ivalid user credentials!!') {
                    dispatch(userActions.redirect())
                }

            })
    }
}

export const addNewBookToDb = (book) => {
    return (dispatch) => {
        const data = book
        let allData = store.getState()
        const {
            token
        } = allData.user.more
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }

        const config = {
            url: `${location}/book/${getUserId()}`,
            method: 'post',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(fetchList())
        }).catch((error) => {

            if (error.response.data.message === 'Ivalid user credentials!!') {
                dispatch(userActions.redirect())
            }

            dispatch(fetchListFailure(error.response.data.message))
        })
    }
}
export const editBookData = (bookData, bookId) => {
    return (dispatch) => {
        const data = bookData
        let allData = store.getState()
        const {
            token
        } = allData.user.more
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }

        const config = {
            url: `${location}/book/${getUserId()}/${bookId}`,
            method: 'patch',
            headers: authHeader,
            data
        }
        axios(config).then(() => {
            dispatch(fetchList())
            dispatch(studentActions.fetchList())
            dispatch(teacherActions.fetchList())
            dispatch(studentActions.fetchBorrowers())
            dispatch(teacherActions.fetchBorrowers())
            dispatch(studentActions.fetchRecords())
            dispatch(teacherActions.fetchTeacherRecords())
        }).catch((error) => {
            if (error.response.data.message === 'Ivalid user credentials!!') {
                dispatch(userActions.redirect())
            }

            dispatch(fetchListFailure(error.response.data.message))
        })
    }
}

export const deleteBook = (bookId) => {
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
            url: `${location}/book/${getUserId()}/${bookId}`,
            method: 'delete',
            headers: authHeader
        }
        axios(config).then((resp) => {
            dispatch(fetchList())
            dispatch(studentActions.fetchList())
            dispatch(teacherActions.fetchList())
            dispatch(studentActions.fetchBorrowers())
            dispatch(teacherActions.fetchBorrowers())
            dispatch(studentActions.fetchRecords())
            dispatch(teacherActions.fetchTeacherRecords())
        }).catch((error) => {
            if (error.response.data.message === 'Ivalid user credentials!!') {
                dispatch(userActions.redirect())
            }

            dispatch(fetchListFailure(error.response.data.message))
        })
    }
}

export const deleteAllBooks = () => {
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
            url: `${location}/bookSettings/deleteAllBooks/${getUserId()}`,
            method: 'delete',
            headers: authHeader,

        }
        console.log(config)
        axios(config).then((resp) => {
            // fetch-all datas on teachers and students
            dispatch(fetchList())
            console.log('deleteAllBooks', resp)
        }).catch((error) => {
            console.log('deleteAllBooks', error.response.data)
            dispatch(fetchListFailure(error.response.data.message))

        })
    }
}

export const deleteFinalistsData = () => {
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
            url: `${location}/studentSettings/deleteAllFinalists/${getUserId()}`,
            method: 'get',
            headers: authHeader,

        }
        console.log(config)
        axios(config).then((resp) => {
            // dispatch(fetchfinalists)

            console.log('deleteFinalistDatas', resp)
        }).catch((error) => {
            console.log('deleteFinalistDatas', error.response.data)
            dispatch(fetchListFailure(error.response.data.message))

        })
    }
}