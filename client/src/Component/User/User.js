import React from 'react'
import { Link } from 'react-router-dom'

function User() {

    return (
        <div className="user">
            <div className = "editLink">
                <Link to="/editUserInfo"> Edit Your Information </Link>

                <Link to="/availableFlights"> Book Now </Link>
            </div>
        </div>
    )
}

export default User
