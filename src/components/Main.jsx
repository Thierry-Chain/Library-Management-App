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
import * as studentAction from '../redux/students/actions'
import * as teachersAction from '../redux/teachers/actions'
import * as booksAction from '../redux/books/actions'


class Main extends Component {
  componentDidMount() {
   this.props.fetchList()
   this.props.fetchTeacherList()
   this.props.fetchBorrowers()
   this.props.fetchTeacherBorrowers()
   this.props.fetchBooks()
   this.props.fetchBorrowedBooks()
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
fetchList:()=>dispatch(studentAction.fetchList()),
fetchBorrowers:()=>dispatch(studentAction.fetchBorrowers()),
fetchTeacherList:()=> dispatch(teachersAction.fetchList()),
fetchTeacherBorrowers:()=> dispatch(teachersAction.fetchBorrowers()),
fetchBooks:()=> dispatch(booksAction.fetchList()),
fetchBorrowedBooks:()=>dispatch(booksAction.fetchBorrowed() )
  }
} 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Main));