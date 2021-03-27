import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Alert, Spinner } from 'reactstrap'
import * as userActions from '../../redux/users/action'
import { withRouter } from 'react-router-dom'
import { BiLogIn, BiXCircle } from 'react-icons/bi'

class Login extends Component {
  state = { email: '', pword: '' }

  componentDidUpdate(prevProps) {
    const previousAuth = prevProps.auth
    const nextAuth = this.props.auth

    if (previousAuth === false && nextAuth === true) {
      this.props.onToggle()
      this.props.history.push('/loggedIn')
      this.props.notify('successfull logged in')
    }
    if (previousAuth === true && nextAuth === false) {
      //this.props.onToggle()
      this.props.history.push('/')
      this.props.notify('successfully logged out')
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let user = { email: this.state.email, password: this.state.pword }
    localStorage.clear()
    this.props.fullLogin(user)
  }

  handleChange = (e) => {
    let { name, value } = e.target

    this.setState({ [name]: value })
  }

  render() {
    let alert = this.props.error ? (
      <Alert color="danger"> {this.props.error} </Alert>
    ) : this.props.connectionError ? (
      <Alert color="danger">Network Error</Alert>
    ) : null

    return (
      <div>
        <Modal
          isOpen={this.props.login}
          toggle={() => {
            this.props.onToggle()
            this.setState({ email: '', pword: '' })
          }}
        >
          <form className="form" onSubmit={this.handleSubmit}>
            <ModalHeader
              toggle={() => {
                this.props.onToggle()
              }}
            >
              <p className="text-center text-info mx-auto">
                <i>
                  <BiLogIn />
                </i>{' '}
                Login Now
              </p>
            </ModalHeader>
            <ModalBody>
              {alert}
              <div className="row">
                <div className="col-11 mt-2 col-md-6 mx-auto">
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="form-control bg-input"
                    placeholder="Email"
                  />
                </div>

                <div className="col-11 mt-2 col-md-6 mx-auto">
                  <input
                    type="password"
                    name="pword"
                    value={this.state.pword}
                    onChange={this.handleChange}
                    className="form-control bg-input"
                    placeholder="Password"
                  />
                </div>
              </div>
            </ModalBody>
            <hr />

            <div className="d-flex justify-content-around p-3">
              <button type="submit" className="btn btn-success btn-md text-big">
                <i>
                  <BiLogIn />
                </i>{' '}
                Login{' '}
                {this.props.loading ? (
                  <Spinner size="sm" color="light" />
                ) : null}
              </button>
              <button
                type="button"
                className="btn btn-warning btn-md text-big"
                onClick={() => {
                  this.props.onToggle()
                  this.setState({ email: '', pword: '' })
                }}
              >
                <i>
                  <BiXCircle />
                </i>{' '}
                Abort
              </button>
            </div>
          </form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    connectionError: state.students.connectionError,
    error: state.user.error,
    auth: state.user.auth,
    loading: state.user.loading,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fullLogin: (user) => dispatch(userActions.fullLogin(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
