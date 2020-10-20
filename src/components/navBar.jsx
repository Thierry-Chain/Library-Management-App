/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {useSelector,useDispatch} from  'react-redux'
import { getUserName } from '../redux/users/saveUser'
import {
  Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavbarText,Spinner,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import {fullLogout} from '../redux/users/action'
const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleSmart = () => {
    if (isOpen===true) 
    setIsOpen(!isOpen)
  };
  const login =props.login
  const register =props.register
  const dispatch=useDispatch()
  const logout=()=>{
    dispatch(fullLogout());toggleModal();toggle()
  }
  const auth = useSelector(state => state.user.auth)
  
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

   <NavItem>
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
     
   <NavItem>
     <NavLink to="/loggedIn/settings"  className="nav-link nav-item p-2 bg-none">Settings</NavLink>    
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

            <NavItem onClick={()=>login()}>
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

    </div>
  );
}

export default NavBar;

