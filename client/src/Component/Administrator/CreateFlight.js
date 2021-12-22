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
            window.location.href = '/admin';
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
                        <select className = "SearchBox" onChange={handleChange}>
                            <option value="Default"> Default </option>
                            <option value="Departure"> Departure</option>
                            <option value="Return"> Return </option>
                        </select>
                    </label>
                </form>
                <br />
                <label>DepartureDateAndTime</label>
                <br />
                <input className = "SearchBox" type='datetime-local' onChange={e => {
                    setDepartureDateAndTime(e.target.value);
                }} />
                <br />
                <br />
                <label>ArrivalDateAndTime</label>
                <br />
                <input className = "SearchBox" type='datetime-local' onChange={e => {
                    setArrivalDateAndTime(e.target.value);
                }} />
                <br />
                <br />
                <input className = "SearchBox" type='text' placeholder='FlightNumber...' onChange={e => {
                    setFlightNumber(e.target.value);
                }} />
                <br />
                <br />
                <input className = "SearchBox" type='text' placeholder='NumberOfEconomySeats...' onChange={e => {
                    setNumberOfEconomySeats(e.target.value);
                }} />
                <br />
                <br />
                <input className = "SearchBox" type='text' placeholder='NumberOfBusinessClassSeats...' onChange={e => {
                    setNumberOfBusinessClassSeats(e.target.value);
                }} />
                <br />
                <br />
                <input className = "SearchBox" type='text' placeholder='Departure Airport...' onChange={e => {
                    setAirport(e.target.value);
                }} />
                <br />
                <br />
                <input className = "SearchBox" type='text' placeholder='Arrival Airport...' onChange={e => {
                    setArrivalAirport(e.target.value);
                }} />
                <br />
                <br />
                <input className = "SearchBox" type='text' placeholder='Price...' onChange={e => {
                    setPrice(e.target.value);
                }} />
                <br />
                <br />
                <input className = "SearchBox" type='text' placeholder='Baggage Allowance...' onChange={e => {
                    setBaggageAllowance(e.target.value);
                }} />
                <br />
                <br />
                <button className = "btn" onClick={Create}> Create Flight </button>
        </div>
    )
}

export default CreateFlight;
