/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {connect} from 'react-redux'

import Select from 'react-select'/*
import Classes,{optionGender} from './classes'
import Loading from '../loading'
import {Alert} from 'reactstrap'
import * as studentActions from '../../../redux/students/actions'  */


class Lend extends Component {
  state={}
handleSubmitOneBook=(e)=>{
  e.preventDefault()
  console.log('one ')
}

handleSubmitTwoBooks= (e)=>{
    e.preventDefault()
  console.log('two')
}
    render() {
const studentId=this.props.match.params.studentId
const bookRemaining=Number(this.props.match.params.lend )
const allData= bookRemaining === 2 ?
<section>
<form onSubmit={this.handleSubmitTwoBooks}>  
<div className="d-flex h3 text-center py-2"><p className="m-auto text-info font-f">Lending books to the student</p></div> 

<div className="m-auto d-flex text-center py-2"><p className="m-auto text-info font-f"><button className="mx-auto btn btn-info btn-md w-100 px-5" type="submit">Lend</button></p></div> 

  <div className="border shadow-lg shadow-danger height-100">   
 <div className="row height-100">

  <div className="col-11 col-sm-10 col-lg-5 m-auto shadow-lg p-3 my-5 bg-light rounded">
        <p className="text-big text-center"><b> Book 1 </b></p>
 <div className="row">
<div className="col-11 mx-auto col-sm-6 my-2">
<input name="fname" onChange={this.handleAllChanges} type="text" className="form-control" placeholder="Book Name"/>
</div>

<div className="col-11 mx-auto col-sm-6 my-2">
<input  name="lname" onMouseUp={this.handleAllChanges} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="Book Id"/>
</div>
<Select id="inputState"  options={null}   onChange={this.handleChangeNew} className="form-control col-11 mx-auto col-sm-6 my-2 border-0" placeholder="Select Book Type">

</Select>    

</div>


 </div> 

 <div className="col-11 col-sm-10 col-lg-5 m-auto shadow-lg p-3 my-5 bg-light rounded">
<p className="text-big text-center"><b>Book 2</b></p>
<div className="row">
<div className="col-11 mx-auto col-sm-6 my-2">
<input name="fname" onChange={this.handleAllChanges} type="text" className="form-control" placeholder="Book Name"/>
</div>

<div className="col-11 mx-auto col-sm-6 my-2">
<input  name="lname" onMouseUp={this.handleAllChanges} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="Book Id"/>
</div>
<Select id="inputState"  options={null}   onChange={this.handleChangeNew} className="form-control col-11 mx-auto col-sm-6 my-2 border-0" placeholder="Select Book Type">

</Select>    

</div>

 </div> 
 </div>
 
</div> 

</form> 
</section>

:
  <section>
    <form onSubmit={this.handleSubmitOneBook}>
 <div className="d-flex h3 text-center py-2"><p className="m-auto text-info font-f">Lending books to the student</p></div> 

<div className="m-auto d-flex text-center py-2"><p className="m-auto text-info font-f"><button className="mx-auto btn btn-info btn-md w-100 px-5 " type="submit">Lend</button></p></div> 
   
 <div className="border shadow-lg shadow-danger height-100">   
 <div className="row height-100">

  <div className="col-11 col-md-7 col-lg-6 m-auto shadow-lg p-3 my-5 bg-light rounded">
        <p className="text-big text-center"><b> Book 2 </b></p>
 <div className="row">
<div className="col-11 mx-auto col-sm-6 my-2">
<input name="fname" onChange={this.handleAllChanges} type="text" className="form-control" placeholder="Book Name"/>
</div>

<div className="col-11 mx-auto col-sm-6 my-2">
<input  name="lname" onMouseUp={this.handleAllChanges} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="Book Id"/>
</div>
<Select id="inputState"  options={null}   onChange={this.handleChangeNew} className="form-control col-11 mx-auto col-sm-6 my-2 border-0" placeholder="Select Book Type">

</Select>    

</div>


 </div> 

 
 </div>
 
</div>    </form>
  </section>


  
    return (
          
<section className="mt-body">
<div className="container-fluid" >
{allData}
 </div>   
                     
  
</section>           
        )
    }
}
const mapStateToProps=(state)=>{
    return {
studentList:state.students.list
    }
}
const mapDispatchToProps=(dispatch)=>{
  return {

  }
}

export default connect(mapStateToProps)(Lend)