import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AvailableFlights() {

    const [SearchNumberOfPassengers, setSearchNumberOfPassengers] = useState("");
    const [SearchAirport, setSearchAirport] = useState("");
    const [SearchArrivalAirport, setSearchArrivalAirport] = useState("");

    const [list, setList] = useState([]);
    const [current, setcurrent] = useState("");


    //function search(){
    useEffect(() => {
        axios.get('http://localhost:8000/getAllAvailableFlights')
            .then((response) => {
                setList(response.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    //}


    const handleChange = (event) => {
        setcurrent(event.target.value);
    }

    function BookFlight(id) {
        axios.post('http://localhost:8000/bookFlight', { id: id })
            .then((response) => {
                console.log(response.data)
            });
    }

    return (

        <div className='Adminstartor'>

            <br />
            <br />
            <Link to='/userSearch'> Search For A Flight By Date</Link>

            <br />
            <br />
            <input type='text' placeholder='Search Number Of Passengers...' onChange={e => {
                setSearchNumberOfPassengers(e.target.value);
            }} />
            <br />
            <br />

            <input type='text' placeholder='Search Departure Airport...' onChange={e => {
                setSearchAirport(e.target.value);
            }} />
            <br />
            <br />

            <input type='text' placeholder='Search Arrival Airport...' onChange={e => {
                setSearchArrivalAirport(e.target.value);
            }} />
            <br />
            <br />

            <div>
                <form>
                    <label>
                        Choose Your Cabin :
                        <br />
                        <select onChange={handleChange}>
                            <option value="Default"> Default </option>
                            <option value="Business"> Business Class</option>
                            <option value="Economy"> Economy Class</option>
                        </select>
                    </label>
                </form>
            </div>
            <h1> Available Flights </h1>
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
            })
                .map(flight => {
                    return (
                        <h3 key={flight._id}>
                            <div className='list'>
                                <li>FlightNumber :{flight.FlightNumber}</li>
                                <li>DepartureDateAndTime :{flight.DepartureDateAndTime}</li>
                                <li>ArrivalDateAndTime :{flight.ArrivalDateAndTime}</li>
                                <li>NumberOfEconomySeats :{flight.NumberOfEconomySeats}</li>
                                <li>NumberOfBusinessClassSeats :{flight.NumberOfBusinessClassSeats}</li>
                                <li>Airport :{flight.Airport}</li>
                                <li>ArrivalAirport :{flight.ArrivalAirport}</li>
                                <li>TripDuration :{flight.TripDuration}</li>
                                <li>Price :{flight.Price}</li>
                                <li>BaggageAllowance In Kg :{flight.BaggageAllowance}</li>
                                <button onClick={() => { BookFlight(flight._id) }}> Book </button>
                            </div>
                        </h3>
                    )
                })}
        </div >
    )
}

export default AvailableFlights;
