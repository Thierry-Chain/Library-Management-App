/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from '../loading'
import {Alert,Modal, ModalHeader, ModalBody, ModalFooter,Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import Select from 'react-select'
import Classes,{optionGender} from './classes'
import * as studentActions from '../../../redux/students/actions'

class StudentList extends Component {
    state = { search:'',modal:false,modalDelete:false,selectedOption:null,gender:'',age:'',firstName:'',lastName:'',trash:'' }
    
    componentDidUpdate(prevProps) {
      if (prevProps.students.length < this.props.students.length) {
        this.toggle()
        this.setState({gender:null,age:'',firstName:'',lastName:'',selectedOption:null,})
      }
    }
  
  putInTrash=(studentId)=>{
    this.setState({trash:studentId})
  }
    
    toggle=()=>{
this.setState({modal:!this.state.modal})
this.props.addPassed()
    }
    toggleDelete=()=>{
      this.setState({modalDelete:!this.state.modalDelete})
      this.props.addPassed()
          }

    handleAllChanges=(e)=>{
      let {name,value}=e.target
this.setState({[name]:value})
    } 

    handleChangeNew=(selectedOption)=>{
      this.setState({ selectedOption:selectedOption.value })
    }
    handleChangeGender=(selectedOption)=>{
      this.setState({ gender:selectedOption.value })
    }
    handleChange=(e)=>{
    this.setState({search:e.target.value})
    }
   handleSubmit=(e)=>{
e.preventDefault()
const data={firstName:this.state.firstName,lastName:this.state.lastName,Class:this.state.selectedOption,gender:this.state.gender,age:this.state.age}
this.props.addNewStudent(data)
   }

  handleDelete=(e)=>{
e.preventDefault()
const studentId=this.state.trash
this.props.deleteStudent(studentId)
this.toggleDelete()
  }

    render() { 


const errorMessage=this.props.error ? <Alert color="danger">{this.props.error}</Alert>:null  
  const list=this.props.students
  let filteredData
  list.length ? (  filteredData = list.filter(student => {
    return (
      student.firstName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      student.lastName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1||
      student.Class.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    )
  })) :(filteredData=[])
  const ClassName="btn btn-outline-info w-100 py-0 disabled"
 let table= filteredData.length ?  <table className="table table-bordered table-responsive w-100" id="myTable">
 <thead className="w-100">
   <tr className="w-100">
     <th scope="col" className="w">Firstname</th>
     <th scope="col" className="w">Lastname</th>
     <th scope="col" className="w-1">Class</th>
     <th scope="col" className="">Gender</th>
     <th scope="col" className="">Year</th>
     <th scope="col" className="w-2">Action</th>
     <th scope="col" className="w-2">Action</th>
     <th scope="col" className="w-2">Action</th>
     <th scope="col" className="">Remain</th>
 
 
   </tr>
 </thead>
 <tbody>
 {filteredData.map((student)=>{
     return(
       
       <tr key={student._id}>
       <td className="p-1">{student.firstName}</td>
       <td className="p-1">{student.lastName}</td>
     <td className="p-1">{student.Class}</td>
       <td className="p-1">{student.gender}</td>
       <td className="p-1">{student.age}</td>

  { student.lend===0 ?  <td className="py-1 disabled"><Link to={`/loggedIn/lend/${student._id}`} className={ClassName}>Lend</Link></td> : <td className="py-1"><Link to={`/loggedIn/lend/${student._id}/${student.lend}`} className="btn btn-outline-info w-100 py-0">Lend</Link></td>}

       <td className="py-1"><Link to={`/loggedIn/edit/${student._id}`} className="btn btn-outline-info w-100 py-0">Edit</Link></td>
       <td onClick={()=>{
         this.putInTrash(student._id)
         this.toggleDelete()
       }} className="py-1"><button className="btn btn-outline-danger w-100 py-0">Delete</button></td>
     <td className="p-1"><b>{student.lend}</b></td>
     </tr>
     )
 })}
   
 </tbody>
 </table>:<div className="w-100 text-center"><Alert className="text-center text-big text-dark" color="danger"> No student found !!</Alert></div>
    

  let allTable=this.props.loading ? <Loading/>:   <div className="row">

 {table}
  </div>   
     
        return ( <section className="mt-5 mt-body bg-pc">
            <div className="bg-secodary pt-2 head">
           <div className="d-flex bg-head justify-content-center">
<p className="text-center text-dark h2">Student List                        <span onClick={this.toggle} title="Add New Student" className="ml-1 badge badge-warning dropdown-pointer add"> Add +</span></p>
           </div>
           <p className="w-50 mx-auto p-line bg-line"></p>
           </div>
           <div className="container-fluid">
   <div className="row">
   <div className="col-11 col-sm-5 py-2 m-auto">

<label className="sr-only" htmlFor="inlineFormInputGroup">Search ...</label>
<div className="input-group mb-2">
  <input type="text" value={this.state.search} className="form-control bg-light" onChange={this.handleChange } id="inlineFormInputGroup" placeholder="Search ..."/>
  <div className="input-group-prepend">
    <div className="input-group-text">@</div>
  </div>

</div>   
  </div>    
       </div>         
    <div className="container">
     {allTable}
        </div>
       
        </div>
        <Modal name="addNewStudent" isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Add new student</ModalHeader>
        <form onSubmit={this.handleSubmit}>
        <ModalBody>
  {errorMessage}        
        <div className="row">
    <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="firstName" value={this.state.firstName} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="First name"/>
    </div>
    <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="lastName" value={this.state.lastName} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="Last name"/>
    </div>
   
      <Select id="inputState" options={Classes}   onChange={this.handleChangeNew} className="form-control col-11 mx-auto col-sm-6 my-2 border-0" placeholder="Select class">
      </Select>

      <Select options={optionGender}  onChange={this.handleChangeGender} className="form-control col-11 mx-auto col-sm-6 my-2 border-0" placeholder="Select gender">
      </Select>

  <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="age" type="number" value={this.state.age} onChange={this.handleAllChanges} max="9999" min="1900" className="form-control" placeholder="Birth Year"/>
    </div>     
    
  </div>
        </ModalBody>
        <ModalFooter>
          <button type="submit" className="btn btn-md btn-success"><b>Save</b></button>
          <Button color="danger" onClick={this.toggle}><b>Cancel</b></Button>
        </ModalFooter>
        </form>
      </Modal>
    
      <Modal name="deleteAstudentModal" isOpen={this.state.modalDelete} toggle={this.toggleDelete}>
        <ModalHeader toggle={this.toggleDelete}>Are You Sure To Delete ?</ModalHeader>
        <form onSubmit={this.handleDelete}>
       <div className="text-center">
    <Alert color="danger" >
      <p className="text-b">This can be danger when you delete student who did n't return the book can couse looses</p>
    </Alert>
       </div>
        <div className="d-flex my-5 mx-3 text-big">
<button type="submit" className="btn btn-md pull-left btn-success mr-2 w-75">Delete</button>
<button type="button" onClick={this.toggleDelete} className="btn btn-md pull-right btn-danger ml-2 w-75">Abort</button>
        </div>
        
        </form>
      </Modal>

        </section> );
    }
}
const mapStateToProps=(state)=>{
  return{
    auth:state.user.auth,
students:state.students.list,
loading:state.students.loadingList,
error:state.students.errors
  }
}
const mapDispatchToProps= (dispatch)=>{
return{
addNewStudent: student=> dispatch(studentActions.addNewStudent(student)) ,
deleteStudent : studentId =>dispatch(studentActions.deleteTheStudent(studentId)),
addPassed: ()=>dispatch(studentActions.addStudentPassed())
}
}
 
export default connect(mapStateToProps,mapDispatchToProps)(StudentList);