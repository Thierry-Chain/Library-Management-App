/* eslint-disable no-unused-vars */
import React from 'react'
import { BiBarChartAlt } from 'react-icons/bi'
export default function Footer() {
  let year = new Date()
  let today = year.getFullYear()
  return (
    <section className="bg-footer footer">
      <div className="header mx-auto">
        <p className="h3 mx-auto text-center">
          <i>
            <BiBarChartAlt />
          </i>{' '}
          Online library managemet system{' '}
        </p>
        <p className="p-1 bg-light mt-1 w-50 mx-auto"></p>
      </div>
      <br />
      <p className="lead h5 text-monospace text-center">
        This smart library helps you to works efficiently and avoid permanet
        repetitions in writting students who borrows the books instead of one
        time
      </p>
      <div className="w-75 mx-auto text-big text-center p-2 m-1 border bg-secodary border-warning">
        If You have an advice or problem click here and send it{' '}
        <a href="mailto:irambonat0@gmail.com" className="text-warning">
          Notify Us
        </a>{' '}
        Feel free .
      </div>{' '}
      <br />
      <div className="d-flex">
        <strong className="text-big border border-radius text-warning text-center mx-auto p-3 my-1 text-monospace">
          Copyright since 2020 - {today}
        </strong>
      </div>
    </section>
  )
}
