import axios from 'axios';
import React, { useState } from 'react';
import './UserSearch.css'

function UserSearch() {

    const [ArrivalDateAndTime, setArrivalDateAndTime] = useState();
    const [DepartureDateAndTime, setDepartureDateAndTime] = useState();
    const [SearchList, setSearchList] = useState([]);

    function Search() {
        axios.get('http://localhost:8000/getAllAvailableFlights')
            .then((response) => {
                setSearchList(response.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    function BookFlight(id) {
        axios.post('http://localhost:8000/BookFlight')
            .then(() => {

            });
    }


    return (
        <div className='Search'>

            <label>DepartureDateAndTime</label>
            <br />
            <input className ="SearchBox" type='datetime-local' onChange={e => {
                setDepartureDateAndTime(e.target.value);
            }} />

            <br />
            <br />
            <label>ArrivalDateAndTime</label>
            <br />
            <input className ="SearchBox" type='datetime-local' onChange={e => {
                setArrivalDateAndTime(e.target.value);
            }} />
            <br />
            <br />

            <button className= 'btn' onClick={Search}> Search </button>
                

            <br />
            <br />
            <h1> Search results </h1>
            <br />
            <br />

            <div>
                {
                    SearchList.filter((val) => {
                        return val.ArrivalDateAndTime <= ArrivalDateAndTime || val.DepartureDateAndTime >= DepartureDateAndTime;
                    }).map((flight) => {
                        return (
                            <div className='list'>
                                <div key={flight._id}>
                                    <table>
                                        <tr>
                                    <th>FlightNumber</th>
                                    <th>ArrivalTime</th>
                                    <th>DepartureDateAndTime</th>
                                    <th>NumberOfEconomySeats</th>
                                    <th>NumberOfBusinessClassSeats</th>
                                    <th>Airport</th>
                                    <th>ArrivalAirport</th>
                                    <th>TripDuration</th>
                                    <th>Price</th>
                                    <th>BaggageAllowance</th>
                                        </tr>
                                        <tr>
                                            <td>{flight.FlightNumber}</td>
                                            <td>{flight.ArrivalDateAndTime}</td>
                                            <td>{flight.DepartureDateAndTime}</td>
                                            <td>{flight.NumberOfEconomySeats}</td>
                                            <td>{flight.NumberOfBusinessClassSeats}</td>
                                            <td>{flight.Airport}</td>
                                            <td>{flight.ArrivalAirport}</td>
                                            <td>{flight.TripDuration}</td>
                                            <td>{flight.Price}</td>
                                            <td>{flight.BaggageAllowance}</td>
                                        </tr>
                                    </table>
                                    <br />
                                    <br />
                                    <div className="btn1">
                                    <button className = "btn" onClick={() => {
                                    var result = window.confirm("Are You Sure Want to book this flight?");
                                    if (result) {
                                        BookFlight(flight._id);
                                    }
                                }}> Book flight </button>
                                </div>
                                </div>
                                
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

export default UserSearch;
