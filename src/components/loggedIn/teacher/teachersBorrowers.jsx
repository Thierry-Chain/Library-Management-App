/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {connect} from 'react-redux';
import uuid from 'uuid/v1'
import Loading from '../loading'
import {Alert,UncontrolledAlert} from 'reactstrap'
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import * as teacherActions from '../../../redux/teachers/actions'
import moment from 'moment'
import ConnectionFails from '../connectionError'

class TeachersBorrowers extends Component {
    state = { word:'',teacherIdToReturn:'',bookTypeToReturn:'',bookNameToReturn:'',teacherNameToReturn:'',numOfBooks:'',modal:false }
toggle=()=>{
this.setState({modal:!this.state.modal}) 
}
handleReturn=()=>{
  let {teacherIdToReturn,bookTypeToReturn:bookType,bookNameToReturn:bookName,numOfBooks} = this.state
  if(numOfBooks === ''){
return false
  }
 const data={ bookType,bookName,numOfBooks }
 this.props.returnBook(data,teacherIdToReturn)
 this.setState({numOfBooks:''})
 
//this.toggle()
if (this.props.error==='') {
  this.toggle()
}
}
 handleChange=(e)=>{
  let {name,value}=e.target
this.setState({[name]:value})
 }
 printPage=()=>{
   window.print()
 }
    render() { 
      let filteredData
    const allborrowers=this.props.borrowers  
    allborrowers.length ? ( filteredData = allborrowers.filter(borrower => {
        return (
          borrower.firstName.toLowerCase().indexOf(this.state.word.toLowerCase()) !== -1 ||
          borrower.lastName.toLowerCase().indexOf(this.state.word.toLowerCase()) !== -1
        )
      }))
     :(filteredData=[]);
 let table=filteredData.length ?  <table className="table table-bordered table-responsive w-100" id="borrowers">
   <caption className="text-center">Generated by smart library</caption>
 <thead className="w-100">
   <tr className="w-100">
     <th scope="col" className="w-15">First-name</th>
     <th scope="col" className="w-15">Last-name</th>
     <th scope="col" className="">Phone</th>
     <th scope="col" className="">Gender</th>
     <th scope="col" className="w-15">Book-name</th>
     <th scope="col" className="w-15">Book-Type</th>
     <th scope="col" className="">Number</th>
     <th scope="col" className="">Date</th>
     <th scope="col" className="d-print-none">Action</th>
    


   </tr>
 </thead>
 <tbody>
 {filteredData.map((borrower)=>{
     return(
       <tr key={uuid()}>
       <td className="p-1">{borrower.firstName}</td>
       <td className="p-1">{borrower.lastName}</td>
     <td className="p-1">{borrower.phone}</td>
       <td className="p-1">{borrower.gender}</td>
     <td className="p-1">{borrower.bookName}</td>
     <td className="p-1">{borrower.bookType}</td>
     <td className="p-1">{borrower.numOfBooks}</td>
     <td className="p-1">{moment(borrower.dateBorrowed).format("L")}</td>


       <td className="p-1 d-print-none" onClick={()=>{
this.toggle()
this.setState({
  teacherIdToReturn:borrower.teacherId,
  bookTypeToReturn:borrower.bookType,
  bookNameToReturn:borrower.bookName,
  teacherNameToReturn:borrower.firstName + '  ' + borrower.lastName
})
       }}><button className="btn btn-outline-info w-100 py-0">Return</button></td>
     
     </tr>
     )
 })}
   
 </tbody>
</table>   :<div className="w-100 text-center"><Alert className="text-center text-big text-dark" color="danger"> No borrower found !!</Alert></div>
  
  let allTable=this.props.loading ? <Loading/>:<div className="row">
    <div className="d-flex">{this.props.error ==='' ? null: <UncontrolledAlert color="danger" className="text-center">
      {this.props.error}
    </UncontrolledAlert>}</div>
    {table}</div>   
        return ( <section className="mt-body bg-pc">
          {this.props.connectionError ? <ConnectionFails/>:<React.Fragment>

         
          <div className="bg-secondary pt-2 head">
           <div className="d-flex bg-head justify-content-center">
<p className="text-center text-dark h2">Teachers Borrowers List</p>
           </div>
           <p className="w-50 mx-auto p-line bg-line"></p>
           </div>
           <div className="container-fluid">
   <div className="row d-print-none">
   <div className="col-11 col-sm-5 py-2 m-auto">

<label className="sr-only" htmlFor="inlineFormInputGroupB">Search ...</label>
<div className="input-group mb-2">
<input name="word" type="text" value={this.state.word} onChange={this.handleChange} className="form-control bg-light" id="inlineFormInputGroupB" placeholder="Search ..."/>
  <div className="input-group-prepend">
    <div className="input-group-text">@</div>
  </div>

</div>   
  </div>    
       </div>    
       <div className="d-flex mb-2 mt-n1 d-print-none">
       <button onClick={this.printPage} className="text-monospace mx-auto btn btn-info p-1 btn-sm"> Print this page </button>  
       </div>
      
    <div className="container">
       {allTable}
        </div>
       
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader className="text-info" toggle={this.toggle}>Are You Sure to Return Books ?</ModalHeader>
        <ModalBody>
{this.props.error ? <Alert color="danger">{this.props.error}</Alert>:null}
<p className="text-center text-big"><b>Book Name : </b><span className="text-lead text-monospace">{this.state.bookNameToReturn}</span></p>

<p className="text-center text-big"><b>Book type : </b><span className="text-lead text-monospace">{this.state.bookTypeToReturn}</span></p>

<p className="text-center text-big"><b>From : </b><span className="text-lead text-monospace">{this.state.teacherNameToReturn}</span></p>
<div className="d-flex">
  <input name="numOfBooks" required type="text" value={this.state.numOfBooks} onChange={this.handleChange}  className="form-control mx-auto" placeholder="Type number of books"/>
</div>
        </ModalBody>
<div className="d-flex p-3">
  <button  onClick={this.handleReturn} className="btn btn-md btn-info m-auto text-big">Return</button>
  </div>       
      </Modal>
       
         </React.Fragment> }
        </section> );
    }
}
 const mapStateToProps=(state)=>{
     return {
connectionError:state.students.connectionError,       
borrowers:state.teachers.borrowers,
loading:state.teachers.loadingBorrowers,
error:state.teachers.errors
     }
 }
 const mapDispatchToProps=(dispatch)=>{
   return {
     returnBook:(data,teacherId)=>dispatch(teacherActions.returnBook(data,teacherId))
   }
 }
export default connect(mapStateToProps,mapDispatchToProps)(TeachersBorrowers);