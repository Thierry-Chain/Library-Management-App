/* eslint-disable no-unused-vars */
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import studentReducer from './students/reducer'
import teacherReducer from './teachers/reducer'
import userReducer from './users/reducer'
import bookReducer from './books/reducer'


const student=studentReducer
    const rootReducer=combineReducers({
        user:userReducer,
        students:student,
        teachers:teacherReducer,
        books:bookReducer
    })
const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)) )

export default store
