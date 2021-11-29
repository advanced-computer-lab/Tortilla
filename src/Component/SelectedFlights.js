import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./update.css";

function SelectedFlights() {
  const [DepartureDate, setDepartureDate] = useState(); // Department Date
  const [ArrivalDate, setArrivalDate] = useState(); // Arrival Date
  const [FlightPrice, setPrice] = useState(); // Total Price of Flight

  const [SeatType, setSeatType] = useState(); // Economy or Business
  const [SeatNumber, setSeatNumber] = useState(); // Select Specific Seat

  function Create() {
    axios
      .post("http://localhost:8000/SelectedFlights", {
        DepartureDate: DepartureDate,
        ArrivalDate: ArrivalDate,
        FlightPrice: FlightPrice,
        SeatType: SeatType,
        SeatNumber: SeatNumber,
      })
      .then((response) => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="SelectedFlights">
      <label>Selected Flights</label>
      <br />
      {list.map((flight) => {
        return (
          <h3 key={flight._id}>
            <div className="list">
              <li>FlightNumber :{flight.FlightNumber}</li>
              <li>ArrivalDateAndTime :{flight.ArrivalDateAndTime}</li>
              <li>DepartureDateAndTime :{flight.DepartureDateAndTime}</li>
              <li>NumberOfEconomySeats :{flight.NumberOfEconomySeats}</li>
              <li>
                NumberOfBusinessClassSeats :{flight.NumberOfBusinessClassSeats}
              </li>
              <li>Airport :{flight.Airport}</li>
              <br />
              <br />
            </div>
          </h3>
        );
      })}
      <br />
      <br />
    </div>
  );
}

export default SelectedFlights;
