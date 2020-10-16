import React from 'react'
import { Jumbotron } from 'reactstrap';
import { Link} from 'react-router-dom'
import Footer from './footer';
function FirstPage(props) {
const login=props.login
const register=props.register
    return (
        <section className="body-img pt-1" > 
        <div className="container-fluid p-0">
     <div className="img-fluid top-img">
         
         </div>       
        <Jumbotron className="mb-0 bg-jumbtron">
            <div className="container">
            <h1 className="display-5 text-primary">Welcome to smart library management system</h1>
         <p className="lead">This web application is designed for helping institutions to control and manage books smartly.</p>
         <hr className="my-2" />
         <p className="text-big mt-2">It is easy to use and efficient.</p>
         <p className="text-big mt-2">You can explore more about this app by click button bellow </p>
         <p className="lead pb-0 mt-2">
           <Link to="/about" className="btn btn-lg btn-gray text-light mx-auto">Explore <span className="badge badge-danger pt-1"> More</span></Link>
         </p>
            </div>
        
       </Jumbotron>
       <div className="container-fluid p-0 m-0 bg-start p-3">
 <div className="pt-3 container border-custom bg-start-new">
     <div className="display-4">
    <h3 className="text-info text-center">Getting started with smart library</h3>
    <hr className="bg-info mt-1 p-1"/>
     </div>
     <div className="display-5">
        <h4 className="text-center"><u>Firstly You Must Register</u></h4>
        <p className="text-center lead m-2">By registering you will have your own account so that you can simply start to use it</p>
 
        <p className="text-center lead m-2">Or if you have already registered you can simply login and start</p>
 <hr/>
 <div className="d-flex justify-content-center m-2">
 <button onClick={()=>register()} className="btn btn-md btn-outline-info">Register</button>
 <button onClick={()=>login()} className="btn btn-md btn-outline-info ml-4">Login</button>
 </div>
 
     </div>
 
 </div> 
       </div>
        </div>
<Footer/>

        </section>
    
    )
}

export default FirstPage
