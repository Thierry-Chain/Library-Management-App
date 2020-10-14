import React,{ useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {  Modal, ModalHeader, ModalBody,Alert } from 'reactstrap';
import * as userActions from '../../redux/users/action'
import { withRouter } from 'react-router-dom'


const Login = (props) => {
  //const [names, setNames] = useState('')
  const [email, setEmail] = useState('thierry1@gmail.com')
  const [pword, setPword] = useState('1234Aa')
  //const [pword1, setPword1] = useState('')
  const error=useSelector(state=>state.user.error)

 const login = props.login
 const toggle =props.onToggle

  const dispatch=useDispatch();

  const handleSubmit = (e)=>{
e.preventDefault()
let user= { email,password:pword }
localStorage.clear()
dispatch(userActions.fullLogin(user)) 
toggle()
props.history.push('/loggedIn')
}

  let alert=error ? <Alert color="danger"> {error} </Alert> : null;
  return (
    <div>
     
      <Modal isOpen={login} toggle={()=>{ toggle() }} >
      <form className="form" onSubmit={handleSubmit}>
      <ModalHeader toggle={()=>{ toggle() }}><p className="text-center text-info mx-auto">Login Now</p></ModalHeader>
        <ModalBody>
      {alert}  
  <div className="row">
   
    <div className="col-11 mt-2 col-md-6 mx-auto">
      <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control bg-input" placeholder="Email"/>
    </div>

    <div className="col-11 mt-2 col-md-6 mx-auto">
      <input type="password" name="pword" value={pword} onChange={(e)=>{setPword(e.target.value)}} className="form-control bg-input" placeholder="Password"/>
    </div>

  </div>

      
            
        </ModalBody>
        <hr/>
       
            <div className="d-flex justify-content-around p-3">
<button type="submit" className="btn btn-success btn-md">Login</button>
<button type="button" className="btn btn-warning btn-md" onClick={()=>toggle()}>Abort</button>
            </div>
            </form>
      </Modal>
    </div>
  );
}

export default withRouter(Login);