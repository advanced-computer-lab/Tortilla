import React, { useState } from 'react';
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


    function cancelReservation(id) {
        axios.post('http://localhost:8000/cancelReservedFlight', { id: id, email: email })
            .then(() => {
                setList(list.filter((val) => {
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

    function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      }

    return (
        <div className="Summary">
            <input className="SearchBox" type="email" placeholder="Enter your Email..." onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br />

            <button className="btn" onClick={View}> View </button>

            <h1> My chosen flights </h1>

            <div>
                <table>

                    <tbody>
                        {
                            list.map((flight) => {
                                //const price = flight.Price;
                                //const totalPrice = price * 2;
                                const confirmationId = uuidv4();
                                return (
                                    <tr className='list'>
                                        <div key={flight._id}>
                                            <tr id='list'>
                                                <th>Flight Type</th> 
                                                <th>Flight Number</th> 
                                                <th>Departure Date</th> 
                                                <th>Arrival Date</th>
                                                <th>Economy Class Seats</th> 
                                                <th>Business Class Seats </th>
                                                <th>Departure Airport</th> 
                                                <th>Arrival Airport</th> 
                                                <th>Trip Duration </th>
                                                <th>Price </th>
                                                {/* <td>Total Ticket Price <br /> {totalPrice}</td> */}
                                                <th>Confirmation Number</th>
                                            </tr>
                                            <tr>
                                            <td>{flight.FlightType}</td>
                                            <td>{flight.FlightNumber}</td>
                                            <td> {flight.DepartureDateAndTime}</td>
                                            <td> {flight.ArrivalDateAndTime}</td>
                                            <td> {flight.NumberOfEconomySeats}</td>
                                            <td> {flight.NumberOfBusinessClassSeats}</td>
                                            <td> {flight.Airport}</td>
                                            <td>{flight.ArrivalAirport}</td>
                                            <td>{flight.TripDuration}</td>
                                            <td>{flight.Price}</td>
                                            <td> {confirmationId}</td>
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
                                                        </tr>
                                                    )
                                                }
                                            })}</td>
                                        </div>
                                        <br />
                                        <br />
                                        <button className="btn" onClick={() => clicked(flight._id)}> Choose my seats  </button>
                                        <button className="btn" onClick={() => confirm(flight._id)}> Confirm Your Book Now  </button>
                                        <button className="btn" onClick={() => {
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