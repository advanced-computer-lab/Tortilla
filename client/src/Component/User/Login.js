import axios from 'axios';
import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [Message, setMessage] = useState("");

    function login(){
        if(email || password){
            axios.post("http://localhost:8000/login", {
                email: email,
                password: password,
            }).then((response) => {
                localStorage.setItem('user-token', response.data.token);
                window.location.href = '/';
            }).catch((err) => {
                setMessage("Wrong username or password");
            })
        }else{
            setMessage("Empty fields are required");
        }
      
    }

    return (
        <div className = "login">
            <h1>Login</h1>
            <br/>
            <br/>
            <labe>Email</labe>
            <br />
            <input className="SearchBox" type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br />
            <labe>Password</labe>
            <br />
            <input className="SearchBox" type="text" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
            <br />
            <br/>
            <button className="btn" onClick={login}> Sign in </button>
            <br/>
            <br/>
            <h2>{Message}</h2>
        </div>
    )
}

export default Login;
