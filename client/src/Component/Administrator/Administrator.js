import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
            <br />
            <Link to='/create'> Create Flight</Link>
            <br />
            <br />
            <Link to='/search'> Search For A Flights Time</Link>

            <br />
            <br />

            <input type='text' placeholder='Search Flight...' onChange={e => {
                setSearchFlight(e.target.value);
            }} />
            <br />
            <br />
            <input type='text' placeholder='Search Airport...' onChange={e => {
                setSearchAirport(e.target.value);
            }} />
            <br />
            <br />
            <input type='text' placeholder='Search Economy...' onChange={e => {
                setSearchEconomy(e.target.value);
            }} />
            <br />
            <br />
            <input type='text' placeholder='Search Business...' onChange={e => {
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
                    <h3 key={flight._id}>
                        <tr id='list'>
                            <td>Flight Type {flight.FlightType}</td>
                            <td>Flight Number {flight.FlightNumber}</td>
                            <td>Departure Date <br/> {flight.DepartureDateAndTime}</td>
                            <td>Arrival Date <br/> {flight.ArrivalDateAndTime}</td>
                            <td>Economy Class Seats {flight.NumberOfEconomySeats}</td>
                            <td>Business Class Seats {flight.NumberOfBusinessClassSeats}</td>
                            <td>Departure Airport {flight.Airport}</td>
                            <td>Arrival Airport {flight.ArrivalAirport}</td>
                            <td>Trip Duration {flight.TripDuration}</td>
                            <td>Price {flight.Price}</td>
                            <button className="button" onClick={() => {
                                var result = window.confirm("Are You Sure Want to delete?");
                                if (result) {
                                    deleteFlight(flight._id);
                                }
                            }}> Delete flight </button>
                        </tr>

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
                            <button className="button" onClick={() => {
                                updateFlight(flight._id);
                            }}> Update flight </button>
                        </div>
                    </h3>

                )
            })}
            </tbody>
            </table>

        </div >
    )
}

export default Administrator;
