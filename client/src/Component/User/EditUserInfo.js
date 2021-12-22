import axios from 'axios';
import React, { useState } from 'react'

function EditUserInfo() {

    const [OldFirstName, setOldFirstName] = useState("");
    const [OldLastName, setOldLastName] = useState("");
    const [NewFirstName, setNewFirstName] = useState("");
    const [NewLastName, setNewLastName] = useState("");
    const [OldPassportNumber, setOldPassportNumber] = useState("");
    const [NewPassportNumber, setNewPassportNumber] = useState("");
    const [NewEmail, setNewEmail] = useState("");
    const [OldPassword, setOldPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");

    var userToken = localStorage.getItem('user-token');

    function EditInfo() {
        axios.put("http://localhost:8000/editUserInfo", {
            token: userToken,
            OldFirstName: OldFirstName,
            OldLastName: OldLastName,
            NewFirstName: NewFirstName,
            NewLastName: NewLastName,
            OldPassportNumber: OldPassportNumber,
            NewPassportNumber: NewPassportNumber,
            NewEmail: NewEmail,
        }).then((response) => {
            window.location.href = '/';
        }).catch((err) => {
            console.log(err);
        })
    }

    function changePassword() {
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
    }

    return (
        <div className="EditUserInfo">
            <input className="SearchBox" type="text" placeholder="Enter old first Name..." onChange={(e) => setOldFirstName(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Enter new first Name..." onChange={(e) => setNewFirstName(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Enter old last Name..." onChange={(e) => setOldLastName(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Enter new last Name..." onChange={(e) => setNewLastName(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Enter old passport number..." onChange={(e) => setOldPassportNumber(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="text" placeholder="Enter new passport number..." onChange={(e) => setNewPassportNumber(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="email" placeholder="Enter new email..." onChange={(e) => setNewEmail(e.target.value)} />
            <br />
            <br />
            <button className="btn" onClick={EditInfo}> Edit </button>
            <br />
            <br />
            <br />
            <br />
            <input className="SearchBox" type="password" placeholder="Enter old password..." onChange={(e) => setOldPassword(e.target.value)} />
            <br />
            <br />
            <input className="SearchBox" type="password" placeholder="Enter new password..." onChange={(e) => setNewPassword(e.target.value)} />
            <br />
            <br />
            <button className="btn" onClick={changePassword}> change password </button>           
        </div>
    )
}

export default EditUserInfo
