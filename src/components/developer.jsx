import React from 'react'
import { BiLocationPlus,BiPhoneCall,BiSmile } from "react-icons/bi";

function Developers() {
    return (
        <section className="mt-body height-100m bg-developer">
        <div className="div bg-logo">
          <p className="p-2 display-3 text-center text-logo">Stack Fielders Team</p>
        </div>
        <div className="">


<div className="alert opacity" role="alert">
  
<div className="container my-auto mx-auto colo-dev">

  <p className="lead mt-1 text-center color-dev">We have designed this web application to solve problem of over writting the same person.</p>
  <p className="lead text-big text-center color-dev">By proving its users more efficient.</p>
  <p className="lead text-big text-center color-dev"><span className="text-warning">Also</span> we can make onohter projects like this if you want it we can make a deal trough these platforms below .</p>

</div>
</div>
<div className="container-fluid">
<div className="row">

<div className="col-11 col-sm-5 mx-auto">
<div className="card text-white mb-3 card-custom">
<div className="card-header text-big"><i className="text-big"><BiLocationPlus/></i> Location </div>
<div className="card-body">
  <p className="card-text text-big">Country : <b>Rwanda</b></p>
  <p className="card-text text-big">Service : <b>Websites / Web-application development</b></p>
  <p className="card-text text-big">You can contact us !</p>
  
</div>
</div>
</div>


  
<div className="col-11 col-sm-5 mx-auto">
<div className="card text-white mb-3 card-custom">
<div className="card-header"><i className="text-big"><BiPhoneCall/></i> Contacts</div>
<div className="card-body">
  <p className="card-text text-big">Phone : <b>0784405833</b></p>
  <p className="card-text text-big">Whatsapp : <b>0782765738</b></p>
  <p className="card-text text-big">Email : <b>irambonat0@gmail.com</b></p>
</div>
</div>
</div>


<div className="col-11 col-sm-5 mx-auto">
<div className="card text-white mb-3 card-custom">
<div className="card-header">In Addition</div>
<h5 className="card-title text-center">Those who want to study web development</h5>
<div className="card-body">
  <p className="card-text text-big">Phone : <b>0782765738</b></p>
  <p className="card-text text-big">Whatsapp : <b>0784405833</b></p>
  <p className="card-text text-big">Email : <b>irambonat0@gmail.com</b></p>
  <p className="card-text text-big">Youtube : <b>Thenetninja</b></p>

</div>
</div>
</div>


</div>

</div>
        </div>
        <div className="border border-secondary mt-2 mx-1">

        <p className="text-center display-4 color-dev h3"><i><BiSmile/></i>  Special thanks for visiting us</p>       
        </div>
        </section>
    ) 
  
}

export default Developers
