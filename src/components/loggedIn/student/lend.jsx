/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import * as studentActions from 'redux/students/actions'
import ConnectionFail from '../connectionError'

class Lend extends Component {
  state = {
    bookType: '',
    bookId: '',
    bookName: '',
    $bookType: '',
    $bookId: '',
    $bookName: '',
    $$bookType: '',
    $$bookId: '',
    $$bookName: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.borrowersList.length < this.props.borrowersList.length) {
      this.props.history.push('/loggedIn/studentList')
    }
  }

  handleSubmitOneBook = (e) => {
    e.preventDefault()
    let {
      $$bookType: bookType,
      $$bookId: bookId,
      $$bookName: bookName
    } = this.state
    const data = {
      bookType,
      bookId,
      bookName
    }
    const studentId = this.props.match.params.studentId
    this.props.lendBook(data, studentId)
  }

  handleAllChanges = (e) => {
    let { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmitTwoBooks = (e) => {
    e.preventDefault()
    let {
      bookType,
      bookId,
      bookName,
      $bookType,
      $bookId,
      $bookName
    } = this.state
    const data = {
      bookType,
      bookId,
      bookName,
      $bookType,
      $bookId,
      $bookName
    }
    const studentId = this.props.match.params.studentId
    this.props.lendBook(data, studentId)
    //console.log(bookType,bookId,bookName,$bookType,$bookId,$bookName)
  }
  render() {
    const bookRemaining = Number(this.props.match.params.lend)
    const errorMessage = this.props.error ? (
      <Alert color="danger">{this.props.error}</Alert>
    ) : null
    const allData =
      bookRemaining === 2 ? (
        <section>
          <form onSubmit={this.handleSubmitTwoBooks}>
            <div className="d-flex h3 text-center py-2">
              <p className="m-auto text-info font-f">
                Lending books to the student
              </p>
            </div>

            <div className="m-auto d-flex text-center py-2">
              <p className="m-auto text-info font-f">
                <button
                  className="mx-auto btn btn-info btn-md w-100 px-5"
                  type="submit"
                >
                  Lend
                </button>
              </p>
            </div>
            {errorMessage}
            <div className="border shadow-lg shadow-danger height-100">
              <div className="row height-100">
                <div className="col-11 col-sm-10 col-lg-5 m-auto shadow-lg p-3 my-5 bg-light rounded">
                  <p className="text-big text-center">
                    <b> Book 1 </b>
                  </p>
                  <div className="row">
                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="bookName"
                        value={this.state.bookName}
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Book Name"
                      />
                    </div>

                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="bookId"
                        value={this.state.bookId}
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Book Id"
                      />
                    </div>

                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="bookType"
                        value={this.state.bookType}
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Book Type"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-11 col-sm-10 col-lg-5 m-auto shadow-lg p-3 my-5 bg-light rounded">
                  <p className="text-big text-center">
                    <b>Book 2</b>
                  </p>
                  <div className="row">
                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="$bookName"
                        value={this.state.$bookName}
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Book Name"
                      />
                    </div>

                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="$bookId"
                        value={this.state.$bookId}
                        onMouseUp={this.handleAllChanges}
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Book Id"
                      />
                    </div>

                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="$bookType"
                        value={this.state.$bookType}
                        onMouseUp={this.handleAllChanges}
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Book Type"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      ) : (
        <section>
          <form onSubmit={this.handleSubmitOneBook}>
            <div className="d-flex h3 text-center py-2">
              <p className="m-auto text-info font-f">
                Lending books to the student
              </p>
            </div>
            <div className="m-auto d-flex text-center py-2">
              <p className="m-auto text-info font-f">
                <button
                  className="mx-auto btn btn-info btn-md w-100 px-5 "
                  type="submit"
                >
                  Lend
                </button>
              </p>
            </div>
            {errorMessage}
            <div className="border shadow-lg shadow-danger height-100">
              <div className="row height-100">
                <div className="col-11 col-md-7 col-lg-6 m-auto shadow-lg p-3 my-5 bg-light rounded">
                  <p className="text-big text-center">
                    <b> Book 2 </b>
                  </p>
                  <div className="row">
                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="$$bookName"
                        value={this.state.$$bookName}
                        required
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Book Name"
                      />
                    </div>

                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="$$bookId"
                        value={this.state.$$bookId}
                        required
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Book Id"
                      />
                    </div>

                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="$$bookType"
                        value={this.state.$$bookType}
                        required
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Book Type"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>{' '}
          </form>
        </section>
      )

    return (
      <section className="mt-body">
        {this.props.connectionError ? (
          <ConnectionFail />
        ) : (
          <React.Fragment>
            <div className="container-fluid">{allData}</div>
          </React.Fragment>
        )}
      </section>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    connectionError: state.students.connectionError,
    borrowersList: state.students.borrowers,
    studentList: state.students.list,
    error: state.students.errors
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    lendBook: (data, studentId) =>
      dispatch(studentActions.lendbook(data, studentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lend)
