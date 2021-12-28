import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


function Change() {
    let amount;
    let fId;

    let oldId;
    const [list, setList] = useState([]);
    const [ErrorMessage, setErrorMessage] = useState("");

    const [price, setprice] = useState("");
    const userToken = localStorage.getItem("user-token");

   
    useEffect(() => {
        axios.get('http://localhost:8000/GetChangeFlight')
            .then((response) => {
                setList(response.data.flights);
                setprice(response.data.OldPrice);
                oldId = response.data.id;
                 
                if(!response.data.flights){
                    setErrorMessage('No flights available');
                }
            }).catch(err => {
                setErrorMessage('No flights available');
            })
    }, []);

    function BookFlight(newID) {
        axios.post('http://localhost:8000/BookChangeFlight', { newID : newID, amount: amount, token: userToken })
        .then((response) => {
            window.location.href = '/reservedFlights'
        }).catch(err => {
            setErrorMessage('No flights');
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
                BookFlight(fId);
            })
                .catch((err) => {
                    console.log(err);
                })


    }

    function f(p, f) {
        amount = p - price;
        fId = f;
    }

    return (
        <div>
            <h2>{ErrorMessage}</h2>
            <br/>
               {list.map(flight => {
                const ArrivalDateAndTime = new Date(flight.ArrivalDateAndTime);
                const DepartureDateAndTime = new Date(flight.DepartureDateAndTime);
                const tripDuration = (ArrivalDateAndTime - DepartureDateAndTime) / (1000 * 60 * 60);
                return (
                    <h3 key={flight._id}>
                        <div className='list'>
                            <table>
                                <tr>
                                    <th>Flight Type </th>
                                    <th>DepartureDateAndTime </th>
                                    <th>ArrivalDateAndTime </th>
                                    <th>Economy Seats </th>
                                    <th>Business Seats </th>
                                    <th>Airport </th>
                                    <th>Arrival Airport </th>
                                    <th>Trip Duration In Hours </th>
                                    <th>Price </th>
                                    <th>Baggage Allowance In Kg  </th>
                                </tr>

                                <tr>
                                    <td>{flight.FlightType}</td>
                                    <td>{flight.DepartureDateAndTime}</td>
                                    <td>{flight.ArrivalDateAndTime}</td>
                                    <td>{flight.NumberOfEconomySeats}</td>
                                    <td>{flight.NumberOfBusinessClassSeats}</td>
                                    <td>{flight.Airport}</td>
                                    <td>{flight.ArrivalAirport}</td>
                                    <td>{Math.floor(tripDuration)}</td>
                                    <td>{flight.Price}</td>
                                    <td>{flight.BaggageAllowance}</td>
                                </tr>
                            </table>
                            <br />
                            <br />
                            {
                                (flight.Price-price) > 0 ? 
                                <StripeCheckout
                                stripeKey='pk_test_51KAJHLC9bIWLACdl5rsJxK9CzRRAVtRKgxOreWaYHvk7WX8R1mZZhRKQ5efT9SbnBCt94vG9roc7T4XC3NkSFLmx00LbRdzK5Q'
                                token={makePayment}
                                name="Pay Now"                
                                urrency="USD"
                                amount={(flight.Price-price) * 100}

                            >
                                <button className="btn" onClick={() => { f( flight.Price,flight._id) }}> Pay the difference </button>
                            </StripeCheckout> : null
                            }
                            
                            {
                            (flight.Price-price) <= 0 ? 
                            <button className="btn" onClick={() => {BookFlight(flight._id) }}> Book </button> : null }

                            <br />
                            <br />
                        </div>
                    </h3>
                )
            })}
        </div>
    )
}

export default Change
