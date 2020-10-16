/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentList extends Component {
    state = { search:'' }
    render() { 
const search= (e)=> {
    this.setState({search:e.target.value})
    // Declare variables
    var input, filter, table, tr, td, i, tf,exp;
    input = this.state.search;
    filter = input.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      tf = tr[i].getElementsByTagName("td")[1];
      exp= tr[i].getElementsByTagName("td")[2];
      if (td || tf || exp ) {
        let txt1Value = td.textContent || td.innerText;
        let txValue = tf.textContent || tf.innerText;
        let expValue = exp.textContent || exp.innerText;
        if (txt1Value.toUpperCase().indexOf(filter) > -1 || txValue.toUpperCase().indexOf(filter) > -1 || expValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };        
  const list=this.props.students
        return ( <section className="mt-5 mt-body bg-pc">
            <div className="bg-secodary pt-2 head">
           <div className="d-flex bg-head justify-content-center">
<p className="text-big-text-center text-dark h2">Student List                        <span title="Add New Student" className="ml-1 badge badge-warning dropdown-pointer add"> Add +</span></p>
           </div>
           <p className="w-50 mx-auto p-line bg-line"></p>
           </div>
           <div className="container-fluid">
   <div className="row">
   <div className="col-11 col-sm-5 py-2 m-auto">

<label className="sr-only" htmlFor="inlineFormInputGroup">Search ...</label>
<div className="input-group mb-2">
  <input type="text" value={this.state.search} onChange={search} onKeyDown={search} onKeyUp={search} className="form-control bg-light" id="inlineFormInputGroup" placeholder="Search ..."/>
  <div className="input-group-prepend">
    <div className="input-group-text">@</div>
  </div>

</div>   
  </div>    
       </div>         
    <div className="container">
        <div className="row">

    <table className="table table-bordered table-responsive w-100" id="myTable">
  <thead className="w-100">
    <tr className="w-100">
      <th scope="col" className="w">Firstname</th>
      <th scope="col" className="w">Lastname</th>
      <th scope="col" className="w">Class</th>
      <th scope="col" className="">Gender</th>
      <th scope="col" className="w">Year</th>
      <th scope="col" className="w">Action</th>
      <th scope="col" className="w">Action</th>


    </tr>
  </thead>
  <tbody>
  {list.map((student)=>{
      return(
        <tr key={student._id}>
        <td className="p-1">{student.firstName}</td>
        <td className="p-1">{student.lastName}</td>
      <td className="p-1">{student.Class}</td>
        <td className="p-1">{student.gender}</td>
        <td className="p-1">{student.age}</td>
        <td className="p-1"><button className="btn btn-outline-info w-75 py-0">Lend</button></td>
        <td className="p-1"><button className="btn btn-outline-info w-75 py-0">Edit</button></td>
      </tr>
      )
  })}
    
  </tbody>
</table>   
    </div>   
        </div>
       
        </div>

    
        </section> );
    }
}
const mapStateToProps=(state)=>{
  return{
students:state.students.list
  }
} 
 
export default connect(mapStateToProps)(StudentList);