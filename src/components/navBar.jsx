/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavbarText
} from 'reactstrap';
import { NavLink } from 'react-router-dom'
const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleSmart = () => {
    if (isOpen===true) 
    setIsOpen(!isOpen)
  };
  const login =props.login
  const register =props.register

  return (
    <div className="container-fluid">
      <Navbar light expand="lg">
        <NavbarBrand className="text-brand" to="/">My Library</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
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
      </Navbar>
    </div>
  );
}

export default NavBar;

