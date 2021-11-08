import axios from 'axios';
import React, { useState } from 'react';

function Search() {
    const [FlightNumberUpdate, setFlightNumberUpdate] = useState();
    const [ArrivalDateAndTimeUpdate, setArrivalDateAndTimeUpdate] = useState();
    const [DepartureDateAndTimeUpdate, setDepartureDateAndTimeUpdate] = useState();
    const [NumberOfEconomySeatsUpdate, setNumberOfEconomySeatsUpdate] = useState("");
    const [NumberOfBusinessClassSeatsUpdate, setNumberOfBusinessClassSeatsUpdate] = useState("");
    const [AirportUpdate, setAirportUpdate] = useState("");


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

    function updateFlight(id) {

        axios.put('http://localhost:8000/updateFlight', {
            id: id,
            FlightNumber: FlightNumberUpdate,
            ArrivalDateAndTime: ArrivalDateAndTimeUpdate,
            DepartureDateAndTime: DepartureDateAndTimeUpdate,
            NumberOfEconomySeats: NumberOfEconomySeatsUpdate,
            NumberOfBusinessClassSeats: NumberOfBusinessClassSeatsUpdate,
            Airport: AirportUpdate
        })
    }

    function deleteFlight(id) {
        axios.post('http://localhost:8000/deleteFlight', { id: id, Admin: 'Administrator' })
            .then((response) => {
                setSearchList(SearchList.filter((val) => {
                    return val._id !== id;
                }))
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
                        //console.log(val.ArrivalDateAndTime)
                        console.log(ArrivalDateAndTime)
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
                                </div>
                                <button onClick={() => {
                                    var result = window.confirm("Are You Sure Want to delete?");
                                    if (result) {
                                        deleteFlight(flight._id);
                                    }
                                }}> Delete flight </button>
                                <br />
                                <br />
                                <div className='update'>

                                    <label>ArrivalDateAndTime</label>
                                    <input type='datetime-local' onChange={e => {
                                        setArrivalDateAndTimeUpdate(e.target.value);
                                    }} />


                                    <label>DepartureDateAndTime</label>
                                    <input type='datetime-local' onChange={e => {
                                        setDepartureDateAndTimeUpdate(e.target.value);
                                    }} />


                                    <input type='text' placeholder='New flight number...' onChange={e => {
                                        setFlightNumberUpdate(e.target.value);
                                    }} />


                                    <input type='text' placeholder='NumberOfEconomySeats...' onChange={e => {
                                        setNumberOfEconomySeatsUpdate(e.target.value);
                                    }} />


                                    <input type='text' placeholder='NumberOfBusinessClassSeats...' onChange={e => {
                                        setNumberOfBusinessClassSeatsUpdate(e.target.value);
                                    }} />


                                    <input type='text' placeholder='Airport...' onChange={e => {
                                        setAirportUpdate(e.target.value);
                                    }} />
                                    <button onClick={() => {
                                        updateFlight(flight._id);
                                    }}> Update flight </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Search;
