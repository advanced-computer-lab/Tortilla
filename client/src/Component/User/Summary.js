import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

function Summary() {
    let amount;
    let fId;

    const [list, setList] = useState([]);
    const [seatsList, setSeatsList] = useState([]);

    const [ErrorMessage, setErrorMessage] = useState("");
    const [ConfirmMessage, setConfirmMessage] = useState("");

    const userToken = localStorage.getItem("user-token");

    useEffect(() => {
        if (userToken) {
            axios.get(`http://localhost:8000/getAllChosenFlights${userToken}`)
                .then((response) => {
                    setList(response.data.flights);
                    setSeatsList(response.data.Seats);
                    if (!(response.data.flights).length) {
                        setErrorMessage('No flights yet to show');
                    }
                }).catch(err => {
                    console.log(err);
                })
        } else {
            const x = localStorage.getItem("flightList");
            if (x != null) {
                setList(JSON.parse(x));
            } else {
                setErrorMessage('No flights yet to show');
            }
        }
    }, [])

    function cancelReservation(id) {
        axios.post('http://localhost:8000/cancelChosenFlight', { id: id, token: userToken })
            .then(() => {
                if (localStorage.getItem("flightList")) {
                    const y = localStorage.getItem("flightList");
                    var items = JSON.parse(y);
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item._id === id) {
                            items.splice(i, 1);
                        }
                    }

                    items = JSON.stringify(items);
                    localStorage.setItem("flightList", items);
                }

                if (list.length === 1) {
                    setErrorMessage('No flights yet to show');
                }

                setList(list.filter((val) => {
                    return val._id !== id;
                }))
            })

    }


    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    function chooseSeats(id) {
        if (userToken != null) {
            axios.post('http://localhost:8000/PostID', {
                FlightID: id,
                token: userToken
            }).then(() => {
                window.location.href = '/Seats';
            }).catch((err) => {
                console.log(err);
            })
        } else {
            window.location.href = '/login';
        }
    }

    function confirm(id) {
        if (userToken != null) {
            axios.post('http://localhost:8000/addFlightToReserved', {
                ReservedFlightId: id,
                token: userToken
            }).then(() => {
                if (list.length === 1) {
                    setErrorMessage('No flights yet to show');
                }

                setList(list.filter((val) => {
                    return val._id !== id;
                }))

                axios.post('http://localhost:8000/sendEmail', { id: id, token: userToken })
                    .then((res) => {
                        setConfirmMessage('Confirmed, Please check your email');
                    })
            }).catch((err) => {
                console.log(err);
            })
        } else {
            window.location.href = '/login'
        }

    }

    function removeSeat(seat, classtype, flightId) {
        axios.post('http://localhost:8000/removeSeat', {
            seat: seat,
            classtype: classtype,
            flightId: flightId,
            token: userToken
        }).then(() => {
            window.location.href = '/Summary';
        }).catch((err) => {
            console.log(err);
        })
    }

    const makePayment = (token) => {
        const body = {
            token,
            amount
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch('http://localhost:8000/payment', {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            confirm(fId);
        })
            .catch((err) => {
                console.log(err);
            })

    }

    function f(p, f) {
        fId = f;
        amount = p;
    }

    return (
        <div className="Summary">
            <h1> My chosen flights </h1>
            <br />
            <br />
            <h2> {ErrorMessage} </h2>
            <h2>{ConfirmMessage}</h2>
            <div>
                <table>
                    <tbody>
                        {list.map((flight) => {
                            //const price = flight.Price;
                            //const totalPrice = price * 2;
                            const ArrivalDateAndTime = new Date(flight.ArrivalDateAndTime);
                            const DepartureDateAndTime = new Date(flight.DepartureDateAndTime);
                            const tripDuration = (ArrivalDateAndTime - DepartureDateAndTime) / (1000 * 60 * 60);
                            const confirmationId = uuidv4();
                            return (
                                <tr className='list'>
                                    <div key={flight._id}>
                                        <tr id='list'>
                                            <th>Flight Type</th>
                                            <th>Departure Date</th>
                                            <th>Arrival Date</th>
                                            <th>Economy Class Seats</th>
                                            <th>Business Class Seats </th>
                                            <th>Departure Airport</th>
                                            <th>Arrival Airport</th>
                                            <th>Trip Duration In Hours</th>
                                            <th>Price </th>
                                            {/* <td>Total Ticket Price <br /> {totalPrice}</td> */}
                                            <th>Confirmation Number</th>
                                        </tr>
                                        <tr>
                                            <td>{flight.FlightType}</td>
                                            <td> {flight.DepartureDateAndTime}</td>
                                            <td> {flight.ArrivalDateAndTime}</td>
                                            <td> {flight.NumberOfEconomySeats}</td>
                                            <td> {flight.NumberOfBusinessClassSeats}</td>
                                            <td> {flight.Airport}</td>
                                            <td>{flight.ArrivalAirport}</td>
                                            <td>{Math.floor(tripDuration)} </td>
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
                                                        <button onClick={() => removeSeat(seat.Seat, seat.classtype, flight._id)}> remove seat </button>
                                                    </tr>
                                                )
                                            }
                                        })}
                                        </td>
                                    </div>
                                    <button className="btn" onClick={() => chooseSeats(flight._id)}> Choose my seats  </button>
                                    {/* <button className="btn" onClick={() => confirm(flight._id)}> Confirm Your Book Now  </button> */}


                                    {
                                        userToken ?
                                            <StripeCheckout
                                                stripeKey='pk_test_51KAJHLC9bIWLACdl5WPmLcLUvAew6GJZJpXJIViZTcx1puxUwGD6umKVJXqFllkveMd6F2OZ4lDZ0r2lEL1kDODb00wVfnluFx'
                                                token={makePayment}
                                                name="Pay Now"
                                                panelLabel={"payment"}
                                                currency="USD"
                                                amount={flight.Price * 100}

                                            >
                                                <button onClick={() => f(flight.Price, flight._id)} className="btn" > Pay Now  </button>
                                            </StripeCheckout> : null
                                    }



                                    <button className="btn" onClick={() => { cancelReservation(flight._id) }}> Cancel Book </button>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )


}
export default Summary;