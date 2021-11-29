import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Seats() {
    const [FlightID, setFlightID] = useState();
    const [UserEmail, setUserEmail] = useState();


    axios.get('http://localhost:8000/PostID&Email')
    .then((response) => {
        setFlightID(response.data.F_ID);
        setUserEmail(response.data.UserEmail);

          console.log(UserEmail);
       //  console.log(FlightID);

    }).then((err) => {
        axios.post('http://localhost:8000/GetFlight',{
            fid:FlightID,
            Email:UserEmail
        })
                .then((response) => {
                    console.log(response.data);
    
                }).catch(err => {
                    console.log(err);
                })
    }).catch((err)=>{

    })


    return (
        <div>
          
        </div>
    )
}

export default Seats;