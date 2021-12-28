import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChangePassword() {

    const [OldPassword, setOldPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [Message, setMessage] = useState("");

    var userToken = localStorage.getItem('user-token');

    function changePassword() {
        if(OldPassword || NewPassword){
            axios.put("http://localhost:8000/changePassword", {
                token: userToken,
                OldPassword: OldPassword,
                NewPassword: NewPassword
            }).then((response) => {
                var userToken = localStorage.getItem('user-token');
                axios.post("http://localhost:8000/logout", { token: userToken })
                    .then((res) => {
                        localStorage.removeItem('user-token');
                        window.location.href = '/login';
                    }).catch(err => {
                        console.log(err);
                    });
            }).catch((err) => {
                console.log(err);
            })
        }else{
            setMessage('Empty fields required');
        }
       
    }


    return (
        <div>
             <labe>Enter old password</labe>
             <br />
            <input className="SearchBox" type="password" placeholder="Enter old password..." onChange={(e) => setOldPassword(e.target.value)} />
            <br />
            <br />
            <labe>Enter new password</labe>
            <br />
            <input className="SearchBox" type="password" placeholder="Enter new password..." onChange={(e) => setNewPassword(e.target.value)} />
            <br />
            <br />
            <button className="btn" onClick={changePassword}> change password </button>
            <br/>
            <br/>
            <h2>{Message}</h2>
        </div>
    )
}

export default ChangePassword
