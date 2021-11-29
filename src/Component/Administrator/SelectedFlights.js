import React, { useState, useEffect } from "react";
import axios from "axios";
//import Administrator from "./Administrator";
//import { Link } from "react-router-dom";
import "./update.css";

function SelectedFlights() {
  const [DepartureDate] = useState(); // Department Date
  const [ArrivalDate] = useState(); // Arrival Date
  const [FlightPrice] = useState(); // Total Price of Flight
  // const [FlightNumber] = useState();
  // const [Airport] = useState();
  const [SeatType] = useState(); // Economy or Business
  const [SeatNumber] = useState(); // Select Specific Seat
  const [List, setList] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/getAllSelectedFlights")
  //     .then((response) => {
  //       setList(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  function ConfirmFlight(id) {
    axios
      .post("http://localhost:8000/SelectedFlights", {
        id: id,
        DepartureDateAndTime: DepartureDate,
        ArrivalDateAndTime: ArrivalDate,
        FlightPrice: FlightPrice,
        SeatType: SeatType,
        SeatNumber: SeatNumber,
      })
      .then((response) => {
        window.location.href = "/SelectedFlights";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="SelectedFlights">
      <label>Selected Flights</label>
      {List.map((flight) => {
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
              <button
                onClick={() => {
                  var result = window.confirm(
                    "Are You Sure Want to Select this Flight?"
                  );
                  if (result) {
                    ConfirmFlight(flight._id);
                  }
                }}
              >
                {" "}
                Select flight{" "}
              </button>
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
