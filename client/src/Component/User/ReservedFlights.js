import axios from 'axios';
import React, { useState } from 'react';

function ReservedFlights() {

    const [email, setEmail] = useState("");
    const [reservedFlights, setReservedFlights] = useState([]);

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
            .then(() => {
                setReservedFlights(reservedFlights.filter((val) => {
                    return val._id !== id;
                }))
            })
            .then((res) => {
                axios.post('http://localhost:8000/sendCancelationEmail', { email: email })
                    .then((res) => {
                        console.log(res.data);
                    })
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div>
            <input type="email" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
            <button onClick={getReservedFlights} > Show </button>

            <table>

                <tbody>

                    {reservedFlights.map(flight => {
                        const ArrivalDateAndTime = new Date(flight.ArrivalDateAndTime);
                        const DepartureDateAndTime = new Date(flight.DepartureDateAndTime);
                        const tripDuration = (ArrivalDateAndTime - DepartureDateAndTime) / (1000 * 60 * 60);

                        const price = flight.Price;
                        const totalPrice = price * 2;
                        return (
                            <h3 key={flight._id}>
                                <tr className="listTable">
                                    <td>Flight Type  {flight.FlightType}  </td>
                                    <td>FlightNumber  {flight.FlightNumber}  </td>
                                    <td>DepartureDateAndTime  {flight.DepartureDateAndTime}</td>
                                    <td>ArrivalDateAndTime  {flight.ArrivalDateAndTime}</td>
                                    <td>NumberOfEconomySeats  {flight.NumberOfEconomySeats} </td>
                                    <td>NumberOfBusinessClassSeats  {flight.NumberOfBusinessClassSeats}</td>
                                    <td>Airport {flight.Airport}</td>
                                    <td>ArrivalAirport  {flight.ArrivalAirport}</td>
                                    <td>TripDuration In Hours {Math.floor(tripDuration)}</td>
                                    <td>Price {flight.Price}</td>
                                    <td>Total Ticket Price {totalPrice} </td>
                                    <td>BaggageAllowance In Kg {flight.BaggageAllowance}</td>
                                    <button onClick={() => {
                                        var result = window.confirm("Are You Sure Want to cancel?");
                                        if (result) {
                                            cancelReservation(flight._id);
                                        }
                                    }}> Cancel Reservation </button>
                                </tr>
                            </h3>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ReservedFlights;
