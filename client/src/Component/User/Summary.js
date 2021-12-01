import React, { useEffect, useState } from 'react';
import axios from 'axios';



function Summary() {

    const [email, setEmail] = useState("");
    const [list, setList] = useState([]);
    const [seatsList, setSeatsList] = useState([]);


    function View() {
        axios.post('http://localhost:8000/SummaryChosen', {
            email: email
        })
            .then((response) => {
                setList(response.data.flights);
                setSeatsList(response.data.Seats)
                console.log(response.data.Seats)
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

    function confirm(id) {
        axios.post('http://localhost:8000/SummaryReserved', {
            FlightID: id,
            UserEmail: email
        }).then(() => {

        }).catch((err) => {
            console.log(err);
        })

    }

    function cancelReservation(id){
        axios.post('http://localhost:8000/cancelChosenFlight', { id: id, email: email })
        .then(() => {
            setList(list.filter((val) => {
                return val._id !== id;
            }))
        });
    }



    return (
        <div className="Summary">
            <input type="email" placeholder="Enter your Email..." onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br />

            <button onClick={View}> View </button>

            <h1> My Summary </h1>

            <div>
                <table>

                    <tbody>
                        {
                            list.map((flight) => {
                                const price = flight.Price;
                                const totalPrice = price * 2;
                                return (
                                    <tr className='list'>
                                        <div key={flight._id}>
                                            <tr id='list'>
                                                <td>Flight Type <br /> {flight.FlightType}</td>
                                                <td>Flight Number <br /> {flight.FlightNumber}</td>
                                                <td>Departure Date <br /> {flight.DepartureDateAndTime}</td>
                                                <td>Arrival Date <br /> {flight.ArrivalDateAndTime}</td>
                                                <td>Economy Class Seats <br /> {flight.NumberOfEconomySeats}</td>
                                                <td>Business Class Seats <br /> {flight.NumberOfBusinessClassSeats}</td>
                                                <td>Departure Airport <br /> {flight.Airport}</td>
                                                <td>Arrival Airport <br /> {flight.ArrivalAirport}</td>
                                                <td>Trip Duration <br /> {flight.TripDuration}</td>
                                                <td>Price <br /> {flight.Price}</td>
                                                <td>Price <br /> {totalPrice}</td>
                                                <td>Confirmation Number <br /> {flight.Price}</td>

                                            </tr>
                                            <br />
                                            <td>Seat Number<br /> {seatsList.map((seat) => {
                                                return (
                                                    <tr>
                                                        <td>{seat.Seat}</td>
                                                    </tr>
                                                )
                                            })}</td>

                                            <td>Class Type {seatsList.map((seat) => {
                                                return (
                                                    <tr>
                                                        <td>{seat.classtype}</td>
                                                    </tr>
                                                )
                                            })}</td>
                                        </div>
                                        <br />
                                        <br />
                                        <button onClick={() => clicked(flight._id)}> Choose my seats  </button>
                                        <button onClick={() => confirm(flight._id)}> Confirm Your Book Now  </button>
                                        <button onClick={() => {
                                            var result = window.confirm("Are You Sure Want to cancel?");
                                            if (result) {
                                                cancelReservation(flight._id);
                                            }
                                        }}> Cancel Book </button>
                                        <br />
                                        <br />

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>




        </div>
    )


}
export default Summary;