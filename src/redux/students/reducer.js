import * as actionTypes from './actionTypes'
const initialState={
   loadingList:false,
   loadingBorrowers:false,
   loadingRecords:false,
    list:{},
    borrowers:{},
    errors:'',
    records:[]
}
const studentReducer=(state=initialState,action)=>{
switch (action.type) {
   case actionTypes.FETCH_LIST_REQUEST:
       return { ...state,loadingList:true }

    case actionTypes.FETCH_ERROR:
    return { ...state,loadingList:false,errors:action.payload }  
    
    case actionTypes.FETCH_LIST_PASS:
       return { ...state,loadingList:false,list:action.payload }

    case actionTypes.FETCH_BORROWERS_REQUEST:
        return { ...state,loadingBorrowers:true }     
 
    case actionTypes.FETCH_BORROWERS_PASS:
    return { ...state,loadingBorrowers:false,borrowers:action.payload }

   case actionTypes.ADD_STUDENT_FAIL:
      return { ...state,errors:action.payload }

   case actionTypes.ADD_STUDENT_PASSED:
      return { ...state,errors:'' }
   case actionTypes.FETCH_RECORDS_REQUEST:
         return { ...state,loadingRecords:true } 
         
   case actionTypes.FETCH_RECORDS_PASS:
         return { ...state,loadingRecords:false,records:action.payload }       
    

    default:
       return state
}
}
export default studentReducer