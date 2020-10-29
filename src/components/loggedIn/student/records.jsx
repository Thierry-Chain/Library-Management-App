import React,{useState} from 'react'
import {useSelector} from 'react-redux' 
import Loading from '../loading'
import uuid from 'uuid/v1'
import moment from 'moment'
import ConnectionFails from '../connectionError'
import { BiSearchAlt } from "react-icons/bi";

function Records(props) {
    const [search, setsearch] = useState('')
    const list = useSelector(state => state.students.records)
    const connectionError = useSelector(state => state.students.connectionError)
   const filteredData=list.filter(student=>{
    return (
        student.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        student.lastName.toLowerCase().indexOf(search.toLowerCase()) !== -1||
        student.Class.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
   })
      
    const loadingRecords = useSelector(state => state.students.loadingRecords)
   
    const allData=loadingRecords ? <Loading/>:
    <div>
        <div className="bg-secodary pt-2 head">
           <div className="d-flex bg-head justify-content-center">
<p className="text-center text-dark h2">Students Library records </p>
           </div>
           <p className="w-50 mx-auto p-line bg-line"></p>
           </div>
           <div className="container-fluid">
   <div className="row">
   <div className="col-11 col-sm-5 py-2 m-auto">

<label className="sr-only" htmlFor="inlineFormInputGroup">Search ...</label>
<div className="input-group mb-2">
  <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)} className="form-control bg-light" id="inlineFormInputGroup" placeholder="Search ..."/>
  <div className="input-group-prepend">
    <div className="input-group-text"><i><BiSearchAlt/></i></div>
  </div>

</div>   
  </div>    
       </div>  </div>
       <div className="container">
    
    <table className="table table-bordered table-responsive w-100" id="myTable">
        <caption className="caption text-center">Powered by smart library</caption>
 <thead className="w-100">
   <tr className="w-100">
     <th scope="col" className="w">Firstname</th>
     <th scope="col" className="w">Lastname</th>
     <th scope="col" className="text-nowrap">Class</th>
     <th scope="col" className="">Gender</th>
     <th scope="col" className="w text-nowrap">Book name</th>
     <th scope="col" className="w-2 text-nowrap">Book id</th>
     <th scope="col" className="w text-nowrap">Book type</th>
     <th scope="col" className="">Date</th>

   </tr>
 </thead>
 <tbody>
 {filteredData.map((student)=>{
     return(
       
       <tr key={uuid()}>
       <td className="p-1">{student.firstName}</td>
       <td className="p-1">{student.lastName}</td>
     <td className="p-1 text-nowrap">{student.Class}</td>
       <td className="p-1">{student.gender}</td>
       <td className="p-1">{student.bookName}</td>
       <td className="p-1">{student.bookId}</td>
       <td className="p-1">{student.bookType}</td>
       <td className="p-1">{moment(student.dateReturned).format("L")}</td>
       
     </tr>
     )
 })}
   
 </tbody>
 </table>

    
        </div>
    </div>
    return (
        <div className="mt-body">
          {connectionError ? <ConnectionFails/>:<React.Fragment>
            {allData}
            </React.Fragment>}
           
        </div>
    )
}

export default Records
