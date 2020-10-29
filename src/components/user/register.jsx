/* eslint-disable no-unused-vars */

import React,{useState} from 'react';
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import {Alert} from 'reactstrap'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { location } from '../../locations'
import ConnectionFails from '../loggedIn/connectionError'
import {BiUserPlus,BiUserCheck,BiUserX} from 'react-icons/bi'

const Register = (props) => {
const [names, setNames] = useState('')
const [email, setEmail] = useState('')
const [pword, setPword] = useState('')
const [pword1, setPword1] = useState('')
const [errors, seterrors] = useState('')
const register = props.register
const toggle =props.onToggle
const notify=props.notify
const connectionError = useSelector(state => state.students.connectionError)

let alert= errors ? <Alert color="danger"> {errors} </Alert>:null

const handleSubmit=(e)=>{
  e.preventDefault()
 if(names==='' || email==='' || pword==='' || pword1===''){
seterrors('Fill Empty Space')
  return false
 }else if(names.length>13){
  seterrors('Chose shorter name')
  return false
 }
 else{
   const data=JSON.stringify({name:names,email,password:pword,password1:pword1})
const config={
  url:`${location}/user/register`,
  method:'post',
  headers:{'Content-Type':'application/json'},
  data
}
axios(config)
.then(function (resp) {
 if (resp.data) {
   toggle()
   notify('Registered Successfully')
   setNames('');setEmail('');setPword('');setPword1('');seterrors('')
 }
})
 .catch(function (err) {
  seterrors(err.response.data.message)
});
 

 }
}
  return (
    <div>
  {connectionError ? <ConnectionFails/>:<React.Fragment>
    
      <Modal isOpen={register} toggle={()=>{ toggle() }} >
      <form className="form" onSubmit={handleSubmit}>
        <ModalHeader toggle={()=>{ toggle() }}><p className="text-center text-info mx-auto"><i><BiUserPlus/></i> Register As User</p></ModalHeader>
        <ModalBody>
      {alert}  
  <div className="row">
    <div className="col-11 mt-2 col-md-6 mx-auto">
      <input type="text" name="names" value={names} onChange={(e)=>{setNames(e.target.value)}} className="form-control" placeholder="Your names"/>
    </div>
    <div className="col-11 mt-2 col-md-6 mx-auto">
      <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Email"/>
    </div>

    <div className="col-11 mt-2 col-md-6 mx-auto">
      <input type="password" name="pword" value={pword} onChange={(e)=>{setPword(e.target.value)}} className="form-control" placeholder="Password"/>
    </div>

    <div className="col-11 mt-2 col-md-6 mx-auto">
      <input type="password" name="pword1" value={pword1} onChange={(e)=>{setPword1(e.target.value)}} className="form-control" placeholder="Confirm password"/>
    </div>

  </div>

        </ModalBody><hr/>
       
            <div className="d-flex justify-content-around p-3">
<button type="submit" className="btn btn-success btn-md text-big"><i><BiUserCheck/></i> Register </button>
<button type="button" className="btn btn-warning btn-md text-big" onClick={()=>toggle()}><i><BiUserX/></i> Cancel</button>
            </div>
            </form>
      </Modal>
    </React.Fragment>}
    </div>
  );
}

export default Register;