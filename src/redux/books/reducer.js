import * as actionTypes from './actionTypes'
const initialState = {
  loadingList: false,
  loadingBorrowed: false,
  list: {},
  borrowed: {},
  errors: '',
}
const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIST_REQUEST:
      return {
        ...state,
        loadingList: true,
      }

    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        loadingList: false,
        errors: action.payload,
      }

    case actionTypes.FETCH_LIST_PASS:
      return {
        ...state,
        loadingList: false,
        list: action.payload,
      }

    case actionTypes.FETCH_BORROWED_REQUEST:
      return {
        ...state,
        loadingBorrowed: true,
      }

    case actionTypes.FETCH_BORROWED_PASS:
      return {
        ...state,
        borrowed: action.payload,
        loadingBorrowed: false,
      }
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        errors: '',
      }

    default:
      return state
  }
}
export default teacherReducer
