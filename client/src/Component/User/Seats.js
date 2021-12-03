import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Seats() {
    const [EcoSeats, setEcoSeats] = useState([]);
    const [BusSeats, setBusSeats] = useState([]);
    const [email, setemail] = useState();
    let FlightID;

    useEffect(() => {

        axios.get('http://localhost:8000/PostID&Email')
            .then((response) => {
                FlightID= (response.data.F_ID);
                setemail(response.data.UserEmail);
               // console.log(FlightID)
            }).then((err) => {
                axios.post('http://localhost:8000/GetFlight', {
                    fid: FlightID,
                    Email: email
                }).then((response) => {
                     setEcoSeats(response.data.EcoSeats);
                     setBusSeats(response.data.BusSeats);
                  console.log(response.data.EcoSeats)

                }).catch(err => {
                    console.log(err);
                })
            }).catch((err) => {

            })
    }, []);
   // console.log(FlightID)
    function clicked(i,e, classtype) {
        console.log(i);
        axios.post('http://localhost:8000/SetSeats', {
            seat: e,
            number: i,
            email: email,
            classtype: classtype
        }).then((response) => {
        }).catch(err => {
            console.log(err);
        })

    }

    function done(){
        window.location.href = '/Summary';

    }

console.log(BusSeats)
    return (
        <div>
            <h1> Business Class </h1>

            <div>
                {
                   
                   BusSeats.map((e, i) => <span key={i}>{<button className="btn" onClick={() => clicked(i,e, "Business")}> {e} </button>}</span>)

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