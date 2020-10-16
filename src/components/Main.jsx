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
import {fetchList,fetchBorrowers} from '../redux/students/actions'

class Main extends Component {
  componentDidMount() {
   this.props.fetchList()
   this.props.fetchBorrowers()
    if (this.props.auth===false) {
      this.props.history.push('/')
   } 
   this.props.history.push('/loggedIn')

   }
  
  state = {  }
  render() { 
    return (
<React.Fragment>
<Switch>
<Route exact path="/loggedIn" component={Home} />
<Route path="/loggedIn/studentList" component={StudentList} />
<Route path="/loggedIn/studentBorrowers" component={StudentBorrowers} />
<Route path="/loggedIn/teachersList" component={TeachersList} />
<Route path="/loggedIn/teachersBorrowers" component={TeachersBorrowers} />

<Route path="/loggedIn/bookList" component={BooksList} />
<Route path="/loggedIn/bookBorrowed" component={BooksBorrowed} />
<Route path="/loggedIn/settings" component={Settings} />
</Switch>
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
fetchList:()=>dispatch(fetchList()),
fetchBorrowers:()=>dispatch(fetchBorrowers())   

  }
} 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Main));