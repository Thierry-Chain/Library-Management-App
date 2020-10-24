import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import Loading from '../loading'
import uuid from 'uuid/v1'
import moment from 'moment'

function RecordsTeacher() {
    const [search, setsearch] = useState('')
    const list = useSelector(state => state.teachers.records)
   const filteredData=list.filter(teacher=>{
    return (
        teacher.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        teacher.lastName.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
   })
      
    const loadingRecords = useSelector(state => state.teachers.loadingRecords)
   
    const allData=loadingRecords ? <Loading/>:
    <div>
        <div className="bg-secodary pt-2 head">
           <div className="d-flex bg-head justify-content-center">
<p className="text-center text-dark h2">Teachers records </p>
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
    <div className="input-group-text">@</div>
  </div>

</div>   
  </div>    
       </div>  </div>
       <div className="container">
    {/*/////////////////////////*/}
    <table className="table table-bordered table-responsive w-100" id="myTable">
        <caption className="caption text-center">Powered by smart library</caption>
 <thead className="w-100">
   <tr className="w-100">
     <th scope="col" className="w-16">Firstname</th>
     <th scope="col" className="w-16">Lastname</th>
     <th scope="col" className="">Gender</th>
     <th scope="col" className="">Phone</th>
     <th scope="col" className="w-16">Book-name</th>
     <th scope="col" className="w-16">Book-type</th>
     <th scope="col" className="">Number</th>
     <th scope="col" className="">Date</th>


   </tr>
 </thead>
 <tbody>
 {filteredData.map((teacher)=>{
     return(
       
       <tr key={uuid()}>
       <td className="p-1">{teacher.firstName}</td>
       <td className="p-1">{teacher.lastName}</td>
       <td className="p-1">{teacher.gender}</td>
       <td className="p-1">{teacher.phone}</td>
       <td className="p-1">{teacher.bookName}</td>
       <td className="p-1">{teacher.bookType}</td>
       <td className="p-1">{teacher.numOfBooks}</td>

       <td className="p-1">{moment(teacher.dateReturned).format("L")}</td>
       
     </tr>
     )
 })}
   
 </tbody>
 </table>
 {/*************************** */}
    
        </div>
    </div>
    return (
        <div className="mt-body">
           {allData}
        </div>
    )
}

export default RecordsTeacher
