import React from 'react'
import { Link } from 'react-router-dom'
import './User.css'
function User() {

    return (
        <div class="textb">
            <h1>Welcome to tortilla airlines</h1>
            <p>You'll love the way we fly!</p>
            <a href="http://localhost:3000/availableFlights" class="button">Book my flight now</a>
        </div>
    )
}

export default User
