import React from 'react'
import { Link } from 'react-router-dom'

function User() {

    return (
        <div className="user">
            <div className="editLink">
                <Link to="/editUserInfo"> Edit Your Information </Link>
                <br />
                <br />
                <Link to="/availableFlights"> Book Now </Link>
                <br />
                <br />
                <Link to="/Summery"> MyFlights </Link>

            </div>
        </div>
    )
}

export default User
