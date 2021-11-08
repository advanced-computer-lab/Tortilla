import axios from 'axios';
import React, { useState } from 'react'

function CreateFlight() {
    const [ArrivalDateAndTime, setArrivalDateAndTime] = useState();
    const [DepartureDateAndTime, setDepartureDateAndTime] = useState();
    const [FlightNumber, setFlightNumber] = useState("");
    const [NumberOfEconomySeats, setNumberOfEconomySeats] = useState("");
    const [NumberOfBusinessClassSeats, setNumberOfBusinessClassSeats] = useState("");
    const [Airport, setAirport] = useState("");

    function Create() {
        axios.post('http://localhost:8000/createFlight', {
            ArrivalDateAndTime: ArrivalDateAndTime,
            DepartureDateAndTime: DepartureDateAndTime,
            FlightNumber: FlightNumber,
            NumberOfEconomySeats: NumberOfEconomySeats,
            NumberOfBusinessClassSeats: NumberOfBusinessClassSeats,
            Airport: Airport

        }).then((response) => {
            window.location.href = '/';
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div className='CreateFlight'>
            <label>DepartureDateAndTime</label>
            <br />
            <input type='datetime-local' onChange={e => {
                setDepartureDateAndTime(e.target.value);
            }} />
            <br />
            <br />

            <label>ArrivalDateAndTime</label>
            <br />
            <input type='datetime-local' onChange={e => {
                setArrivalDateAndTime(e.target.value);
            }} />
            <br />


            <br />
            <input type='text' placeholder='FlightNumber...' onChange={e => {
                setFlightNumber(e.target.value);
            }} />
            <br />
            <br />


            <input type='text' placeholder='NumberOfEconomySeats...' onChange={e => {
                setNumberOfEconomySeats(e.target.value);
            }} />
            <br />
            <br />

            <input type='text' placeholder='NumberOfBusinessClassSeats...' onChange={e => {
                setNumberOfBusinessClassSeats(e.target.value);
            }} />
            <br />
            <br />

            <input type='text' placeholder='Airport...' onChange={e => {
                setAirport(e.target.value);
            }} />

            <br />
            <br />
            <button onClick={Create}> Create Flight </button>

        </div>
    )
}

export default CreateFlight;
