import axios from 'axios';
<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> safar
import './ReservedFlights.css'

function ReservedFlights() {

<<<<<<< HEAD
    const [email, setEmail] = useState("");
    const [reservedFlights, setReservedFlights] = useState([]);

    console.log(email);

    function getReservedFlights() {
        axios.get(`http://localhost:8000/getReservedFlights${email}`)
            .then((res) => {
                setReservedFlights(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function cancelReservation(id) {
        axios.post('http://localhost:8000/cancelChosenFlight', { id: id, email: email })
=======
    const [reservedFlights, setReservedFlights] = useState([]);
    const [Message, setMessage] = useState("");
    const [seatsList, setSeatsList] = useState([]);

    const userToken = localStorage.getItem("user-token");

    useEffect(() => {
        axios.get(`http://localhost:8000/getReservedFlights${userToken}`)
            .then((res) => {
                setReservedFlights(res.data.flights);
                setSeatsList(res.data.Seats);
                if (!res.data.flights) {
                    setMessage('No flights yet to show');
                }
            })
            .catch((err) => {
                setMessage('No flights yet to show');
            })
    }, [])

    function cancelReservation(id) {
        axios.post('http://localhost:8000/cancelReservedFlight', { id: id, token: userToken })
>>>>>>> safar
            .then(() => {
                setReservedFlights(reservedFlights.filter((val) => {
                    return val._id !== id;
                }))
<<<<<<< HEAD
            })
            .then((res) => {
                axios.post('http://localhost:8000/sendCancelationEmail', { id: id, email: email })
                    .then((res) => {
                        console.log(res.data);
=======

                if (!reservedFlights.length) {
                    setMessage('No flights yet to show');
                }
            })
            .then((res) => {
                axios.post('http://localhost:8000/sendCancelationEmail', { id: id, token: userToken })
                    .then((res) => {
                        setMessage('Canceled, Please check your email');
>>>>>>> safar
                    })
            })
            .catch((err) => {
                console.log(err);
            });
    }

<<<<<<< HEAD

    return (
        <div>
            <input className ="SearchBox" type="email" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br />

            <button className="btn" onClick={getReservedFlights} > Show </button>

=======
    function sendEmail(id) {
        axios.post('http://localhost:8000/sendEmail', { id: id, token: userToken })
            .then((res) => {
                setMessage('Email sent, Please check your email');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function removeSeat(seat, classtype, flightId) {
        axios.post('http://localhost:8000/removeSeat', {
            seat: seat,
            classtype: classtype,
            flightId: flightId,
            token: userToken
        }).then(() => {
            window.location.href = '/reservedFlights';
        }).catch((err) => {
            console.log(err);
        })
    }


    function chooseSeats(id) {
        axios.post('http://localhost:8000/PostID', {
            FlightID: id,
            token: userToken
        }).then(() => {
            window.location.href = '/Seats';
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Your Reserved Flights</h1>
            <br />
            <br />
            <h2>{Message}</h2>
            <br />
            <br />
>>>>>>> safar
            {reservedFlights.map(flight => {
                const ArrivalDateAndTime = new Date(flight.ArrivalDateAndTime);
                const DepartureDateAndTime = new Date(flight.DepartureDateAndTime);
                const tripDuration = (ArrivalDateAndTime - DepartureDateAndTime) / (1000 * 60 * 60);
                return (
                    <h3 key={flight._id}>
                        <table className="listTable">
<<<<<<< HEAD
                            <li>Flight Type : <span> {flight.FlightType} </span> </li>
                            <li>FlightNumber : <span> {flight.FlightNumber} </span> </li>
                            <li>DepartureDateAndTime :<span> {flight.DepartureDateAndTime}</span></li>
                            <li>ArrivalDateAndTime :<span> {flight.ArrivalDateAndTime}</span></li>
                            <li>NumberOfEconomySeats :<span> {flight.NumberOfEconomySeats}</span> </li>
                            <li>NumberOfBusinessClassSeats :<span> {flight.NumberOfBusinessClassSeats}</span></li>
                            <li>Airport :<span> {flight.Airport}</span></li>
                            <li>ArrivalAirport :<span> {flight.ArrivalAirport}</span></li>
                            <li>TripDuration In Hours:<span> {Math.floor(tripDuration)}</span></li>
                            <li>Price :<span> {flight.Price}</span> </li>
                            <li>BaggageAllowance In Kg :<span> {flight.BaggageAllowance}</span></li>
=======
                            <tr>
                                <th>Flight Type </th>
                                <th>DepartureDateAndTime </th>
                                <th>ArrivalDateAndTime</th>
                                <th>Economy Seats</th>
                                <th>Business Seats</th>
                                <th>Airport </th>
                                <th>Arrival Airport </th>
                                <th>Trip Duration In Hours</th>
                                <th>Price</th>
                                <th>Baggage Allowance In Kg </th>
                            </tr>
                            <tr>
                                <td>{flight.FlightType} </td>
                                <td>{flight.DepartureDateAndTime} </td>
                                <td>{flight.ArrivalDateAndTime} </td>
                                <td>{flight.NumberOfEconomySeats} </td>
                                <td>{flight.NumberOfBusinessClassSeats} </td>
                                <td>{flight.Airport} </td>
                                <td>{flight.ArrivalAirport} </td>
                                <td>{Math.floor(tripDuration)} </td>
                                <td>{flight.Price} </td>
                                <td>{flight.BaggageAllowance} </td>
                            </tr>
                            <br />
                            <td>Seat Number<br /> {seatsList.map((seat) => {
                                if (seat.id === flight._id) {
                                    return (
                                        <tr>
                                            <td>{seat.Seat}</td>
                                        </tr>
                                    )
                                }
                            })}</td>

                            <td>Class Type {seatsList.map((seat) => {
                                if (seat.id === flight._id) {
                                    return (
                                        <tr>
                                            <td>{seat.classtype}</td>
                                            <button onClick={() => removeSeat(seat.Seat, seat.classtype, flight._id)}> remove seat </button>
                                        </tr>
                                    )
                                }
                            })}
                            </td>
                            <br />
                            <br />
>>>>>>> safar
                            <button className="button" onClick={() => {
                                var result = window.confirm("Are You Sure Want to cancel?");
                                if (result) {
                                    cancelReservation(flight._id);
                                }
                            }}> Cancel Reservation </button>
<<<<<<< HEAD
=======
                            <button className="button" onClick={() => { sendEmail(flight._id) }}> Send me email with reservation details</button>
                            <button className="button" onClick={() => { chooseSeats(flight._id) }}> Choose another Seat </button>
>>>>>>> safar
                        </table>
                    </h3>
                )
            })}
<<<<<<< HEAD
        </div>
=======
        </div >
>>>>>>> safar
    )
}

export default ReservedFlights;
