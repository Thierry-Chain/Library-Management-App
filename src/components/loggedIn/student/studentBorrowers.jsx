/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import uuid from 'uuid/v1'
import Loading from '../loading'
import {Alert} from 'reactstrap'


class StudentBorrowers extends Component {
    state = { word:''}

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
     <th scope="col" className="w">Firstname</th>
     <th scope="col" className="w">Lastname</th>
     <th scope="col" className="w">Class</th>
     <th scope="col" className="">Gender</th>
     <th scope="col" className="w">Book-name</th>
     <th scope="col" className="w">Book-id</th>
     <th scope="col" className="w d-print-none">More</th>
     
     <th scope="col" className="w d-print-none">Action</th>
    


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
       <td className="p-1 d-print-none"><button className="btn btn-outline-info w-75 py-0">Return</button></td>
      <td className="p-1 d-print-none"><NavLink to={`/detail/${borrower.studentId}`}>More +</NavLink></td> 
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
        </section> );
    }
}
 const mapStateToProps=(state)=>{
     return {
borrowers:state.students.borrowers,
loading:state.students.loadingBorrowers
     }
 }
export default connect(mapStateToProps)(StudentBorrowers);