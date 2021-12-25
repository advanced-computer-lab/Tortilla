import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './update.css';

function Administrator() {
    const [FlightNumberUpdate, setFlightNumberUpdate] = useState();
    const [ArrivalDateAndTimeUpdate, setArrivalDateAndTimeUpdate] = useState();
    const [DepartureDateAndTimeUpdate, setDepartureDateAndTimeUpdate] = useState();
    const [NumberOfEconomySeatsUpdate, setNumberOfEconomySeatsUpdate] = useState("");
    const [NumberOfBusinessClassSeatsUpdate, setNumberOfBusinessClassSeatsUpdate] = useState("");
    const [AirportUpdate, setAirportUpdate] = useState("");

    const [SearchFlight, setSearchFlight] = useState("");
    const [SearchAirport, setSearchAirport] = useState("");
    const [SearchEconomy, setSearchEconomy] = useState("");
    const [SearchBusiness, setSearchBusiness] = useState("");

    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/getAllAvailableFlights')
            .then((response) => {
                setList(response.data);
            }).catch(err => {
                console.log(err);
            })
    }, []);


    function deleteFlight(id) {
        axios.post('http://localhost:8000/deleteFlight', { id: id, Admin: 'Administrator' })
            .then(() => {
                setList(list.filter((val) => {
                    return val._id !== id;
                }))
            });
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
            .then(() => {
                window.location.href = '/';
            });
    }

    return (

        <div className='Adminstartor'>

            <br />
            <br /><button className="button" onClick={() => {window.location.href="/create"}}> Create flight </button>
            <br />
            <br />
            
            
            <input className ="SearchBox"type='text' placeholder='Search Flight...' onChange={e => {
                setSearchFlight(e.target.value);
            }} />
            <br />
            <br />
            <input className ="SearchBox" type='text' placeholder='Search Airport...' onChange={e => {
                setSearchAirport(e.target.value);
            }} />
            <br />
            <br />
            <input className ="SearchBox" type='text' placeholder='Search Economy...' onChange={e => {
                setSearchEconomy(e.target.value);
            }} />
            <br />
            <br />
            <input className ="SearchBox" type='text' placeholder='Search Business...' onChange={e => {
                setSearchBusiness(e.target.value);
            }} />
            <br />
            <br />
            <h1> Available Flights </h1>
            <br />
            <br />
            <table>

            <tbody>
            {list.filter((val) => {
                const FlightNumber = val.FlightNumber + "";
                const Airport = val.Airport + "";
                const NumberOfEconomySeats = val.NumberOfEconomySeats + "";
                const NumberOfBusinessClassSeats = val.NumberOfBusinessClassSeats + "";
                if (
                    FlightNumber.includes(SearchFlight)
                    && Airport.includes(SearchAirport)
                    && NumberOfEconomySeats.includes(SearchEconomy)
                    && NumberOfBusinessClassSeats.includes(SearchBusiness)
                ) { return val }
            }).map(flight => {
                return (
                        <div className='list'>
                        <div key={flight._id}>
                        <table>

                            <tr>
                            <th>Flight Type </th>
                            <th>Flight Number </th>
                            <th>Departure Date <br/> </th>
                            <th>Arrival Date <br/> </th>
                            <th>Economy Class Seats </th>
                            <th>Business Class Seats </th>
                            <th>Departure Airport </th>
                            <th>Arrival Airport </th>
                            <th>Trip Duration </th>
                            <th>Price </th>
                            <td> <button className="button" onClick={() => {
                                var result = window.confirm("Are You Sure Want to delete?");
                                if (result) {
                                    deleteFlight(flight._id);
                                }
                            }}> Delete flight </button> </td>
                            </tr>
                            <tr>
                                            <td>{flight.FlightNumber}</td>
                                            <td>{flight.DepartureDateAndTime}</td>
                                            <td>{flight.ArrivalDateAndTime}</td>
                                            <td>{flight.NumberOfEconomySeats}</td>
                                            <td>{flight.NumberOfBusinessClassSeats}</td>
                                            <td>{flight.Airport}</td>
                                            <td>{flight.ArrivalAirport}</td>
                                            <td>{flight.TripDuration}</td>
                                            <td>{flight.Price}</td>
                                           
                            </tr>
                            </table>

                        </div>
                        <br />
                        <br />

                        <div className='update'>
                            <label>ArrivalDateAndTime</label>
                            <br />
                        <br />
                            <input className ="SearchBox" type='datetime-local' onChange={e => {
                                setArrivalDateAndTimeUpdate(e.target.value);
                            }} />
                         <br />
                         <br />

                            <label>DepartureDateAndTime</label>
                            <br />
                        <br />
                            <input className ="SearchBox" type='datetime-local' onChange={e => {
                                setDepartureDateAndTimeUpdate(e.target.value);
                            }} />

<br />
                        <br />
                            <input className ="SearchBox" type='text' placeholder='New flight number...' onChange={e => {
                                setFlightNumberUpdate(e.target.value);
                            }} />

<br />
                        <br />
                            <input className ="SearchBox" type='text' placeholder='NumberOfEconomySeats...' onChange={e => {
                                setNumberOfEconomySeatsUpdate(e.target.value);
                            }} />
                        <br />
                        <br />

                            <input className ="SearchBox" type='text' placeholder='NumberOfBusinessClassSeats...' onChange={e => {
                                setNumberOfBusinessClassSeatsUpdate(e.target.value);
                            }} />
                        <br />
                        <br />

                            <input className ="SearchBox" type='text' placeholder='Airport...' onChange={e => {
                                setAirportUpdate(e.target.value);
                            }} />
                                                    <br />
                        <br />
                            <button className="button" onClick={() => {
                                updateFlight(flight._id);
                            }}> Update flight </button>
                                                    <br />
                        <br />
                        </div>
                    </div>

                )
            })}
            </tbody>
            </table>

        </div >
    )
}

export default Administrator;
