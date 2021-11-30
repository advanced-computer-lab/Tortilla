import axios from 'axios';
import React, { useState } from 'react';

function ReservedFlights() {

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

    function cancelReservation(id){
        axios.post('http://localhost:8000/cancelFlight', { id: id, email: email })
        .then(() => {
            setReservedFlights(reservedFlights.filter((val) => {
                return val._id !== id;
            }))
        });
    }

    return (
        <div>
            <input type="email" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
            <button onClick={getReservedFlights} > Show </button>

            {reservedFlights.map(flight => {
                const ArrivalDateAndTime = new Date(flight.ArrivalDateAndTime);
                const DepartureDateAndTime = new Date(flight.DepartureDateAndTime);
                const tripDuration = (ArrivalDateAndTime - DepartureDateAndTime) / (1000 * 60 * 60);
                return (
                    <h3 key={flight._id}>
                        <table className="listTable">
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
                            <button className="button" onClick={() => {
                                var result = window.confirm("Are You Sure Want to cancel?");
                                if (result) {
                                    cancelReservation(flight._id);
                                }
                            }}> Cancel Reservation </button>
                        </table>
                    </h3>
                )
            })}
        </div>
    )
}

export default ReservedFlights;
