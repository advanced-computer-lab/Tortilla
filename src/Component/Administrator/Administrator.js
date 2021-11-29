// Selected Flights tab in return()
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./update.css";

function Administrator() {
  const [FlightNumberUpdate, setFlightNumberUpdate] = useState();
  const [ArrivalDateAndTimeUpdate, setArrivalDateAndTimeUpdate] = useState();
  const [DepartureDateAndTimeUpdate, setDepartureDateAndTimeUpdate] =
    useState();
  const [NumberOfEconomySeatsUpdate, setNumberOfEconomySeatsUpdate] =
    useState("");
  const [
    NumberOfBusinessClassSeatsUpdate,
    setNumberOfBusinessClassSeatsUpdate,
  ] = useState("");
  const [AirportUpdate, setAirportUpdate] = useState("");

  const [SearchFlight, setSearchFlight] = useState("");
  const [SearchAirport, setSearchAirport] = useState("");
  const [SearchEconomy, setSearchEconomy] = useState("");
  const [SearchBusiness, setSearchBusiness] = useState("");

  const [Airport] = useState();
  const [DepartureDate] = useState(); // Department Date
  const [ArrivalDate] = useState(); // Arrival Date
  const [FlightPrice] = useState(); // Total Price of Flight
  const [FlightNumber] = useState();
  const [SeatType] = useState(); // Economy or Business
  //const [SeatNumber] = useState(); // Select Specific Seat

  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/getAllAvailableFlights")
      .then((response) => {
        setList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteFlight(id) {
    axios
      .post("http://localhost:8000/deleteFlight", {
        id: id,
        Admin: "Administrator",
      })
      .then((response) => {
        setList(
          list.filter((val) => {
            return val._id !== id;
          })
        );
      });
  }

  //   function SelectFlight(id) {    //      CHECK...
  //     axios
  //       .post("http://localhost:8000/SelectedFlights", {
  //         id: id,
  //         DepartureDate: DepartureDate,
  //         ArrivalDate: ArrivalDate,
  //         FlightPrice: FlightPrice,
  //         SeatType: SeatType,
  //         SeatNumber: SeatNumber
  //       })
  //       .then((response) => {
  //         window.location.href = "/";
  //         setList(list.filter((val) => {
  //             return val._id === id;
  //           }));
  //       });
  //   }

  function Select(id) {
    axios
      .post("http://localhost:8000/createFlight", {
        ArrivalDateAndTime: ArrivalDate,
        DepartureDateAndTime: DepartureDate,
        FlightNumber: FlightNumber,
        SeatType: SeatType,
        Airport: Airport,
        FlightPrice: FlightPrice,
      })
      .then((response) => {
        window.location.href = "/SelectedFlights";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateFlight(id) {
    axios
      .put("http://localhost:8000/updateFlight", {
        id: id,
        FlightNumber: FlightNumberUpdate,
        ArrivalDateAndTime: ArrivalDateAndTimeUpdate,
        DepartureDateAndTime: DepartureDateAndTimeUpdate,
        NumberOfEconomySeats: NumberOfEconomySeatsUpdate,
        NumberOfBusinessClassSeats: NumberOfBusinessClassSeatsUpdate,
        Airport: AirportUpdate,
      })
      .then((response) => {
        window.location.href = "/";
      });
  }

  return (
    <div className="Adminstartor">
      <br />
      <br />
      <Link to="/create"> Create Flight</Link>
      <br />
      <br />
      <Link to="/search"> Search For A Flights Time</Link>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search Flight..."
        onChange={(e) => {
          setSearchFlight(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Search Airport..."
        onChange={(e) => {
          setSearchAirport(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Search Economy..."
        onChange={(e) => {
          setSearchEconomy(e.target.value);
        }}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Search Business..."
        onChange={(e) => {
          setSearchBusiness(e.target.value);
        }}
      />
      <br />
      <br />
      <Link to="/SelectedFlights"> Your Flights</Link>
      <br />
      <br />
      <h1> Available Flights </h1>
      <br />
      <br />
      {list
        .filter((val) => {
          if (
            val.FlightNumber.toString().includes(SearchFlight) &&
            val.Airport.toString().includes(SearchAirport) &&
            val.NumberOfEconomySeats.toString().includes(SearchEconomy) &&
            val.NumberOfBusinessClassSeats.toString().includes(SearchBusiness)
          ) {
            return val;
          }
        })
        .map((flight) => {
          return (
            <h3 key={flight._id}>
              <div className="list">
                <li>FlightNumber :{flight.FlightNumber}</li>
                <li>ArrivalDateAndTime :{flight.ArrivalDateAndTime}</li>
                <li>DepartureDateAndTime :{flight.DepartureDateAndTime}</li>
                <li>NumberOfEconomySeats :{flight.NumberOfEconomySeats}</li>
                <li>
                  NumberOfBusinessClassSeats :
                  {flight.NumberOfBusinessClassSeats}
                </li>
                <li>Airport :{flight.Airport}</li>
                <button
                  onClick={() => {
                    var result = window.confirm("Are You Sure Want to delete?");
                    if (result) {
                      deleteFlight(flight._id);
                    }
                  }}
                >
                  {" "}
                  Delete flight{" "}
                </button>
                <br />
                <br />
                <button
                  onClick={() => {
                    var result = window.confirm(
                      "Are You Sure Want to Select this Flight?"
                    );
                    if (result) {
                      Select(flight._id);
                    }
                  }}
                >
                  {" "}
                  Select flight{" "}
                </button>
              </div>

              <br />

              <br />

              <div className="update">
                <label>ArrivalDateAndTime</label>
                <input
                  type="datetime-local"
                  onChange={(e) => {
                    setArrivalDateAndTimeUpdate(e.target.value);
                  }}
                />

                <label>DepartureDateAndTime</label>
                <input
                  type="datetime-local"
                  onChange={(e) => {
                    setDepartureDateAndTimeUpdate(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="New flight number..."
                  onChange={(e) => {
                    setFlightNumberUpdate(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="NumberOfEconomySeats..."
                  onChange={(e) => {
                    setNumberOfEconomySeatsUpdate(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="NumberOfBusinessClassSeats..."
                  onChange={(e) => {
                    setNumberOfBusinessClassSeatsUpdate(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Airport..."
                  onChange={(e) => {
                    setAirportUpdate(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateFlight(flight._id);
                  }}
                >
                  {" "}
                  Update flight{" "}
                </button>
              </div>
            </h3>
          );
        })}
    </div>
  );
}

export default Administrator;
