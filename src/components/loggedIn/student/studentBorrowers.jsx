/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {connect} from 'react-redux';
import uuid from 'uuid/v1'
import Loading from '../loading'
import {Alert} from 'reactstrap'
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import * as studentActions from '../../../redux/students/actions'


class StudentBorrowers extends Component {
    state = { word:'',studentIdToReturn:'',bookTypeToReturn:'',bookIdToReturn:'',bookNameToReturn:'',studentNameToReturn:'',modal:false}
toggle=()=>{
this.setState({modal:!this.state.modal})
}
handleReturn=()=>{
  let {studentIdToReturn,bookTypeToReturn:bookType,bookIdToReturn:bookId,bookNameToReturn:bookName}=this.state
 const data={
  bookType,bookId,bookName,
 }
 this.props.returnBook(data,studentIdToReturn)
this.toggle()
}
 handleChange=(e)=>{
this.setState({word:e.target.value})
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
          borrower.lastName.toLowerCase().indexOf(this.state.word.toLowerCase()) !== -1||
          borrower.Class.toLowerCase().indexOf(this.state.word.toLowerCase()) !== -1
        )
      }))
     :(filteredData=[]);
 let table=filteredData.length ?  <table className="table table-bordered table-responsive w-100" id="borrowers">
 <thead className="w-100">
   <tr className="w-100">
     <th scope="col" className="w-2">Firstname</th>
     <th scope="col" className="w-2">Lastname</th>
     <th scope="col" className="">Class</th>
     <th scope="col" className="">G</th>
     <th scope="col" className="w-3">Book-name</th>
     <th scope="col" className="">Book-id</th>
     <th scope="col" className="w-2">Book Type</th>
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
     <td className="p-1">{borrower.Class}</td>
       <td className="p-1">{borrower.gender}</td>
     <td className="p-1">{borrower.bookName}</td>
     <td className="p-1">{borrower.bookId}</td>
     <td className="p-1">{borrower.bookType}</td>
     <td className="p-1">{borrower.dateBorrowed}</td>


       <td className="p-1 d-print-none" onClick={()=>{
this.toggle()
this.setState({
  studentIdToReturn:borrower.studentId,
  bookTypeToReturn:borrower.bookType,
  bookIdToReturn:borrower.bookId,
  bookNameToReturn:borrower.bookName,
  studentNameToReturn:borrower.firstName + '  '+borrower.lastName
})
       }}><button className="btn btn-outline-info w-100 py-0">Return</button></td>
     
     </tr>
     )
 })}
   
 </tbody>
</table>   :<div className="w-100 text-center"><Alert className="text-center text-big text-dark" color="danger"> No borrower found !!</Alert></div>
  
  let allTable=this.props.loading ? <Loading/>:<div className="row">{table}</div>   
        return ( <section className="mt-body bg-pc">
          <div className="bg-secondary pt-2 head">
           <div className="d-flex bg-head justify-content-center">
<p className="text-center text-dark h2">Student Borrowers List</p>
           </div>
           <p className="w-50 mx-auto p-line bg-line"></p>
           </div>
           <div className="container-fluid">
   <div className="row d-print-none">
   <div className="col-11 col-sm-5 py-2 m-auto">

<label className="sr-only" htmlFor="inlineFormInputGroupB">Search ...</label>
<div className="input-group mb-2">
<input  type="text" value={this.state.word} onChange={this.handleChange} className="form-control bg-light" id="inlineFormInputGroupB" placeholder="Search ..."/>
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
        <ModalHeader className="text-info" toggle={this.toggle}>Are You Sure to Return this Book ?</ModalHeader>
        <ModalBody>
<p className="text-center text-big"><b>Book Name : </b><span className="text-lead text-monospace">{this.state.bookNameToReturn}</span></p>
<p className="text-center text-big"><b>Book Id : </b><span className="text-lead text-monospace">{this.state.bookIdToReturn}</span></p>
<p className="text-center text-big"><b>Book type : </b><span className="text-lead text-monospace">{this.state.bookTypeToReturn}</span></p>

<p className="text-center text-big"><b>From : </b><span className="text-lead text-monospace">{this.state.studentNameToReturn}</span></p>
        </ModalBody>
<div className="d-flex p-3">
  <button onClick={this.handleReturn} className="btn btn-md btn-info m-auto text-big">Return</button>
  </div>       
      </Modal>
        </section> );
    }
}
 const mapStateToProps=(state)=>{
     return {
borrowers:state.students.borrowers,
loading:state.students.loadingBorrowers
     }
 }
 const mapDispatchToProps=(dispatch)=>{
   return {
     returnBook:(data,studentId)=>dispatch(studentActions.returnBook(data,studentId))
   }
 }
export default connect(mapStateToProps,mapDispatchToProps)(StudentBorrowers);