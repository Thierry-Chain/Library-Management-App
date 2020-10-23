import React, { Component } from 'react'
import moment from 'moment'

class TeachersBorrowers extends Component {
    state = {  }
    render() { 
        return ( <section className="mt-5">
            Teahers list 
            { }
            {console.log(moment().format('LL')) }
        </section> );
    }
}
 
export default TeachersBorrowers;