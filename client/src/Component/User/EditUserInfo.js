import axios from 'axios';
import React, { useState } from 'react'

function EditUserInfo() {

    const [OldFirstName, setOldFirstName] = useState("");
    const [OldLasttName, setOldLastName] = useState("");
    const [NewFirstName, setNewFirstName] = useState("");
    const [NewLastName, setNewLastName] = useState("");
    const [OldPassportNumber, setOldPassportNumber] = useState("");
    const [NewPassportNumber, setNewPassportNumber] = useState("");
    const [OldEmail, setOldEmail] = useState("");
    const [NewEmail, setNewEmail] = useState("");

    function EditInfo() {
        axios.put("http://localhost:8000/editUserInfo", {
            OldFirstName : OldFirstName,
            OldLasttName : OldLasttName,
            NewFirstName : NewFirstName,
            NewLastName : NewLastName,
            OldPassportNumber : OldPassportNumber,
            NewPassportNumber : NewPassportNumber,
            OldEmail : OldEmail,
            NewEmail : NewEmail
        }).then((response) => {
            console.log(response.data);
        }).catch((err)=> {
            console.log(err);
        })
    }

    return (
        <div className="EditUserInfo">
            <input type="text" placeholder="Enter old first Name..." onChange={(e) => setOldFirstName(e.target.value)} />
            <input type="text" placeholder="Enter old last Name..." onChange={(e) => setOldLastName(e.target.value)} />

            <input type="text" placeholder="Enter new first Name..." onChange={(e) => setNewFirstName(e.target.value)} />
            <input type="text" placeholder="Enter new last Name..." onChange={(e) => setNewLastName(e.target.value)} />

            <input type="text" placeholder="Enter old passport number..." onChange={(e) => setOldPassportNumber(e.target.value)} />
            <input type="text" placeholder="Enter new passport number..." onChange={(e) => setNewPassportNumber(e.target.value)} />

            
            <input type="email" placeholder="Enter old email..." onChange={(e) => setOldEmail(e.target.value)} />
            <input type="email" placeholder="Enter new email..." onChange={(e) => setNewEmail(e.target.value)} />

            <button onClick={EditInfo}> Edit </button>
        </div>
    )
}

export default EditUserInfo
