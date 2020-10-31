/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter,Link } from 'react-router-dom'
import { redirect } from '../../redux/users/action'
import {UncontrolledAlert,Popover,PopoverBody,PopoverHeader,Modal,ModalHeader,Alert} from 'reactstrap'
import * as studentActions from '../../redux/students/actions'
import * as teacherActions from '../../redux/teachers/actions'
import * as bookActions from '../../redux/books/actions'
import * as userActions from '../../redux/users/action'
import {getUserName,getUserEmail} from '../../redux/users/saveUser'
import {BiMoveVertical,BiTrashAlt,BiUser,BiPaint,BiMessageError,BiCoinStack, BiWindowClose, BiUpload, BiMessageEdit,BiSave} from 'react-icons/bi'
import {AiFillCloseSquare, AiFillDelete} from 'react-icons/ai'

class Main extends Component {
state={ popoverOpen:false,modalPromote:false,modalDelRecords:false,modalDelFinalists:false,modalDelBorrowers:false,modalDelStudents:false,modalDelBooks:false,modalDelTeacherBorrowers:false,modalDelTeacherRecords:false,modalDelTeacherList:false,modalChangePassword:false,newPassword:'',oldPassword:'',modalErase:false,modalEdit:false,editUserName:'',editEmail:''}
  componentDidMount() {
    if (this.props.authAccess === false) {
     // this.props.history.push('/loggedIn')
     // this.props.logout()
    }
  }
  handleChangePassword=()=>{
const {oldPassword,newPassword}=this.state
console.log(oldPassword,newPassword)
const data={oldPassword,newPassword}
this.props.changeUserPassword(data)
this.toggleChangePassword()
 }
 handleEdit=()=>{
   const {editUserName,editEmail}=this.state
   const data={ email:editEmail,username:editUserName }
   this.props.history.push('/loggedIn')
this.props.editUserInfo(data)
this.toggleEdit()
 }
  handleAllChanges=(e)=>{
      let {name,value}=e.target
this.setState({[name]:value})
    } 
   togglePromote=()=>{
this.setState({modalPromote:!this.state.modalPromote})
    }
    toggleDelRecords=()=>{
this.setState({modalDelRecords:!this.state.modalDelRecords})
    }
toggleDelFinalists=()=>{
this.setState({modalDelFinalists:!this.state.modalDelFinalists})
    }
    toggleDelBorrowers=()=>{
this.setState({modalDelBorrowers:!this.state.modalDelBorrowers})
    }
  toggleDelStudents=()=>{
this.setState({modalDelStudents:!this.state.modalDelStudents})
    }

    toggleDelBooks=()=>{
this.setState({modalDelBooks:!this.state.modalDelBooks})
    }
 toggleDelTeacherBorrowers=()=>{
this.setState({modalDelTeacherBorrowers:!this.state.modalDelTeacherBorrowers})
    } 
 toggleDelTeacherRecords=()=>{
this.setState({modalDelTeacherRecords:!this.state.modalDelTeacherRecords})
    }    
toggleDelTeacherList=()=>{
this.setState({modalDelTeacherList:!this.state.modalDelTeacherList})
    } 
toggleChangePassword=()=>{
this.setState({modalChangePassword:!this.state.modalChangePassword})
    } 
toggleErase=()=>{
this.setState({modalErase:!this.state.modalErase})
    } 
toggleEdit=()=>{
this.setState({modalEdit:!this.state.modalEdit})
this.setState({editUserName:this.props.userName,editEmail:this.props.email})
    } 

setPopoverOpen =()=>{
  this.setState({popoverOpen:!this.state.popoverOpen})
}
  render() {

    return (
      <section className="mt-body container-fluid pb-4 mb-4">
        <div className="display-4 text-center m-0 py-2 px-0 bg-orange">Advanced Options</div>
    {this.props.error ? <Alert className="text-center" color="danger">{this.props.error}</Alert>:<UncontrolledAlert color="warning" className="m-auto mt-1 text-center w-75">
      These operation must be performed for serious reason other wise your data can be lost !!
    </UncontrolledAlert>}
    {this.props.studentError ? <Alert className="text-center" color="danger">{this.props.studentError}</Alert>:null}
    {this.props.teacherError ? <Alert className="text-center" color="danger">{this.props.teacherError}</Alert>:null}
    {this.props.bookError ? <Alert className="text-center" color="danger">{this.props.bookError}</Alert>:null}
    <p id="pooverOne" className="m-1 p-1 text-big text-center"> Who is finalist ? click<button className="btn text-warning dropdown-pointer text-big"><b>here</b></button> to know it !</p>
    <Popover placement="bottom" trigger="focus" isOpen={this.state.popoverOpen} target="pooverOne" toggle={this.setPopoverOpen}>
        <PopoverHeader>Who is Finalist ?</PopoverHeader>
        <PopoverBody>Is either student of senior <b>six</b> or <b>three</b> who did n't return some books and can come after some period of time.</PopoverBody>
      </Popover>
        <div className="row height-100 mb-3">
<div className="col-11 col-sm-5 mx-auto bg-white height-half my-3">
  <p className="p text-center h3 my-1"><u>User / me</u> </p>

  <div className="d-flex my-2">
<ul className="list-group mx-auto w-75 bg-darker">
  <button onClick={this.toggleEdit} className="list-group-item btn-outline-secondary text-dark"><i><BiUser/></i>Change email/username</button>
  <button onClick={this.toggleChangePassword} className="list-group-item btn-outline-secondary text-dark"><i><BiPaint/></i> Change password</button>
  <button onClick={this.toggleErase} className="list-group-item btn-outline-secondary text-dark"> <i><BiMessageError/></i>Delete my account</button>
</ul>
  </div>
  
</div>
<div className="col-11 col-sm-5 mx-auto bg-info height-half my-3">
    <p className="p text-center h3 my-1"><u>Students</u> </p>

 <div className="d-flex my-2">
<ul className="list-group mx-auto w-75 bg-darker">
  <button onClick={this.togglePromote} className="list-group-item p-1 btn-outline-secondary text-dark"><i><BiMoveVertical/></i>Promote students</button>
  <button onClick={()=>{this.toggleDelRecords()}} className="list-group-item p-1 btn-outline-secondary text-dark"><i><BiTrashAlt/></i>Delete records</button>
 
  <button onClick={this.toggleDelBorrowers} className="list-group-item p-1 btn-outline-secondary text-dark"><i><BiTrashAlt/></i>Delete borrowers</button>
  <button onClick={this.toggleDelStudents} className="list-group-item p-1 btn-outline-secondary text-dark"><i><BiTrashAlt/></i>Delete students</button>

</ul>
  </div>
</div>
<div className="col-11 col-sm-5 mx-auto bg-info height-half my-3">
<p className="p text-center h3 my-1"><u>Teachers</u> </p>
<div className="d-flex my-2">
<ul className="list-group mx-auto w-75 bg-darker">
  <button onClick={this.toggleDelTeacherBorrowers} className="list-group-item btn-outline-secondary text-dark"><i><BiTrashAlt/></i>Delete borrowers</button>
  <button onClick={this.toggleDelTeacherRecords} className="list-group-item btn-outline-secondary text-dark"><i><BiTrashAlt/></i>Delete records</button>
  <button onClick={this.toggleDelTeacherList} className="list-group-item btn-outline-secondary text-dark"><i><BiTrashAlt/></i>Delete teachers</button>
</ul>
  </div>
</div>
<div className="col-11 col-sm-5 mx-auto bg-info height-half my-3">
<p className="p text-center h3 my-1"><u>Books and finalist</u> </p>
<ul className="list-group mx-auto w-75 bg-darker">
<Link to="/loggedIn/finalists" className="list-group-item btn-outline-secondary text-center text-dark" ><i><BiCoinStack/></i> Finalists Data</Link>
  <button onClick={this.toggleDelBooks} className="list-group-item btn-outline-secondary text-dark"><i><BiTrashAlt/></i>Delete books</button>
  <button onClick={()=>this.toggleDelFinalists()} className="list-group-item p-1 btn-outline-secondary text-dark"><i><BiTrashAlt/></i>Delete finalists</button>
</ul>


</div>
        </div>

  <Modal name="promote" isOpen={this.state.modalPromote} toggle={this.togglePromote}>
        <ModalHeader toggle={this.togglePromote}>Are You Sure To promote ?</ModalHeader>
       
       <div className="text-center">
    <Alert color="warning" className="text-big">After promoting all students will be promoted and you will manual delete or remove those who are gone or repeated in same class !</Alert>
       </div>
        <div className="d-flex my-5 mx-3 text-big">
<button onClick={()=>{
  this.props.promoteStudents()
  this.togglePromote()
}
} className="btn btn-md pull-left btn-success mr-2 w-75"><i><BiUpload/></i>Promote</button>
<button type="button" onClick={this.togglePromote} className="btn btn-md pull-right btn-danger ml-2 w-75"><i><BiWindowClose/></i>Abort</button>
        </div>
        
       
      </Modal>   
    
    <Modal name="delRecords" isOpen={this.state.modalDelRecords} toggle={this.toggleDelRecords}>
        <ModalHeader toggle={this.toggleDelRecords}>Are You Sure To delete records ?</ModalHeader>
       
       <div className="text-center">
    
       </div>
        <div className="d-flex my-5 mx-3 text-big">
<button onClick={()=>{
  this.props.deleteRecords()
  this.toggleDelRecords()
}} className="btn btn-md pull-left btn-success mr-2 w-75"><i><AiFillDelete/></i> Delete</button>
<button type="button" onClick={this.toggleDelRecords} className="btn btn-md pull-right btn-danger ml-2 w-75"><i><BiWindowClose/></i>Abort</button>
        </div>
        
       
      </Modal>     
     
     <Modal name="delFinalists" isOpen={this.state.modalDelFinalists} toggle={this.toggleDelFinalists}>
        <ModalHeader toggle={this.toggleDelFinalists}>Are You Sure To delete finalists ?</ModalHeader>
       
       <div className="text-center">
    
       </div>
        <div className="d-flex my-5 mx-3 text-big">
<button onClick={()=>{
  this.props.deleteFinalists()
  this.toggleDelFinalists()
}} className="btn btn-md pull-left btn-success mr-2 w-75"><i><AiFillDelete/></i>Delete</button>
<button type="button" onClick={this.toggleDelFinalists} className="btn btn-md pull-right btn-danger ml-2 w-75"><i><BiWindowClose/></i>Abort</button>
        </div>
        
       
      </Modal> 
   
    <Modal name="deleteBorrowers" isOpen={this.state.modalDelBorrowers} toggle={this.toggleDelBorrowers}>
        <ModalHeader toggle={this.toggleDelBorrowers}>Are You Sure To delete borrowers ?</ModalHeader>
       
       <div className="text-center">
    
       </div>
        <div className="d-flex my-5 mx-3 text-big">
<button onClick={()=>{
  this.props.deleteBorrowers()
  this.toggleDelBorrowers()
}} className="btn btn-md pull{-left btn-success mr-2 w-75"><i><AiFillDelete/></i>Delete</button>
<button type="button" onClick={this.toggleDelBorrowers} className="btn btn-md pull-right btn-danger ml-2 w-75"><i><BiWindowClose/></i>Abort</button>
        </div>
        
       
      </Modal>  
   
    <Modal name="deleteAllStudents" isOpen={this.state.modalDelStudents} toggle={this.toggleDelStudents}>
        <ModalHeader toggle={this.toggleDelStudents}>Are You Sure To delete all students ?</ModalHeader>
       
       <div className="text-center">
    
       </div>
        <div className="d-flex my-5 mx-3 text-big">
<button onClick={()=>{
  this.props.deleteStudents()
  this.toggleDelStudents()
}} className="btn btn-md pull-left btn-success mr-2 w-75"><i><AiFillDelete/></i>Delete</button>
<button type="button" onClick={this.toggleDelStudents} className="btn btn-md pull-right btn-danger ml-2 w-75"><i><BiWindowClose/></i>Abort</button>
        </div>
        
       
      </Modal>  

 <Modal name="deleteAllBooks" isOpen={this.state.modalDelBooks} toggle={this.toggleDelBooks}>
        <ModalHeader toggle={this.toggleDelBooks}>Are You Sure To delete all Books ?</ModalHeader>
       
       <div className="text-center">
    
       </div>
        <div className="d-flex my-5 mx-3 text-big">
<button onClick={()=>{
  this.props.deleteAllBooks()
  this.toggleDelBooks()
}} className="btn btn-md pull-left btn-success mr-2 w-75"><i><AiFillDelete/></i>Delete all</button>
<button type="button" onClick={this.toggleDelBooks} className="btn btn-md pull-right btn-danger ml-2 w-75"><i><BiWindowClose/></i>Abort</button>
        </div>
        
       
      </Modal>  

<Modal name="deleteTeacherBorrower" isOpen={this.state.modalDelTeacherBorrowers} toggle={this.toggleDelTeacherBorrowers}>
        <ModalHeader toggle={this.toggleDelTeacherBorrowers}>Are You Sure To all Teacher borrowers ?</ModalHeader>
       
       <div className="text-center">
    
       </div>
        <div className="d-flex my-5 mx-3 text-big">
<button onClick={()=>{
  this.props.deleteTeacherBorrowers()
  this.toggleDelTeacherBorrowers()
}} className="btn btn-md pull-left btn-success mr-2 w-75"><i><AiFillDelete/></i>Delete all</button>
<button type="button" onClick={this.toggleDelTeacherBorrowers} className="btn btn-md pull-right btn-danger ml-2 w-75"><i><BiWindowClose/></i>Abort</button>
        </div>
        
       
      </Modal>  

<Modal name="deleteTeacherRecords" isOpen={this.state.modalDelTeacherRecords} toggle={this.toggleDelTeacherRecords}>
        <ModalHeader toggle={this.toggleDelTeacherRecords}>Are You Sure To Wipe all Teacher records ?</ModalHeader>
       
       <div className="text-center">
    
       </div>
        <div className="d-flex my-5 mx-3 text-big">
<button onClick={()=>{this.props.deleteTeacherRecords()
this.toggleDelTeacherRecords()
}} className="btn btn-md pull-left btn-success mr-2 w-75"><i><AiFillDelete/></i>Delete Records</button>
<button type="button" onClick={this.toggleDelTeacherRecords} className="btn btn-md pull-right btn-danger ml-2 w-75"><i><BiWindowClose/></i>Abort</button>
        </div>
        
       
      </Modal>
    
    <Modal name="deleteTeacherList" isOpen={this.state.modalDelTeacherList} toggle={this.toggleDelTeacherList}>
        <ModalHeader toggle={this.toggleDelTeacherList}>Are You Sure To delete all Teachers ?</ModalHeader>
      
        <div className="d-flex my-5 mx-3 text-big">
<button onClick={()=>{
  this.props.deleteTeachersList()
  this.toggleDelTeacherList()
}} className="btn btn-md pull-left btn-success mr-2 w-75"><i><AiFillDelete/></i>Delete Teachers</button>
<button type="button" onClick={this.toggleDelTeacherList} className="btn btn-md pull-right btn-danger ml-2 w-75"><i><BiWindowClose/></i>Abort</button>
        </div>
        
       
      </Modal>
    
    <Modal name="changePassword" isOpen={this.state.modalChangePassword} toggle={this.toggleChangePassword}>
        <ModalHeader toggle={this.toggleChangePassword}>Fill the following to change password !</ModalHeader>
      < div className="row my-2 mx-auto text-big">
<input type="password" onChange={this.handleAllChanges} value={this.state.newPassword} className="col-11 mx-auto my-2 form-control" name="newPassword" placeholder="New Password"/>
<input type="password" onChange={this.handleAllChanges} value={this.state.oldPassword} className="col-11 mx-auto my-2 form-control" name="oldPassword" placeholder="Old Password"/>
</div>
        <div className="d-flex my-2 mx-3 text-big">
<button onClick={()=>{
  this.handleEdit()
  this.toggleChangePassword()
}} 
className="btn btn-md pull-left btn-success mx-auto w-75"><i><BiSave/></i> Edit</button>

        </div>
        
       
      </Modal>

  <Modal name="removeMyAccount" isOpen={this.state.modalErase} toggle={this.toggleErase}>
        <ModalHeader toggle={this.toggleErase}>Are You Sure To delete you account ?</ModalHeader>
      <p className="text-center text">All your data will be lost forever !!</p>
        <div className="d-flex my-5 mx-3 text-big">
<button onClick={()=>{
  this.props.eraseAll()
  this.toggleErase()
}} className="btn btn-md pull-left btn-success mr-2 w-75"><i><AiFillDelete/></i>Confirm </button>
<button type="button" onClick={this.toggleErase} className="btn btn-md pull-right btn-danger ml-2 w-75"><i><BiWindowClose/></i>Abort</button>
        </div>
        
       
      </Modal>

<Modal name="changePassword" isOpen={this.state.modalEdit} toggle={this.toggleEdit}>
        <ModalHeader toggle={this.toggleEdit}>Fill the following to change email and username !</ModalHeader>
      < div className="row my-2 mx-auto text-big">
<input type="text" value={this.state.editUserName} onChange={this.handleAllChanges} className="col-11 mx-auto my-2 form-control" name="editUserName" placeholder="Username"/>
<input type="text" value={this.state.editEmail} onChange={this.handleAllChanges} className="col-11 mx-auto my-2 form-control" name="editEmail" placeholder="Email"/>
</div>
        <div className="d-flex my-2 mx-3 text-big">
<button onClick={()=>{
  this.handleEdit()
  this.toggleEdit()
}} 
className="btn btn-md pull-left btn-success mx-auto w-75"><i><BiMessageEdit/></i> Save changes</button>

        </div>
        
       
      </Modal>

      </section>
   
   )
 
  }
}
const mapStateToProps = (state) => {
  return {
    error: state.user.error,
    studentError:state.students.errors,
    teacherError:state.teachers.errors,
    bookError:state.books.errors,
    authAccess: state.user.advancedAuth,
    email:getUserEmail(),
    userName:getUserName()
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(redirect()),
    promoteStudents:()=>dispatch(studentActions.promoteStudents()),
    deleteRecords:()=>dispatch(studentActions.deleteStudentRecords()),
    deleteFinalists:()=>dispatch(bookActions.deleteFinalistsData()),
    deleteBorrowers:()=>dispatch(studentActions.deleteStudentBorrowers()),
    deleteStudents:()=>dispatch(studentActions.deleteStudentList()),
    deleteAllBooks:()=>dispatch(bookActions.deleteAllBooks()),
    deleteTeacherBorrowers:()=>dispatch(teacherActions.deleteTeacherBorrowers()),
    deleteTeacherRecords:()=>dispatch(teacherActions.deleteTeacherRecords()),
    deleteTeachersList:()=>dispatch(teacherActions.deleteTeacherList()),
    changeUserPassword:(data)=>dispatch(userActions.editUserPassword(data)),
    eraseAll:()=>dispatch(userActions.removeMyAccount()),
    editUserInfo:(data)=>dispatch(userActions.edituserInfo(data))
  }
}
//connect(mapStateToProps,mapDispatchToProps)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));