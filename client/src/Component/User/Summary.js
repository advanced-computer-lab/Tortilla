import React, { useEffect, useState } from 'react';
import axios from 'axios';



function Summary() {

    const [email, setEmail] = useState("");
    const [list, setList] = useState([]);


    function View() {
        axios.post('http://localhost:8000/Summary',{
            email:email
        })
            .then((response) => {
                setList(response.data);

            }).catch(err => {
                console.log(err);
            })

    }

    function clicked(id) {
        axios.post('http://localhost:8000/GetIDandEmail', {
            FlightID: id,
            UserEmail: email
        }).then(() => {
            window.location.href = '/Seats';
        }).catch((err) => {
            console.log(err);
        })

    }



    return (
        <div className="Summary">
            <input type="email" placeholder="Enter your Email..." onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br />

            <button onClick={View}> View </button>

            <h1> My Summary </h1>

            <div>
                {
                    list.map((flight) => {
                        return (
                            <div className='list'>
                                <div key={flight._id}>
                                    <li>FlightNumber :{flight.FlightNumber}</li>
                                    <li>ArrivalDateAndTime :{flight.ArrivalDateAndTime}</li>
                                    <li>DepartureDateAndTime :{flight.DepartureDateAndTime}</li>
                                    <li>NumberOfEconomySeats :{flight.NumberOfEconomySeats}</li>
                                    <li>NumberOfBusinessClassSeats :{flight.NumberOfBusinessClassSeats}</li>
                                    <li>Airport :{flight.Airport}</li>
                                    <li>ArrivalAirport :{flight.ArrivalAirport}</li>
                                    <li>TripDuration :{flight.TripDuration}</li>
                                    <li>Price :{flight.Price}</li>
                                    <li>BaggageAllowance In Kg :{flight.BaggageAllowance}</li>
                                </div>
                                <br />
                                <br />
                                <button onClick={() => clicked(flight._id)}> Choose my seats  </button>
                                
                                <br />
                                <br />

                            </div>
                        )
                    })
                }
            </div>




        </div>
    )


}
export default Summary;