import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {Jumbotron} from 'reactstrap'
import Footer from './footer'

class Main extends Component {
  componentDidMount() {
  if (this.props.auth===false) {
    this.props.history.push('/')
  }  }
  
  state = {  }
  render() { 
    const allStudents=100
    const allTeachers=100
    const allBooks=100
    const allBorrowedBooks=100
    return ( <section className="mt-5 bg-light mt-body">
<div className="text-center ">
<Jumbotron className="mb-0">
        
          <h1 className="display-4 text-info">Smart library vip</h1>
          <p className="py-1 bg-info mx-auto w-50"></p>
          <p className="lead py-3">This is internal part of this smart library where you can perfom its main functions in order to manage your physical library.</p>
       
      </Jumbotron>
 
</div>
   
   <div className="container-fluid bg-color my-0">
     <div className="div container">

     <p className="h2 text-center mb-0"> ^ My Status</p> <br/>
     <table className="table table-hover mt-0">
  <thead className="bg-table">
    <tr>
      <th scope="col">State</th>
      <th scope="col">Quantity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Students</td>
      <td>{allStudents}</td>
    </tr>
    <tr>
      <td>Teachers</td>
      <td>{allTeachers}</td>
    </tr>
    <tr>
      <td>Books</td>
      <td>{allBooks}</td>
    </tr>

    <tr>
      <td>Borrowed Books</td>
      <td>{allBorrowedBooks}</td>
    </tr>

  </tbody>
</table>
<p className="h2 text-center mb-0"> ^ Start using library</p> <br/>  
<div className="row py-4">

<div className="col-12 col-sm-11 box mx-auto py-3 mb-4">
<p className="h3 text-sucess text-center">The first requirement ?</p>
In order to start using this smart library you must firstly enter the books you have and their number if you can't count them just imagine the number of books that is bigger than the actual books you have in your physical library
  </div>

  <div className="col-12 col-sm-11 box mx-auto py-3 mb-4">
<p className="h3 text-sucess text-center">How to lend a book ?</p>
Firstly click to the student or teacher menu in the navigation bar and select student or teacher and then search student or teacher you want and click to <span className="text-info">Lend</span> button and type the books informations .
  </div> <br/>
  <div className="col-12 col-sm-11 box mx-auto py-3 mb-4">
<p className="h3 text-sucess text-center">How to lend a return a book  ?</p>
Firstly click to the student or teacher menu in the navigation bar and select borrowers and then search student or teacher you want and click to <span className="text-info">Return </span> button select the book returned . 
  </div><br/>

  <div className="col-12 col-sm-11 box mx-auto py-3 mb-4">
<p className="h3 text-sucess text-center">How to change user information  ?</p>
Click to the settings menu in the navigation bar and type in your email and password then continue to explore user settings
  </div><br/>

</div>

     </div>
   

   </div>
  <Footer/>
    </section> );
  }
}
const mapStateToProps=(state)=>{
  return{
error:state.user.error,
auth:state.user.auth
  }
} 
const mapDispatchToProps=(dispatch)=>{
  return{
fullLogin:(user)=>dispatch()    
  }
} 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Main));