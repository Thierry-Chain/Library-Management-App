/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {useSelector,useDispatch} from  'react-redux'
import { getUserName } from '../redux/users/saveUser'
import {
  Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavbarText,Spinner,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader,Alert} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import {fullLogout} from '../redux/users/action'
import axios from 'axios'
import {location} from '../locations' 
import {getUserId} from '../redux/users/saveUser'
import {withRouter} from 'react-router-dom'
import {loginAdvanced} from '../redux/users/action'
const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalVerify, setModalVerify] = useState(false)
  const toggle = () => setIsOpen(!isOpen);
  const [error, setError] = useState('')
  const toggleSmart = () => {
    if (isOpen===true) 
    setIsOpen(!isOpen)
  };
  const token = useSelector(state => state.user.more.token)
  const dispatch=useDispatch()
  
  const verifyPassword=()=>{
        const authHeader = {
            'Content-Type': 'application/json',
            'auth-token': `${token}`
        }
  let data={
'email':email,
'password':password
  }
        const config = {
            url: `${location}/user/checkPassword/${getUserId()}`,
            method: 'post',
            headers: authHeader,
            data
        }

        axios(config).then(() => {
          dispatch(loginAdvanced())
          setModalVerify(!modalVerify)
          props.history.push('/loggedIn/settings')
          
        })
        .catch((error) => {
          
            setError(error.response.data.message)
        
        })
  }
  const login =props.login
  const register =props.register
  
  const logout=()=>{
     props.history.push('/')
    dispatch(fullLogout());toggleModal();toggle()
  }
  const auth = useSelector(state => state.user.auth)
  const [password, setPassword] = useState('12345A')
  const [email, setEmail] = useState('thierry@gmail.com')

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);
  const toggleDrop = () => setDropdownOpen(prevState => !prevState);

  const [dropdownOpenT, setDropdownOpenT] = useState(false);

  const toggleDropT = () => setDropdownOpenT(prevState => !prevState);

  const [dropdownOpenB, setDropdownOpenB] = useState(false);

  const toggleDropB = () => setDropdownOpenB(prevState => !prevState);
  const allStudents=useSelector(state => state.students.list.length)
  const allStdBorrowed=useSelector(state => state.students.borrowers.length)
  const allTeachers=useSelector(state => state.teachers.list.length)
  const alltchBorrowed=useSelector(state => state.teachers.borrowers.length)
  const allBooks=useSelector(state => state.books.list.length)
  
const brand =auth ?  <NavbarBrand className="text-brand" to="/">
 
  <span className="badge d-none d-sm-inline"><Spinner type="grow" color="warning" size="sm" />
  </span> {getUserName()}</NavbarBrand> : <NavbarBrand className="text-brand" to="/">My Library</NavbarBrand>
 const collapse=auth ?   <Collapse isOpen={isOpen} navbar>
 <Nav className="mr-auto bg-nav" navbar >

   <NavItem onClick={toggleSmart}>
     <NavLink className="nav-link nav-item p-2"  to="/loggedIn">Home</NavLink>
   </NavItem>

   <NavItem>
   <Dropdown isOpen={dropdownOpen} toggle={toggleDrop}>
   <DropdownToggle  tag="span" data-toggle="dropdown" className="dropdown-pointer" >
<p className="nav-link nav-item p-2" >Students <sup className="badge badge-danger">{allStudents}</sup> ^ </p>
      </DropdownToggle>
      <DropdownMenu onClick={toggleSmart}>
      <DropdownItem header><p className="text-info"><b>Students</b></p></DropdownItem>
        <NavLink to="/loggedIn/studentList"><DropdownItem>List <sup className="badge badge-danger">{allStudents}</sup></DropdownItem></NavLink>
       
  <NavLink to="/loggedIn/studentBorrowers"><DropdownItem>Borrowers <sup className="badge badge-danger">{allStdBorrowed}</sup></DropdownItem></NavLink>    

  <NavLink to="/loggedIn/students/records"><DropdownItem>Records</DropdownItem></NavLink>      
        
      </DropdownMenu>
    </Dropdown>
   </NavItem>


   <NavItem>
   <Dropdown isOpen={dropdownOpenT} toggle={toggleDropT}>
   <DropdownToggle  tag="span" data-toggle="dropdown" className="dropdown-pointer">
       <p className="nav-link nav-item p-2" >Teachers <sup className="badge badge-danger">{allTeachers}</sup> ^</p>
      </DropdownToggle>
      <DropdownMenu onClick={toggleSmart}>
      <DropdownItem header><p className="text-info"><b>Teachers</b></p></DropdownItem>
    <NavLink to="/loggedIn/teachersList"><DropdownItem>List <sup className="badge badge-danger">{allTeachers}</sup></DropdownItem></NavLink>        
      
  <NavLink to="/loggedIn/teachersBorrowers"><DropdownItem>Borrowers <sup className="badge badge-danger">{alltchBorrowed}</sup></DropdownItem></NavLink>  

  <NavLink to="/loggedIn/teachers/records"><DropdownItem>Records</DropdownItem></NavLink>
      </DropdownMenu>
    </Dropdown>
   </NavItem>

   <NavItem>
   <Dropdown isOpen={dropdownOpenB} toggle={toggleDropB}>
   <DropdownToggle  tag="span" data-toggle="dropdown" className="dropdown-pointer">
       <p className="nav-link nav-item p-2" >Books <sup className="badge badge-danger">{allBooks}</sup> ^</p>
      </DropdownToggle>
      <DropdownMenu onClick={toggleSmart}>
      <DropdownItem header><p className="text-info"><b>Books</b></p></DropdownItem>
      <NavLink to="/loggedIn/bookList"><DropdownItem>List <sup className="badge badge-danger">{allBooks}</sup></DropdownItem></NavLink>
       
      </DropdownMenu>
    </Dropdown>
   </NavItem>
     
   <NavItem onClick={()=>{
     toggleSmart()
     setModalVerify(!modalVerify)
   }}>
    <button className="nav-link nav-item p-2 bg-none">Settings</button>      
  </NavItem>

     <NavItem onClick={toggleModal}>
     <button className="nav-link nav-item p-2 bg-none">Logout</button>    
     </NavItem>

 </Nav>

</Collapse> :  <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto bg-nav" navbar onClick={toggleSmart} >

            <NavItem>
                
              <NavLink className="nav-link nav-item p-2"  to="/">Home</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link nav-item p-2" to="/about">About us</NavLink>
            </NavItem>

            <NavItem onClick={()=>register()} >
              <button className="nav-link nav-item p-2 bg-none">Register</button>
            </NavItem>

            <NavItem onClick={()=>{
              login()
              localStorage.clear()
            }
            }>
              <button className="nav-link nav-item p-2 bg-none">Login</button>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link nav-item p-2" to="/developers">Developers</NavLink>
            </NavItem>
              
          </Nav>
         
          <NavbarText>Online library management</NavbarText>
        </Collapse>
  return (
    <div className="container-fluid px-0 d-print-none">
      <Navbar light expand="lg">
       {brand}
        <NavbarToggler onClick={toggle} />
        {collapse}     
      </Navbar>
    
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggleModal}><div className="text-center text-info">Are you sure to logout ?</div></ModalHeader>
        <div className="d-flex justify-content-center p-3">

          <button className="btn btn-success mr-4" onClick={logout}><b className="text-light" >Logout</b></button>
          <button className="btn btn-danger ml-4" onClick={toggleModal}><b className="text-light" >Cancel</b></button>

        </div>
        
      </Modal>

     <Modal isOpen={modalVerify} toggle={()=>setModalVerify(!modalVerify)}>
        <ModalHeader toggle={()=>setModalVerify(!modalVerify)}><div className="text-center text-info">Enter the following </div></ModalHeader>
  {error ? <Alert color="danger">{error}</Alert>:null}
  <div className="row">
    <div className="col-11 mx-auto col-sm-6 my-2">
 
  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control m-auto w-75" placeholder="Enter your email"/>
</div>

<div className="col-11 mx-auto col-sm-6 my-2">
<input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control m-auto w-75" placeholder="Enter your password"/>
</div>
    
        </div>
        <div className="d-flex p-3">
  <button onClick={verifyPassword} className="btn btn-md btn-success m-auto text-big">Verify</button>
</div>


      </Modal> 

    </div>
  );
}

export default withRouter(NavBar);

