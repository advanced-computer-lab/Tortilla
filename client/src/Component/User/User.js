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
                <Link to="/reservedFlights">Go to My Reserved Flights </Link>
                <br />
                <br />
                <Link to="/Summary">Go to My Chosen Flights </Link>
            </div>
        </div>
    )
}

export default User
