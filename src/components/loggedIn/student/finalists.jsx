/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from '../loading'
import {Alert,Modal, ModalHeader} from 'reactstrap'

import * as studentActions from '../../../redux/students/actions'
import moment from 'moment'
import ConnectionFail from '../connectionError'

class StudentList extends Component {
    state = { search:'',trash:'',modalDelete:false,modalReturn:false,nameToReturn:'',name_ToReturn:'' }
    
    componentDidUpdate(prevProps) {
     
    }
  
  putInTrash=(studentId)=>{
    this.setState({trash:studentId})
  }
 toggleDelete=()=>{
      this.setState({modalDelete:!this.state.modalDelete})
          }    
toggleReturn=()=>{
      this.setState({modalReturn:!this.state.modalReturn})
          }    
putInTrash=(studentId)=>{
    this.setState({trash:studentId})
}
    handleAllChanges=(e)=>{
      let {name,value}=e.target
this.setState({[name]:value})
    } 

    handleDelete=(e)=>{
e.preventDefault()
const studentId=this.state.trash
this.props.deleteFinalist(studentId)
this.toggleDelete()
  }
  
handleReturn=(e)=>{
e.preventDefault()
const studentId=this.state.trash
this.props.deleteFinalist(studentId)
this.toggleReturn()
  }
 
    render() { 


const errorMessage=this.props.error ? <Alert color="danger">{this.props.error}</Alert>:null  
  const list=this.props.finalist
  let filteredData
  list.length ? (  filteredData = list.filter(student => {
    return (
      student.firstName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      student.lastName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1||
      student.Class.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    )
  })) :(filteredData=[])

 let table= filteredData.length ?  <table className="table table-bordered table-responsive w-100" id="myTable">
 <thead className="w-100">
   <tr className="w-100">
     <th scope="col" className="">Firstname</th>
     <th scope="col" className="">Lastname</th>
     <th scope="col" className="">Class</th>
     <th scope="col" className="">G</th>
     <th scope="col" className="">Age</th>
     <th scope="col" className="w-2 text-nowrap">Book-name</th>
     <th scope="col" className="w-2 text-nowrap">Book-type</th>
     <th scope="col" className="text-nowrap">Lend-Date</th>
     <th scope="col" className="">Action</th>
     <th scope="col" className="">Action</th>


 
 
   </tr>
 </thead>
 <tbody>
 {filteredData.map((student)=>{
     return(
       
       <tr key={student._id}>
       <td className="p-1">{student.firstName}</td>
       <td className="p-1">{student.lastName}</td>
     <td className="p-1 text-nowrap">{student.Class}</td>
       <td className="p-1">{student.gender}</td>
       <td className="p-1">{student.age}</td>
       <td className="p-1">{student.bookName}</td>
       <td className="p-1">{student.bookType}</td>
       <td className="p-1">{moment(student.dateBorrowed).format('L')}</td>



       <td onClick={()=>{
         this.putInTrash(student._id)
         this.setState({nameToReturn:student.firstName,name_ToReturn:student.lastName})
         this.toggleReturn()
       }} className="p-1"><button className="btn btn-outline-danger w-100 py-0">Return</button></td>
       <td onClick={()=>{
         this.putInTrash(student._id)
         this.toggleDelete()
       }} className="py-1"><button className="btn btn-outline-danger w-100 py-0">Delete</button></td>
     </tr>
     )
 })}
   
 </tbody>
 </table>:<div className="w-100 text-center"><Alert className="text-center text-big text-dark" color="danger"> No finalist found !!</Alert></div>
    

  let allTable=this.props.loading ? <Loading/>:   <div className="row">

 {table}
  </div>   
     
        return ( <section className="mt-5 mt-body bg-pc">
          {this.props.connectionError ? <ConnectionFail/>:<React.Fragment>
            
           
            <div className="bg-secodary pt-2 head">
           <div className="d-flex bg-head justify-content-center">
<p className="text-center text-dark h2">All Finalists</p>
           </div>
           <p className="w-50 mx-auto p-line bg-line"></p>
           </div>
           <div className="container-fluid">
   <div className="row">
   <div className="col-11 col-sm-5 py-2 m-auto">

<label className="sr-only" htmlFor="inlineFormInputGroup">Search ...</label>
<div className="input-group mb-2">
  <input type="text" value={this.state.search} className="form-control bg-light" onChange={this.handleAllChanges } name="search" id="inlineFormInputGroup" placeholder="Search ..."/>
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
 <Modal name="deleteAstudentModal" isOpen={this.state.modalDelete} toggle={this.toggleDelete}>
        <ModalHeader toggle={this.toggleDelete}>Are You Sure To Finalist ?</ModalHeader>
        <form onSubmit={this.handleDelete}>
       <div className="text-center">
       </div>
        <div className="d-flex my-5 mx-3 text-big">
<button type="submit" className="btn btn-md pull-left btn-success mr-2 w-75">Delete</button>
<button type="button" onClick={this.toggleDelete} className="btn btn-md pull-right btn-danger ml-2 w-75">Abort</button>
        </div>
        
        </form>
      </Modal>

<Modal name="deleteAstudentModal" isOpen={this.state.modalReturn} toggle={this.toggleReturn}>
        <ModalHeader toggle={this.toggleReturn}>Are You Sure To return book from finalist ?</ModalHeader>
        <form onSubmit={this.handleReturn}>
       <div className="text-center">
<p className="text-center text-big">Firstname : <b>{this.state.nameToReturn}</b> </p>
<p className="text-center text-big">Lastname : <b>{this.state.name_ToReturn}</b> </p>
       </div>
        <div className="d-flex my-5 mx-3 text-big">
<button type="submit" className="btn btn-md pull-left btn-success mr-2 w-75">Return</button>
<button type="button" onClick={this.toggleReturn} className="btn btn-md pull-right btn-danger ml-2 w-75">Cancel</button>
        </div>
        
        </form>
      </Modal>
 
 </React.Fragment>}
        </section> );
    }
}
const mapStateToProps=(state)=>{
  return{
    connectionError:state.students.connectionError,
    auth:state.user.auth,
finalist:state.students.finalists,
loading:state.students.loadingFinalist,
error:state.students.errors
  }
}
const mapDispatchToProps= (dispatch)=>{
return{
return:()=>dispatch(),
deleteFinalist:(id)=>dispatch(studentActions.deleteFinalist(id)),
returnFinalistBooks:(id)=>dispatch(studentActions.returnFinalistBook(id))

}
}
 
export default connect(mapStateToProps,mapDispatchToProps)(StudentList);