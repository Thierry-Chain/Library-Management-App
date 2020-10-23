import * as actionTypes from './actionTypes'
const initialState={
   loadingList:false,
   loadingBorrowers:false,
    list:{},
    borrowers:{},
    errors:'' 
}
const teacherReducer=(state=initialState,action)=>{
switch (action.type) {
   case actionTypes.FETCH_LIST_REQUEST:
       return { ...state,loadingList:true }

    case actionTypes.FETCH_ERROR:
    return { ...state,loadingList:false,errors:action.payload }  
    
    case actionTypes.FETCH_LIST_PASS: 
       return { ...state,loadingList:false,list:action.payload,errors:'' }

    case actionTypes.FETCH_BORROWERS_REQUEST:
        return { ...state,loadingBorrowers:true }     

    case actionTypes.FETCH_BORROWERS_PASS:
    return { ...state,loadingBorrowers:false,borrowers:action.payload,errors:'' }
    case actionTypes.ADD_TEACHER_PASSED:
      return { ...state,errors:'' } 
   case actionTypes.ADD_TEACHER_FAIL:
      return { ...state,errors:action.payload } 
    default:
       return state
}
}
export default teacherReducer