import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AvailableFlights.css';


function AvailableFlights() {

    const [SearchNumberOfPassengers, setSearchNumberOfPassengers] = useState("");
    const [SearchAirport, setSearchAirport] = useState("");
    const [SearchArrivalAirport, setSearchArrivalAirport] = useState("");

    const [list, setList] = useState([]);
    const [current, setcurrent] = useState("");

    const [ErrorMessage, setErrorMessage] = useState("");
    const [Message, setMessage] = useState("");

    var flightsArray = [];

    const userToken = localStorage.getItem("user-token");

    useEffect(() => {
        axios.get('http://localhost:8000/getAllAvailableFlights')
            .then((response) => {
                setList(response.data);
            }).catch(err => {
                setErrorMessage('No flights');
            })
    }, []);

    const handleChange = (event) => {
        setcurrent(event.target.value);
    }

    function BookFlight(flight, air, arrAir, flightType) {
        if(userToken){
            axios.post('http://localhost:8000/addFlightToChosen', {
                chosenFlightId: flight._id,
                token: userToken,
            })
                .then(() => {
                    dis(air, arrAir, flightType);
                    setMessage('Booked !');
                });
        }else{
            var x = [];
            x = localStorage.getItem('flightList');
            var y = JSON.parse(x);
            y.push(flight);
            localStorage.setItem('flightList', JSON.stringify(y));
        }
    }

    function dis(air, arrAir, flightType){

        if (flightType === "Departure") {
            setMessage('Book Your return flight now !');
        } else {
            setMessage('Book another Departure flight now !');
        }

        setList(list.filter((val) => {return val.Airport === arrAir && val.ArrivalAirport === air }));
    }

    return (

        <div className='availableFlights'>
            <form>
                <label>
                    Choose Your Cabin
                    <br />
                    <br />
                    <select className="SearchBox" onChange={handleChange}>
                        <option value="Default"> Default </option>
                        <option value="Business"> Business Class</option>
                        <option value="Economy"> Economy Class</option>
                    </select>
                </label>
            </form>

            <h2>{ErrorMessage}</h2>

            <br />
            <br />
            <input className="SearchBox" type='text' placeholder='Search Number Of Passengers...' onChange={e => {
                setSearchNumberOfPassengers(e.target.value);
            }} />
            <br />
            <br />

            <input className="SearchBox" type='text' placeholder='Search Departure Airport...' onChange={e => {
                setSearchAirport(e.target.value);
            }} />
            <br />
            <br />

            <input className="SearchBox" type='text' placeholder='Search Arrival Airport...' onChange={e => {
                setSearchArrivalAirport(e.target.value);
            }} />
            <br />
            <br />
            <h1> Available Flights </h1>
            <br />
            <br />
            <h2>{Message}</h2>
            <br />
            <br />
            {list.filter((val) => {
                const Airport = val.Airport + "";
                const ArrivalAirport = val.ArrivalAirport + "";

                if (
                    (((val.NumberOfEconomySeats - SearchNumberOfPassengers) >= 0 && (current === "Economy"))
                        || ((val.NumberOfBusinessClassSeats - SearchNumberOfPassengers) >= 0 && (current === "Business")))
                    && Airport.includes(SearchAirport)
                    && ArrivalAirport.includes(SearchArrivalAirport)
                ) { return val }
            }).map(flight => {
                const ArrivalDateAndTime = new Date(flight.ArrivalDateAndTime);
                const DepartureDateAndTime = new Date(flight.DepartureDateAndTime);
                const tripDuration = (ArrivalDateAndTime - DepartureDateAndTime) / (1000 * 60 * 60);
                console.log(tripDuration)
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
                            <button className="btn" onClick={() => { BookFlight(flight, flight.Airport, flight.ArrivalAirport, flight.FlightType) }}> Book </button>
                            <br />
                            <br />
                        </div>
                    </h3>
                )
            })}

            <div>

            </div>
        </div >
    )
}

export default AvailableFlights;
