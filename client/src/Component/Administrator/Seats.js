import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Seats() {
    const [EcoSeats, setEcoSeats] = useState([]);
    const [BusSeats, setBusSeats] = useState([]);
    let FlightID;
    const userToken = localStorage.getItem("user-token");

    useEffect(() => {
        axios.get('http://localhost:8000/GetID')
            .then((response) => {
                FlightID = (response.data.F_ID);
            }).then((err) => {
                axios.post('http://localhost:8000/GetFlight', {
                    fid: FlightID,
                }).then((response) => {
                     setEcoSeats(response.data.EcoSeats);
                     setBusSeats(response.data.BusSeats);
                }).catch(err => {
                    console.log(err);
                })
            }).catch((err) => {

            })
    }, []);

    function clicked(i, e, classtype) {
        axios.post('http://localhost:8000/SetSeats', {
            seat: e,
            number: i,
            token: userToken,
            classtype: classtype
        }).then((response) => {
            
        }).catch(err => {
            console.log(err);
        })

    }

    function done(){
        window.location.href = '/Summary';
    }

    return (
        <div>
            <h1> Business Class </h1>

            <div>
                {
                   
                   BusSeats.map((e, i) => <span key={i} >{<button className = "btn" onClick={() => clicked(i,e, "Business")}> {e} </button>}</span>)

                }
            </div>


            <h1> Economy Class </h1>

            <div>
                {
                    EcoSeats.map((e, i) => <span key={i}>{<button className="btn" onClick={() => clicked(i,e, "Economy")} > {e} </button>}</span>)

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