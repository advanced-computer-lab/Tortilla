import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Seats() {
    const [EcoSeats, setEcoSeats] = useState([]);
    const [BusSeats, setBusSeats] = useState([]);
<<<<<<< HEAD
    const [email, setemail] = useState();
    let FlightID;

    useEffect(() => {

        axios.get('http://localhost:8000/PostID&Email')
            .then((response) => {
                FlightID = (response.data.F_ID);
                setemail(response.data.UserEmail);
            }).then((err) => {
                axios.post('http://localhost:8000/GetFlight', {
                    fid: FlightID,
                    Email: email
=======
    let FlightID;
    const userToken = localStorage.getItem("user-token");

    useEffect(() => {
        axios.get('http://localhost:8000/GetID')
            .then((response) => {
                FlightID = (response.data.F_ID);
            }).then((err) => {
                axios.post('http://localhost:8000/GetFlight', {
                    fid: FlightID,
>>>>>>> safar
                }).then((response) => {
                     setEcoSeats(response.data.EcoSeats);
                     setBusSeats(response.data.BusSeats);
                }).catch(err => {
                    console.log(err);
                })
            }).catch((err) => {
<<<<<<< HEAD
                console.log(err);
            })
    }, []);

    function clicked(i,e, classtype) {
        axios.post('http://localhost:8000/SetSeats', {
            seat: e,
            number: i,
            email: email,
            classtype: classtype
        }).then((response) => {
            window.location.href = '/Summary';
=======

            })
    }, []);

    function clicked(i, e, classtype) {
        axios.post('http://localhost:8000/SetSeats', {
            seat: e,
            number: i,
            token: userToken,
            classtype: classtype
        }).then((response) => {
            
>>>>>>> safar
        }).catch(err => {
            console.log(err);
        })

    }

    function done(){
        window.location.href = '/Summary';
    }

<<<<<<< HEAD
console.log(BusSeats)
=======
>>>>>>> safar
    return (
        <div>
            <h1> Business Class </h1>

            <div>
                {
                   
<<<<<<< HEAD
                   BusSeats.map((e, i) => <span key={i}>{<button className="btn" onClick={() => clicked(i,e, "Business")}> {e} </button>}</span>)
=======
                   BusSeats.map((e, i) => <span key={i} >{<button className = "btn" onClick={() => clicked(i,e, "Business")}> {e} </button>}</span>)
>>>>>>> safar

                }
            </div>


            <h1> Economy Class </h1>

            <div>
                {
<<<<<<< HEAD
                     EcoSeats.map((e, i) => <span key={i}>{<button className="btn" onClick={() => clicked(i,e, "Economy")} > {e} </button>}</span>)
=======
                    EcoSeats.map((e, i) => <span key={i}>{<button className="btn" onClick={() => clicked(i,e, "Economy")} > {e} </button>}</span>)
>>>>>>> safar

                }
            </div>


                <br/>
                <br/>
                <br/>
                <button className="btn" onClick={done}> Done </button>

        </div>
    )
}

export default Seats;