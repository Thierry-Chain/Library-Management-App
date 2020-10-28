import React from 'react'

function ConnectionError() {
    return (
        <div className="mt-body container border shadow shadow-lg pt-4">
         <p className="h3 text-warning text-center">Connection Problem</p> 
         <div className="text-lead text-big w-75 mx-auto  my-2 ">

         If that address is correct, here are three other things you can try:

    Try again later.
    Check your network connection.
    If you are connected but behind a firewall, check that browser has permission to access the Web.  
         </div>
        </div>
    )
}

export default ConnectionError
