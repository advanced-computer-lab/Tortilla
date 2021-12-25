import axios from 'axios';
import React, { useState } from 'react'

function Register() {
    const [email, setEmail] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [telephonenumbers, setTelephonenumbers] = useState([]);


    const [Message, setMessage] = useState("");

    function register() {
        if (email || firstName || lastName || username || password || passportNumber) {
            axios.post("http://localhost:8000/register", {
                email: email,
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                passportNumber: passportNumber,
                homeAddress: homeAddress,
                countryCode: countryCode,
                telephonenumbers: telephonenumbers
            }).then((response) => {
                window.location.href = '/login';
            }).catch((err) => {
                setMessage("Sorry, User already exist");
            })
        } else {
            setMessage("Empty fields are required");
        }
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <br />
            <br />
            <input className="SearchBox" type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="First Name..." onChange={(e) => setfirstName(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Last Name..." onChange={(e) => setlastName(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Passport Number..." onChange={(e) => setPassportNumber(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Home Address..." onChange={(e) => setHomeAddress(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Country Code..." onChange={(e) => setCountryCode(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Telephone Number..." onChange={(e) => setTelephonenumbers(e.target.value)} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
            <br />
            <br />
            <button className="btn" onClick={register}> Sign up </button>
            <br />
            <br />
            <h2>{Message}</h2>
        </div>
    )
}

export default Register;
