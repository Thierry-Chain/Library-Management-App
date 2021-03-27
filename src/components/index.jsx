/* eslint-disable no-unused-vars */
import React from 'react'
import { Jumbotron } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import {
  BiLandscape,
  BiBoltCircle,
  BiLogIn,
  BiUserPlus,
  BiQuestionMark,
} from 'react-icons/bi'
import Footer from './footer'
function FirstPage(props) {
  const login = props.login
  const register = props.register
  return (
    <section className="body-img pt-1">
      <div className="container-fluid p-0">
        <div className="img-fluid top-img"></div>
        <Jumbotron className="mb-0 bg-jumbtron">
          <div className="container">
            <h1 className="display-5 text-primary">
              <i>
                <BiBoltCircle />
              </i>{' '}
              Welcome to smart library management system
            </h1>
            <p className="lead">
              This web application is designed for helping institutions to
              control and manage books smartly.
            </p>
            <hr className="my-2" />
            <p className="text-big mt-2">It is easy to use and efficient.</p>
            <p className="text-big mt-2">
              You can explore more about this app by click button bellow{' '}
            </p>
            <p className="lead pb-0 mt-2">
              <Link
                to="/about"
                className="btn btn-lg btn-gray text-light mx-auto"
              >
                Explore <span className="badge badge-danger pt-1"> More </span>{' '}
                <i>
                  <BiQuestionMark />
                </i>
              </Link>
            </p>
          </div>
        </Jumbotron>
        <div className="container-fluid p-0 m-0 bg-start p-3">
          <div className="pt-3 container border-custom bg-start-new">
            <div className="display-4">
              <h3 className="text-info text-center">
                Getting started with smart library
              </h3>
              <hr className="bg-info mt-1 p-1" />
            </div>
            <div className="display-5">
              <h4 className="text-center">
                <BiLandscape color="#0ca79f" /> <u>Firstly You Must Register</u>
              </h4>
              <p className="text-center lead m-2">
                By registering you will have your own account so that you can
                simply start to use it
              </p>

              <p className="text-center lead m-2">
                Or if you have already registered you can simply login and start
              </p>
              <br />
              <br />
              <h4 className="text-center">
                <u>
                  <BiLandscape color="#0ca79f" /> What happen after logging in ?
                </u>
              </h4>
              <p className="text-center lead m-2">
                You will be able to start creating your virtual library
              </p>
              <p className="text-center lead m-2">Entering books</p>
              <p className="text-center lead m-2">
                Entering students and teacher
              </p>
              <p className="text-center lead m-2">
                And also making operations on students teaches and books also
                whole virtual library
              </p>
              <p className="text-center lead m-2">
                You must keep your virtual library and physical library in sink
                or same
              </p>
              <hr />
              <div className="d-flex justify-content-center m-2 text-bold">
                <button
                  onClick={() => register()}
                  className="btn btn-md btn-outline-info text-big"
                >
                  <b>
                    <i>
                      <BiUserPlus />
                    </i>{' '}
                    Register
                  </b>
                </button>
                <button
                  onClick={() => login()}
                  className="btn btn-md btn-outline-info ml-4 text-big"
                >
                  <b>
                    {' '}
                    <i>
                      <BiLogIn />
                    </i>{' '}
                    Login
                  </b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default withRouter(FirstPage)
