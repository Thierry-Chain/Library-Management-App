/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  UncontrolledAlert,
} from 'reactstrap'
import Loading from '../loading'
import { connect } from 'react-redux'
import moment from 'moment'
import * as bookActions from '../../../redux/books/actions'
import ConnectionFail from '../connectionError'
import {
  BiAddToQueue,
  BiMessageSquareAdd,
  BiSearchAlt,
  BiTaskX,
  BiTrashAlt,
  BiEditAlt,
} from 'react-icons/bi'

class BookList extends Component {
  state = {
    search: '',
    modal: false,
    bookType: '',
    numOfBooks: '',
    trash: '',
    editBookType: '',
    editNumOfBooks: '',
    modalEdit: false,
    modalDelete: false,
    bookId: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.books.length < this.props.books.length) {
      this.toggle()
      this.setState({ bookType: '', numOfBooks: '' })
    }
  }

  /*componentWillUnmount() {
    this.props.clean()
  }*/

  handleChange = (e) => {
    this.setState({ search: e.target.value })
  }
  handleAllChanges = (e) => {
    let { name, value } = e.target
    this.setState({ [name]: value })
  }
  putInTrash = (id) => {
    this.setState({ trash: id })
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      bookType: '',
      numOfBooks: '',
    })
    this.props.clean()
  }
  toggleEdit = () => {
    this.setState({ modalEdit: !this.state.modalEdit })
  }

  toggleDelete = () => {
    this.setState({ modalDelete: !this.state.modalDelete })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { bookType, numOfBooks } = this.state
    const data = { typeOfBooks: bookType, numOfBooks }
    this.props.createNewBook(data)
    // this.setState({ bookType: '', numOfBooks: '' })
  }

  handleDelete = () => {
    const bookId = this.state.trash
    this.props.deleteBook(bookId)
    this.toggleDelete()
  }

  handleEdit = (e) => {
    e.preventDefault()
    const { editBookType, editNumOfBooks } = this.state
    const data = { typeOfBooks: editBookType, numOfBooks: editNumOfBooks }
    const bookId = this.state.bookId
    this.props.editBook(data, bookId)
    this.toggleEdit()
  }

  render() {
    const errorMessage = this.props.error ? (
      <UncontrolledAlert color="danger" className="text-center">
        {this.props.error}
      </UncontrolledAlert>
    ) : null
    const list = this.props.books
    let filteredData
    list.length
      ? (filteredData = list.filter((book) => {
          return (
            book.typeOfBooks
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1
          )
        }))
      : (filteredData = [])
    let table = filteredData.length ? (
      <table
        className="table table-bordered table-responsive w-100"
        id="myTable"
      >
        <thead className="w-100">
          <tr className="w-100">
            <th scope="col" className="w-0 text-nowrap">
              Book-type
            </th>
            <th scope="col" className="w-0">
              Number
            </th>
            <th scope="col" className="w-0">
              Date
            </th>
            <th scope="col" className="w-2">
              Action
            </th>
            <th scope="col" className="w-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((book) => {
            return (
              <tr key={book._id}>
                <td className="p-1">{book.typeOfBooks}</td>
                <td className="p-1">{book.numOfBooks}</td>
                <td className="p-1">{moment(book.date).format('L')}</td>

                <td
                  className="py-1 text-nowrap"
                  onClick={() => {
                    this.toggleEdit()
                    this.setState({
                      editNumOfBooks: book.numOfBooks,
                      editBookType: book.typeOfBooks,
                      bookId: book._id,
                    })
                  }}
                >
                  <button className="btn btn-outline-primary w-100 py-0">
                    <i>
                      <BiEditAlt />
                    </i>
                    Edit
                  </button>
                </td>

                <td
                  onClick={() => {
                    this.putInTrash(book._id)
                    this.toggleDelete()
                  }}
                  className="py-1 text-nowrap"
                >
                  <button className="btn btn-outline-danger w-100 py-0">
                    <i>
                      <BiTaskX />
                    </i>
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    ) : (
      <div className="w-100 text-center">
        <Alert className="text-center text-big text-dark" color="danger">
          {' '}
          No book found !!
        </Alert>
      </div>
    )

    let allTable = this.props.loading ? (
      <Loading />
    ) : (
      <div className="row">{table}</div>
    )

    return (
      <section className="mt-5 mt-body bg-pc">
        {this.props.connectionError ? (
          <ConnectionFail />
        ) : (
          <React.Fragment>
            <div className="bg-secodary pt-2 head">
              <div className="d-flex bg-head justify-content-center font-f">
                <p className="text-center text-dark h2">
                  Books List{' '}
                  <span
                    onClick={this.toggle}
                    title="Add New book"
                    className="ml-1 badge badge-warning dropdown-pointer add"
                  >
                    {' '}
                    Add{' '}
                    <i>
                      <BiMessageSquareAdd />
                    </i>
                  </span>
                </p>
              </div>
              <p className="w-50 mx-auto p-line bg-line"></p>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-11 col-sm-5 py-2 m-auto">
                  <label className="sr-only" htmlFor="inlineFormInputGroup">
                    Search ...
                  </label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      value={this.state.search}
                      className="form-control bg-light"
                      onChange={this.handleChange}
                      id="inlineFormInputGroup"
                      placeholder="Search ..."
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i>
                          <BiSearchAlt />
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                {errorMessage}
                {allTable}
              </div>
            </div>
            <Modal
              name="addNewBook"
              isOpen={this.state.modal}
              toggle={this.toggle}
            >
              <ModalHeader toggle={this.toggle}>Add new book</ModalHeader>
              <form onSubmit={this.handleSubmit}>
                <ModalBody>
                  {errorMessage}
                  <div className="row">
                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="bookType"
                        value={this.state.bookType}
                        required
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Book Type"
                      />
                    </div>
                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="numOfBooks"
                        value={this.state.numOfBooks}
                        required
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Number of Books"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button type="submit" className="btn btn-md btn-success">
                    <b>
                      <i>
                        <BiAddToQueue />
                      </i>
                      Add
                    </b>
                  </button>
                  <Button color="danger" onClick={this.toggle}>
                    <b>
                      <i>
                        <BiTaskX />
                      </i>
                      Abort
                    </b>
                  </Button>
                </ModalFooter>
              </form>
            </Modal>

            <Modal
              name="deleteBook"
              isOpen={this.state.modalDelete}
              toggle={this.toggleDelete}
            >
              <ModalHeader toggle={this.toggleDelete}>
                Are You Sure To Delete ?
              </ModalHeader>

              <div className="text-center">
                <Alert color="danger">
                  <p className="text-b">
                    This can be danger when you book that is borrowes that can
                    couse looses
                  </p>
                </Alert>
              </div>
              <div className="d-flex my-5 mx-3 text-big">
                <button
                  onClick={this.handleDelete}
                  className="btn btn-md pull-left btn-success mr-2 w-75"
                >
                  <i>
                    <BiTrashAlt />
                  </i>
                  Delete
                </button>
                <button
                  type="button"
                  onClick={this.toggleDelete}
                  className="btn btn-md pull-right btn-danger ml-2 w-75"
                >
                  <i>
                    <BiTaskX />
                  </i>
                  Abort
                </button>
              </div>
            </Modal>

            <Modal
              name="Edit"
              isOpen={this.state.modalEdit}
              toggle={this.toggleEdit}
            >
              <ModalHeader toggle={this.toggleEdit}>Edit book</ModalHeader>
              <form onSubmit={this.handleEdit}>
                <ModalBody>
                  {errorMessage}
                  <div className="row">
                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="editBookType"
                        value={this.state.editBookType}
                        required
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Book Type"
                      />
                    </div>
                    <div className="col-11 mx-auto col-sm-6 my-2">
                      <input
                        name="editNumOfBooks"
                        value={this.state.editNumOfBooks}
                        required
                        onChange={this.handleAllChanges}
                        type="text"
                        className="form-control"
                        placeholder="Number of Books"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button type="submit" className="btn btn-md btn-success">
                    <b>Save</b>
                  </button>
                  <Button color="danger" onClick={this.toggleEdit}>
                    <b>Cancel</b>
                  </Button>
                </ModalFooter>
              </form>
            </Modal>
          </React.Fragment>
        )}
      </section>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    connectionError: state.students.connectionError,
    auth: state.user.auth,
    books: state.books.list,
    loading: state.books.loadingList,
    error: state.books.errors,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createNewBook: (data) => dispatch(bookActions.addNewBookToDb(data)),
    editBook: (data, bookId) =>
      dispatch(bookActions.editBookData(data, bookId)),
    deleteBook: (bookId) => dispatch(bookActions.deleteBook(bookId)),
    clean: () => dispatch(bookActions.clearErros()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookList)
