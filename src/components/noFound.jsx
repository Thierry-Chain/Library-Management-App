import React from 'react'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'

function NotFound() {
    const auth = useSelector(state => state.user.auth)
    const redirect=auth ? <NavLink className="btn btn-md btn-info" to="/loggedIn">Back to Home</NavLink> : <NavLink className="btn btn-md btn-info" to="/">Back to Home</NavLink>;
    return (
        <div className="mt-5">
           <p> Page not found <br/></p>
    <p className="w-50">{redirect}</p>
        </div>
    )
}

export default NotFound
