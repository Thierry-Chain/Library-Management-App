import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loading from '../loading'
import Select from 'react-select'
import {Alert,Modal, ModalHeader, ModalBody,Button} from 'reactstrap'
import {optionGender} from '../student/classes'
import * as teacherActions from '../../../redux/teachers/actions'
import ConnectionFails from '../connectionError'
import { BiSearch, BiPlusCircle } from "react-icons/bi";


class TeachersList extends Component {
    state = { search:'',trash:'',editFirstName:'',editLastName:'',editGender:'',editPhone:'',modal:false,modalDelete:false,teacherId:'',numOfBooks:'',bookType:'',bookName:'',modalLend:false,modalAddNew:false,firstName:'',lastName:'',gender:'',phone:'',validationMessage:'' }
componentDidUpdate(prevProps) {
  if (prevProps.teachersList.length !==0 && prevProps.teachersList.length < this.props.teachersList.length ) {
    this.toggleAddNew()
    this.setState({firstName:'',lastName:'',gender:'',phone:''})
  }
  if (prevProps.borrowers.length !==0 && prevProps.borrowers.length < this.props.borrowers.length ) {
    this.toggleLend()
    //this.setState({firstName:'',lastName:'',gender:'',phone:''})
  }
 
}
    toggleDelete=()=>{
      this.setState({modalDelete:!this.state.modalDelete})
          }
      toggleLend=()=>{
        this.setState({modalLend:!this.state.modalLend})
           } 
     toggleAddNew=()=>{
     this.setState({modalAddNew:!this.state.modalAddNew})
      }                               

           handleChangeNew=(selectedOption)=>{
            this.setState({ editGender:selectedOption.value })
          }
          handleChangeGender=(selectedOption)=>{
            this.setState({ gender:selectedOption.value })
          }

handleDelete=(e)=>{
  e.preventDefault()
  this.props.deleteTeacher(this.state.trash)
  this.toggleDelete()
}

handleEdit=(e)=>{
  e.preventDefault()
  let {editFirstName:firstName,editLastName:lastName,editGender:gender,editPhone:phone,teacherId}=this.state
  const data={ firstName,lastName,gender,phone }
  this.props.editTeacher(data,teacherId)
 if (!this.props.error) {
  this.toggle()
 }
      }  
handleLend=(e)=>{
  e.preventDefault()
const {numOfBooks,bookType,bookName,teacherId}=this.state
if( isNaN(numOfBooks)){
  console.log('not a number')
  this.props.error='Book Number Must Be A Number'
}
const data={ numOfBooks,bookType:bookType.toLowerCase(),bookName }
this.props.lendBook(data,teacherId)

}
handleAddNew=(e)=>{
  e.preventDefault()
  let {firstName,lastName,gender,phone}=this.state
const data={ firstName,lastName,gender,phone }
this.props.addNewTeacher(data)
}

toggle=()=>{
  this.setState({modal:!this.state.modal})
    }
  handleAllChanges=(e)=>{
    let {name,value}=e.target
  this.setState({[name]:value})
      } 

  
    
    render() { 
    const errorMessage=this.props.error ? <Alert color="danger">{this.props.error}</Alert>:null
       let gender
       this.state.editGender ? (gender={value:this.state.editGender,label:this.state.editGender}):(gender=0)
        const list=this.props.teachersList
        let filteredData
        list.length ? (  filteredData = list.filter(teacher => {
          return (
            teacher.firstName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
            teacher.lastName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          )
        })) :(filteredData=[])
        
       let table= filteredData.length ?  <table className="table table-bordered table-responsive w-100" id="myTable">
       <thead className="w-100">
         <tr className="w-100">
           <th scope="col" className="w">Firstname</th>
           <th scope="col" className="w">Lastname</th>
           <th scope="col" className="w">Gender</th>
           <th scope="col" className="w">Phone</th>
           <th scope="col" className="w-2">Action</th>
           <th scope="col" className="w-2">Action</th>
           <th scope="col" className="w-2">Action</th>
         </tr>
       </thead>
       <tbody>
       {filteredData.map((teacher)=>{
           return(
             
             <tr key={teacher._id}>
             <td className="p-1">{teacher.firstName}</td>
             <td className="p-1">{teacher.lastName}</td>
           <td className="p-1">{teacher.gender}</td>
             <td className="p-1">{teacher.phone}</td>
             <td className="p-1" onClick={()=>{
               this.setState({
                 editFirstName:teacher.firstName,
                 editLastName:teacher.lastName,
                 editGender:teacher.gender,
                 editPhone:teacher.phone,
                 teacherId:teacher._id
                })
                this.toggle()
             }}><button className="btn-sm btn-info w-100">Edit</button></td>
             <td className="p-1" onClick={()=>{
               this.setState({teacherId:teacher._id})
               this.toggleLend()
             }}><button className="btn-sm btn-info w-100">Lend</button></td>
            
<td className="p-1" onClick={()=>{
               this.setState({trash:teacher._id})
               this.toggleDelete()
             }
             }><button className="btn-sm btn-danger w-100">Delete</button></td>

           </tr>
           )
       })}
         
       </tbody>
       </table>:<div className="w-100 text-center"><Alert className="text-center text-big text-dark" color="danger"> No teacher found !!</Alert></div>
          
      
        let allTable=this.props.loadingTeachers ? <Loading/>:   <div className="row">
       {table}
        </div>   
          
        
        return ( <section className="mt-5 mt-body bg-pc">
  {this.props.connectionError ? <ConnectionFails/>:<React.Fragment>
   
        <div className="bg-secodary pt-2 head-1">
       <div className="d-flex bg-head justify-content-center">
<p className="text-center text-dark h2">Teachers List                        <span onClick={this.toggleAddNew} title="Add New Teacher" className="ml-1 badge badge-bg dropdown-pointer add"> Add <i><BiPlusCircle/></i></span></p>
       </div>
       <p className="w-25 mx-auto p-line bg-line"></p>
       </div>
       <div className="container-fluid">
<div className="row">
<div className="col-11 col-sm-5 py-2 m-auto">

<label className="sr-only" htmlFor="inlineFormInputGroup">Search ...</label>
<div className="input-group mb-2">
<input type="text" name="search" value={this.state.search} className="form-control bg-light" onChange={this.handleAllChanges } id="inlineFormInputGroup" placeholder="Search ..."/>
<div className="input-group-prepend">
<div className="input-group-text"><i><BiSearch/></i></div>
</div>

</div>   
</div>    
   </div>         
<div className="container">
 {allTable}
    </div>
   
    </div>
   
    <Modal name="editNewTeacher" isOpen={this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Edit teacher data</ModalHeader>
        <form onSubmit={this.handleEdit}>
        <ModalBody>
         {errorMessage}
        <div className="row">
    <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="editFirstName" value={this.state.editFirstName} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="First name"/>
    </div>
    <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="editLastName" value={this.state.editLastName} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="Last name"/>
    </div>
   
      

  <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="editPhone" type="text" value={this.state.editPhone} onChange={this.handleAllChanges} className="form-control" placeholder="Type phone number"/>
    </div>     

    <Select options={optionGender} defaultValue={gender} onChange={this.handleChangeNew} className="form-control col-11 mx-auto col-sm-6 my-2 border-0" placeholder="Select gender">
         </Select>
  </div>
        </ModalBody>
        <div className="d-flex justify-content-center align-items-center py-2">
          <button type="submit" className="btn btn-md btn-success w-25 mr-2"><b>Save</b></button>
          <Button color="danger" className="w-25 ml-2" onClick={this.toggle}><b>Cancel</b></Button>
        </div>
        </form>
      </Modal> 
    
      <Modal name="deleteATeacherModal" isOpen={this.state.modalDelete} toggle={this.toggleDelete}>
        <ModalHeader toggle={this.toggleDelete}>Are You Sure To Delete ?</ModalHeader>
        <form onSubmit={this.handleDelete}>
       <div className="text-center">
    <Alert color="danger" >
      <p className="text-b">This can be danger when you delete teacher who did n't return the book can couse looses</p>
    </Alert>
       </div>
       <div className="d-flex justify-content-center align-items-center py-2">
    <button type="submit" className="btn btn-md btn-success w-25 mr-2"><b>Delete</b></button>
  <Button color="danger" className="w-25 ml-2" onClick={this.toggleDelete}><b>Cancel</b></Button>
        </div>
        
        </form>
      </Modal>

      <Modal name="Lend" isOpen={this.state.modalLend} toggle={this.toggleLend}>
        <ModalHeader toggle={this.toggleLend}>Lend books to teacher</ModalHeader>
        <form onSubmit={this.handleLend}>
        <ModalBody>
         {errorMessage}
         {this.state.validationMessage ? <Alert color="danger">{this.state.validationMessage}</Alert>:null}
        <div className="row">
    <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="numOfBooks" value={this.state.numOfBooks} onChange={this.handleAllChanges} type="number" className="form-control" placeholder="Number of books"/>
    </div>
    <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="bookType" value={this.state.bookType} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="Book type"/>
    </div>
   
      

  <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="bookName" type="text" value={this.state.bookName} onChange={this.handleAllChanges} className="form-control" placeholder="Book Name"/>
    </div>     

  </div>
        </ModalBody>
        <div className="d-flex justify-content-center align-items-center py-2">
          <button type="submit" className="btn btn-md btn-success w-25 mr-2"><b>Lend</b></button>
          <Button color="danger" className="w-25 ml-2" onClick={this.toggleLend}><b>Abort</b></Button>
        </div>
        </form>
      </Modal> 

      <Modal name="AddNewTeacher" isOpen={this.state.modalAddNew} toggle={this.toggleAddNew}>
        <ModalHeader toggle={this.toggleAddNew}>Add new teacher</ModalHeader>
        <form onSubmit={this.handleAddNew}>
        <ModalBody>
         {errorMessage}
        <div className="row">
    <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="firstName" value={this.state.firstName} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="First name"/>
    </div>
    <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="lastName" value={this.state.lastName} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="Last name"/>
    </div>
   
      

  <div className="col-11 mx-auto col-sm-6 my-2">
      <input name="phone" type="text" value={this.state.phone} onChange={this.handleAllChanges} className="form-control" placeholder="Phone"/>
    </div>     

    <Select options={optionGender}  onChange={this.handleChangeGender} className="form-control col-11 mx-auto col-sm-6 my-2 border-0" placeholder="Select gender">
         </Select>
  </div>

        </ModalBody>
        <div className="d-flex justify-content-center align-items-center py-2">
          <button type="submit" className="btn btn-md btn-success w-25 mr-2"><b>Lend</b></button>
          <Button color="danger" className="w-25 ml-2" onClick={this.toggleAddNew}><b>Abort</b></Button>
        </div>
        </form>
      </Modal> 

 </React.Fragment>}
    </section> );
}
} 

const mapStateToProps=(state)=>{
    return {
connectionError:state.students.connectionError, 
loadingTeachers:state.teachers.loadingList,   
teachersList:state.teachers.list,  
borrowers:state.teachers.borrowers,
error:state.teachers.errors  
    }
}
const mapDispatchToProps=(dispatch)=>{
  return {
addNewTeacher:data=>dispatch(teacherActions.addNewTeacher(data)),
deleteTeacher:teacherId=>dispatch(teacherActions.deleteTeacher(teacherId)),
editTeacher:(data,teacherId)=>dispatch(teacherActions.editTeacherData(data,teacherId)),
lendBook:(data,teacherdId)=>dispatch(teacherActions.lendbook(data,teacherdId))
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(TeachersList);