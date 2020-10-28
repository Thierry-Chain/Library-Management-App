/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import Select from 'react-select'
import Classes,{optionGender} from './classes'
import Loading from '../loading'
import {Alert} from 'reactstrap'
import * as studentActions from '../../../redux/students/actions'
import ConnectionFails from '../connectionError'

class Edit extends Component {
    state={fname:'',lname:'',age:'',gender:'',selectedOption:'',goBackVisible:false}
componentWillUnmount(){
  this.props.editPassed()
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
handleSubmit= (e)=>{
    e.preventDefault()
    let {fname,lname,age,gender,selectedOption} =this.state
    let {studentList} =this.props
    const studentId=this.props.match.params.studentId
   const studentObj=studentList.find(student=>student._id===studentId)
  let FirstName,LastName,Age,Gender,SelectedOption

    fname==='' ? FirstName=studentObj.firstName : FirstName=fname
    lname==='' ? LastName=studentObj.lastName : LastName=lname
    age==='' ? Age=studentObj.age : Age=age
gender==='' ? Gender=studentObj.gender : Gender=gender
selectedOption==='' ? SelectedOption=studentObj.Class : SelectedOption=selectedOption
 
const data={
  firstName:FirstName,
  lastName:LastName,
  Class:SelectedOption,
  gender:Gender,
  age:Age
 }
this.props.editData(data,studentId)
this.props.history.push('/loggedIn/studentList')
}
    render() {
        const errorMessage=this.props.errors
        const studentId=this.props.match.params.studentId
        const students=this.props.studentList
        let studentObj,Class,gender
        students.length ? ( studentObj=students.find(student=>student._id===studentId))
        :(studentObj=0)

        studentObj ? ( Class={ value: studentObj.Class, label: studentObj.Class } )
        :(Class=0) 

        studentObj ? ( gender={ value: studentObj.gender, label:studentObj.gender } )
        :(gender=0) 

const sectionData=studentObj ? <div className="row height-100">
       <div className="col-11 col-sm-7 col-md-6 col-lg-5 m-auto" >
          <div className="text-center h2 text-info"><p>Edit Student Data</p>
          <p className="p-1 bg-info w-50 mx-auto"></p>
          </div>
           <form onSubmit={this.handleSubmit}>
     {errorMessage ? <Alert color="danger">{errorMessage}</Alert>:null}        
           <div className="row bg-pc">
       <div className="col-11 mx-auto col-sm-6 my-2">
           <p>FirstName</p>
         <input name="fname" defaultValue={studentObj.firstName} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="First name"/>
       </div>
   
       <div className="col-11 mx-auto col-sm-6 my-2">
           <p>LastName</p>
         <input defaultValue={studentObj.lastName} name="lname" onMouseUp={this.handleAllChanges} onChange={this.handleAllChanges} type="text" className="form-control" placeholder="Last name"/>
       </div>
         <Select id="inputState" defaultValue={Class} options={Classes}   onChange={this.handleChangeNew} className="form-control bg-pc col-11 mx-auto col-sm-6 my-2 border-0" placeholder="Select class">
         
         </Select>
   
         <Select options={optionGender} defaultValue={gender} onChange={this.handleChangeGender} className="form-control col-11 mx-auto col-sm-6 my-2 bg-pc border-0" placeholder="Select gender">
         </Select>
   
     <div className="col-11 mx-auto col-sm-6 my-2">
        
         <input name="age" defaultValue={studentObj.age} type="number" onChange={this.handleAllChanges} max="9999" min="1900" className="form-control" placeholder="Birth Year"/>
       </div>     
       
     </div>
         
           <div className="d-flex">
           <button type="submit" className="btn btn-md btn-success m-auto"><b>Save</b></button>
           </div>
           </form> 
        
                
         
   
       </div>
   
   </div>     :<Loading/>             
     
        return (
           <section className="mt-body">
             {this.props.connectionError ? <ConnectionFails/>:<React.Fragment>
               
               <div className="container-fluid" >
           {sectionData}
               </div>

</React.Fragment>}
           </section>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
      connectionError:state.students.connectionError,
studentList:state.students.list,
errors:state.students.errors
    }
}
const mapDispatchToProps=(dispatch)=>{
  return {
editData:(data,StudentId)=>dispatch(studentActions.editStudentData(data,StudentId) ),
editPassed:()=>dispatch(studentActions.addStudentPassed() )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Edit)