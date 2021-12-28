import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ReservedFlights.css'

function ReservedFlights() {

    const [reservedFlights, setReservedFlights] = useState([]);
    const [Message, setMessage] = useState("");
    const [seatsList, setSeatsList] = useState([]);

    const userToken = localStorage.getItem("user-token");

    useEffect(() => {
        axios.get(`http://localhost:8000/getReservedFlights${userToken}`)
            .then((res) => {
                setReservedFlights(res.data.flights);
                setSeatsList(res.data.Seats);
                if (!res.data.flights.length) {
                    setMessage('No flights yet to show');
                }
            })
            .catch((err) => {
                setMessage('No flights yet to show');
            })
    }, []);

    function cancelReservation(id) {
        axios.post('http://localhost:8000/cancelReservedFlight', { id: id, token: userToken })
            .then(() => {
                setReservedFlights(reservedFlights.filter((val) => {
                    return val._id !== id;
                }))

                if (!reservedFlights.length) {
                    setMessage('No flights yet to show');
                }
            })
            .then((res) => {
                axios.post('http://localhost:8000/sendCancelationEmail', { id: id, token: userToken })
                    .then((res) => {
                        setMessage('Canceled, Please check your email');
                    })
            })
            .catch((err) => {
                console.log(err);
            });
    }

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

    function changeFlight(id, price, arrAir, depAir, type){
        axios.post('http://localhost:8000/PostChangeFlight', {
            fid: id,
            fprice:price,
            farrAir:arrAir,
            fdepAir:depAir,
            ftype:type,
            token: userToken
        }).then(() => {
            window.location.href = '/change';
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
            {reservedFlights.map(flight => {
                const ArrivalDateAndTime = new Date(flight.ArrivalDateAndTime);
                const DepartureDateAndTime = new Date(flight.DepartureDateAndTime);
                const tripDuration = (ArrivalDateAndTime - DepartureDateAndTime) / (1000 * 60 * 60);
                return (
                    <h3 key={flight._id}>
                        <table className="list">
                        <div key={flight._id}>
                            <tr id="list">
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
                            </div>
                            <button className="button" onClick={() => {
                                var result = window.confirm("Are You Sure Want to cancel?");
                                if (result) {
                                    cancelReservation(flight._id);
                                }
                            }}> Cancel Reservation </button>
                            <button className="button" onClick={() => { sendEmail(flight._id) }}> Send me email with reservation details</button>
                            <button className="button" onClick={() => { chooseSeats(flight._id) }}> Choose another Seat </button>


                            <button className="button" onClick={() => { changeFlight(flight._id,flight.Price,flight.ArrivalAirport,flight.Airport,flight.FlightType) }}> Change Flight </button>
                        </table>
                    </h3>
                )
            })}
        </div >
    )
}

export default ReservedFlights;
