import axios from 'axios';
import React, { useState } from 'react'

function CreateFlight() {
    const [FlightType, setFlightType] = useState("");
    const [ArrivalDateAndTime, setArrivalDateAndTime] = useState();
    const [DepartureDateAndTime, setDepartureDateAndTime] = useState();
    const [FlightNumber, setFlightNumber] = useState("");
    const [NumberOfEconomySeats, setNumberOfEconomySeats] = useState("");
    const [NumberOfBusinessClassSeats, setNumberOfBusinessClassSeats] = useState("");
    const [Airport, setAirport] = useState("");
    const [Price, setPrice] = useState("");
    const [ArrivalAirport, setArrivalAirport] = useState("");
    const [BaggageAllowance, setBaggageAllowance] = useState("");


    function Create() {
        axios.post('http://localhost:8000/createFlight', {
            FlightType: FlightType,
            ArrivalDateAndTime: ArrivalDateAndTime,
            DepartureDateAndTime: DepartureDateAndTime,
            FlightNumber: FlightNumber,
            NumberOfEconomySeats: NumberOfEconomySeats,
            NumberOfBusinessClassSeats: NumberOfBusinessClassSeats,
            Airport: Airport,
            ArrivalAirport: ArrivalAirport,
            Price: Price,
            BaggageAllowance: BaggageAllowance

        }).then(() => {
<<<<<<< HEAD
            window.location.href = '/';
=======
            window.location.href = '/admin';
>>>>>>> safar
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleChange = (event) => {
        setFlightType(event.target.value);
    }


    return (
        <div className='CreateFlight'>
                <form>
                    <label>
                        Choose Flight Type :
                        <br />
<<<<<<< HEAD
                        <select onChange={handleChange}>
=======
                        <select className = "SearchBox" onChange={handleChange}>
>>>>>>> safar
                            <option value="Default"> Default </option>
                            <option value="Departure"> Departure</option>
                            <option value="Return"> Return </option>
                        </select>
                    </label>
                </form>
                <br />
                <label>DepartureDateAndTime</label>
                <br />
<<<<<<< HEAD
                <input type='datetime-local' onChange={e => {
=======
                <input className = "SearchBox" type='datetime-local' onChange={e => {
>>>>>>> safar
                    setDepartureDateAndTime(e.target.value);
                }} />
                <br />
                <br />
                <label>ArrivalDateAndTime</label>
                <br />
<<<<<<< HEAD
                <input type='datetime-local' onChange={e => {
=======
                <input className = "SearchBox" type='datetime-local' onChange={e => {
>>>>>>> safar
                    setArrivalDateAndTime(e.target.value);
                }} />
                <br />
                <br />
<<<<<<< HEAD
                <input type='text' placeholder='FlightNumber...' onChange={e => {
=======
                <input className = "SearchBox" type='text' placeholder='FlightNumber...' onChange={e => {
>>>>>>> safar
                    setFlightNumber(e.target.value);
                }} />
                <br />
                <br />
<<<<<<< HEAD
                <input type='text' placeholder='NumberOfEconomySeats...' onChange={e => {
=======
                <input className = "SearchBox" type='text' placeholder='NumberOfEconomySeats...' onChange={e => {
>>>>>>> safar
                    setNumberOfEconomySeats(e.target.value);
                }} />
                <br />
                <br />
<<<<<<< HEAD
                <input type='text' placeholder='NumberOfBusinessClassSeats...' onChange={e => {
=======
                <input className = "SearchBox" type='text' placeholder='NumberOfBusinessClassSeats...' onChange={e => {
>>>>>>> safar
                    setNumberOfBusinessClassSeats(e.target.value);
                }} />
                <br />
                <br />
<<<<<<< HEAD
                <input type='text' placeholder='Departure Airport...' onChange={e => {
=======
                <input className = "SearchBox" type='text' placeholder='Departure Airport...' onChange={e => {
>>>>>>> safar
                    setAirport(e.target.value);
                }} />
                <br />
                <br />
<<<<<<< HEAD
                <input type='text' placeholder='Arrival Airport...' onChange={e => {
=======
                <input className = "SearchBox" type='text' placeholder='Arrival Airport...' onChange={e => {
>>>>>>> safar
                    setArrivalAirport(e.target.value);
                }} />
                <br />
                <br />
<<<<<<< HEAD
                <input type='text' placeholder='Price...' onChange={e => {
=======
                <input className = "SearchBox" type='text' placeholder='Price...' onChange={e => {
>>>>>>> safar
                    setPrice(e.target.value);
                }} />
                <br />
                <br />
<<<<<<< HEAD
                <input type='text' placeholder='Baggage Allowance...' onChange={e => {
=======
                <input className = "SearchBox" type='text' placeholder='Baggage Allowance...' onChange={e => {
>>>>>>> safar
                    setBaggageAllowance(e.target.value);
                }} />
                <br />
                <br />
<<<<<<< HEAD
                <button onClick={Create}> Create Flight </button>
=======
                <button className = "btn" onClick={Create}> Create Flight </button>
>>>>>>> safar
        </div>
    )
}

export default CreateFlight;
