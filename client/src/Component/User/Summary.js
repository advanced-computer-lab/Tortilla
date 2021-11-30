import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Seats() {
    const [EcoSeats, setEcoSeats] = useState();
    const [BusSeats, setBusSeats] = useState();
    const [email, setemail] = useState();


    useEffect(() => {
        var FlightID;

        axios.get('http://localhost:8000/PostID&Email')
            .then((response) => {
                FlightID = (response.data.F_ID);
                setemail(response.data.UserEmail);

            }).then((err) => {
                axios.post('http://localhost:8000/GetFlight', {
                    fid: FlightID,
                    Email: email
                }).then((response) => {
                    setEcoSeats(response.data.NumberOfEconomySeats);
                    setBusSeats(response.data.NumberOfBusinessClassSeats);

                }).catch(err => {
                    console.log(err);
                })
            }).catch((err) => {

            })
    }, []);

    function clicked(i, classtype) {
        axios.post('http://localhost:8000/SetSeats', {
            number: i,
            email: email,
            classtype: classtype
        }).then((response) => {
        }).catch(err => {
            console.log(err);
        })

    }


    return (
        <div>
            <h1> Business Class </h1>

            <div>
                {
                    [...Array(BusSeats)].map((e, i) => <span key={i}>{<button onClick={() => clicked(i + 1, "Business")}> {i + 1} </button>}</span>)

                }
            </div>


            <h1> Economy Class </h1>

            <div>
                {
                    [...Array(EcoSeats)].map((e, i) => <span key={i}>{<button onClick={() => clicked(i + 1, "Economy")} > {i + 1} </button>}</span>)

                }
            </div>




        </div>
    )
}

export default Seats;