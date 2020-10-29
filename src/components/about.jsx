/* eslint-disable no-unused-vars */
import React from 'react'
import Footer from './footer'
import { BiCheckShield } from "react-icons/bi";
function About() {
    return (
        <section className="mt-body p-0 m-0">
            <div className="container-fluid about-bg">
           <div className="text-big mt-3">
               <p className="custom-color text-center pt-2"><b>The following are operations that can be performed in smart library.</b> </p>
               <p className="bg-new mx-auto w-50"></p>
           </div>
<div className="row">
<div className="card col-11 col-sm-5 mx-auto mt-2">
     <div className="card-header bg-transparent text-secondary border-success"><i><b><BiCheckShield/></b></i> Manage students</div>
  <div className="card-body">
    <p className="card-text">You can review students registered in smart library and then evaluate them.</p>
  </div>
</div>

<div className="card col-11 col-sm-5 mx-auto mt-2">
     <div className="card-header bg-transparent text-secondary border-success"><i><b><BiCheckShield/></b></i> Manage books</div>
  <div className="card-body">
    <p className="card-text">you will know all books you have in library then manage them.</p>
  </div>
</div>

<div className="card col-11 col-sm-5 mx-auto mt-2">
     <div className="card-header bg-transparent text-secondary border-success"><i><b><BiCheckShield/></b></i> Lend books</div>
  <div className="card-body">
    <p className="card-text">You can lend books to the students that are registered in smart library.</p>
  </div>
</div>

<div className="card col-11 col-sm-5 mx-auto mt-2">
     <div className="card-header bg-transparent text-secondary border-success"><i><b><BiCheckShield/></b></i> Return Books</div>
  <div className="card-body">
    <p className="card-text">You will also be able to return books from students.</p>
  </div>
</div>

<div className="card col-11 col-sm-5 mx-auto mt-2">
     <div className="card-header bg-transparent text-secondary border-success"><i><b><BiCheckShield/></b></i> Print Borrowers list</div>
  <div className="card-body">
    <p className="card-text">when you want to print list of students who did n't return books and publish it.</p>
  </div>
</div>

<div className="card col-11 col-sm-5 mx-auto mt-2">
     <div className="card-header bg-transparent text-secondary border-success"><i><b><BiCheckShield/></b></i> Manage teachers</div>
  <div className="card-body">
    <p className="card-text">You can also be able to review teachers list and evaluate them.</p>
  </div>
</div>

<div className="card col-11 col-sm-5 mx-auto mt-2 mb-3">
     <div className="card-header bg-transparent text-secondary border-success"><i><b><BiCheckShield/></b></i> In addition</div>
  <div className="card-body">
    <p className="card-text">we can also keep books records of the students in the past until you delete them it is done manualy after a certain period of time.</p>
  </div>
</div>

</div>
         </div>
           <Footer/>
        </section>
    )
}

export default About
