/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Route,withRouter,Switch } from 'react-router-dom'
import Home from './loggedIn/home'
import StudentList from './loggedIn/student/studentList'
import StudentBorrowers from './loggedIn/student/studentBorrowers'
import TeachersList from './loggedIn/teacher/teachersList'
import TeachersBorrowers from './loggedIn/teacher/teachersBorrowers'
import BooksList from './loggedIn/book/bookList'
import BooksBorrowed from './loggedIn/book/bookBorrowed'
import Settings from './loggedIn/settings'

class Main extends Component {
  componentDidMount() {
  if (this.props.auth===false) {
    this.props.history.push('/')
  }  }
  
  state = {  }
  render() { 
    return (
<React.Fragment>
<switch>
<Route exact path="/loggedIn" component={Home} />
<Route exact path="/loggedIn/studentList" component={StudentList} />
<Route exact path="/loggedIn/studentBorrowers" component={StudentBorrowers} />
<Route exact path="/loggedIn/teachersList" component={TeachersList} />
<Route exact path="/loggedIn/teachersBorrowers" component={TeachersBorrowers} />

<Route exact path="/loggedIn/bookList" component={BooksList} />
<Route exact path="/loggedIn/bookBorrowed" component={BooksBorrowed} />
<Route exact path="/loggedIn/settings" component={Settings} />
</switch>
</React.Fragment>)
  

  }
}
const mapStateToProps=(state)=>{
  return{
error:state.user.error,
auth:state.user.auth
  }
} 
const mapDispatchToProps=(dispatch)=>{
  return{
fullLogin:(user)=>dispatch()    
  }
} 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Main));