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
import * as userActions from '../redux/users/action'
import * as studentAction from '../redux/students/actions'
import * as teachersAction from '../redux/teachers/actions'
import * as booksAction from '../redux/books/actions'
import NotFound from './noFound'
import Edit from './loggedIn/student/edit'
import Lend from './loggedIn/student/lend'
import Records from './loggedIn/student/records'
import RecordsTeachers from './loggedIn/teacher/records'



class Main extends Component {
  UNSAFE_componentWillMount(){
    if (this.props.auth===false||this.props.auth===null||this.props.auth===undefined) {
      this.props.history.push('/')
   } 
   if (this.props.auth === true) {
     //this can be removed if the fisrst router is changed after hosting
    //this.props.history.push('/loggedIn')
   }
  }
  componentDidMount() {
    if (this.props.auth === true) {   
  this.props.checkUserCredentials()
  this.props.fetchList()
   this.props.fetchTeacherList()
   this.props.fetchBorrowers()
   this.props.fetchTeacherBorrowers()
   this.props.fetchBooks()
   this.props.fetchBorrowedBooks()
   this.props.fetchRecords()
   this.props.fetchTeacherRecord()
     }
   } 
  
  
  render() { 
    return (
<React.Fragment>
<Switch>
<Route exact path="/loggedIn" component={Home} />
<Route path="/loggedIn/studentList" component={StudentList} />
<Route path="/loggedIn/bookList" component={BooksList} />
<Route path="/loggedIn/settings" component={Settings} />
<Route path="/loggedIn/studentBorrowers" component={StudentBorrowers} />
<Route path="/loggedIn/teachersList" component={TeachersList} />
<Route path="/loggedIn/bookBorrowed" component={BooksBorrowed} />

<Route path="/loggedIn/students/records" component={Records} />
<Route path="/loggedIn/teachers/records" component={RecordsTeachers} />
<Route path="/loggedIn/teachersBorrowers" component={TeachersBorrowers} />
<Route path="/loggedIn/edit/:studentId" component={Edit} />
<Route path="/loggedIn/lend/:studentId/:lend" component={Lend} />

<Route path="/loggedIn/:any" component={NotFound} />

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
checkUserCredentials:()=>dispatch(userActions.checkUserCredentials()),
fetchList:()=>dispatch(studentAction.fetchList()),
fetchBorrowers:()=>dispatch(studentAction.fetchBorrowers()),
fetchTeacherList:()=> dispatch(teachersAction.fetchList()),
fetchTeacherBorrowers:()=> dispatch(teachersAction.fetchBorrowers()),
fetchBooks:()=> dispatch(booksAction.fetchList()),
fetchBorrowedBooks:()=>dispatch(booksAction.fetchBorrowed() ) ,
fetchRecords:()=>dispatch(studentAction.fetchRecords() ),
fetchTeacherRecord:()=>dispatch(teachersAction.fetchTeacherRecords())
  }
} 
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Main));