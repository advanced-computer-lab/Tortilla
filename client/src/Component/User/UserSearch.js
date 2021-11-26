import axios from 'axios';
import React, { useState } from 'react';

function UserSearch() {

    const [ArrivalDateAndTime, setArrivalDateAndTime] = useState();
    const [DepartureDateAndTime, setDepartureDateAndTime] = useState();
    const [SearchList, setSearchList] = useState([]);

    function Search() {
        axios.get('http://localhost:8000/getAllAvailableFlights')
            .then((response) => {
                setSearchList(response.data);
                console.log(response.data)
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
            <input type='datetime-local' onChange={e => {
                setDepartureDateAndTime(e.target.value);
            }} />

            <br />
            <br />
            <label>ArrivalDateAndTime</label>
            <br />
            <input type='datetime-local' onChange={e => {
                setArrivalDateAndTime(e.target.value);
            }} />
            <br />
            <br />
            <button onClick={Search}> Search </button>

            <br />
            <br />
            <h1> Search Results </h1>
            <div>
                {
                    SearchList.filter((val) => {
                        return val.ArrivalDateAndTime <= ArrivalDateAndTime || val.DepartureDateAndTime >= DepartureDateAndTime;
                    }).map((flight) => {
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
                                <button onClick={() => {
                                    var result = window.confirm("Are You Sure Want to delete?");
                                    if (result) {
                                        BookFlight(flight._id);
                                    }
                                }}> Book flight </button>
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
