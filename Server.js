const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const user = require("./Models/User");
const flight = require("./Models/Flight");

const ObjectId = require("mongodb").ObjectId;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

app.post("/deleteFlight", async (req, res) => {
  const deleteFlightId = req.body.id;
  const admin = req.body.Admin;

  console.log(deleteFlightId);

  if (admin == "Administrator") {
    const Flight = await flight.findOne({ _id: ObjectId(deleteFlightId) });
    console.log(Flight);
    await flight.deleteOne(Flight);
    res.status(200).send({ message: "true" });
  } else {
    res.status(403).send({ message: "false" });
  }
});

app.post("/SelectedFlights", async (req, res) => {
  const selectFlightId = req.body.id;
  const admin = req.body.Admin;
  // const data = {
  //   DepartureDate: req.body.DepartureDateAndTime,
  //   ArrivalDate: req.body.ArrivalDateAndTime,
  //   FlightPrice: req.body.FlightPrice,
  //   SeatType: req.body.SeatType,
  //   SeatNumber: req.body.SeatNumber,
  // };

  console.log(selectFlightId);

  if (admin == "Administrator") {
    const Flight = await flight.findOne({ _id: ObjectId(selectFlightId) });
    console.log(Flight);
    await flight.findOne(Flight);
    res.status(200).send({ message: "true" });
  } else {
    res.status(403).send({ message: "false" });
  }
});

app.put("/updateFlight", async (req, res) => {
  const updateFlightId = req.body.id;

  console.log(updateFlightId);

  const data = {
    ArrivalDateAndTime: req.body.ArrivalDateAndTime,
    DepartureDateAndTime: req.body.DepartureDateAndTime,
    FlightNumber: req.body.FlightNumber,
    NumberOfEconomySeats: req.body.NumberOfEconomySeats,
    NumberOfBusinessClassSeats: req.body.NumberOfBusinessClassSeats,
    Airport: req.body.Airport,
  };

  const FlightNumber = req.body.FlightNumber;
  const Airport = req.body.Airport;

  const Flight = await flight.findOne({ _id: ObjectId(updateFlightId) });

  console.log(Flight);

  const valid = await flight.findOne({ where: { FlightNumber, Airport } });

  if (valid) {
    console.log("Valid");
    if (data.FlightNumber) {
      await flight.updateOne(
        { _id: ObjectId(updateFlightId) },
        { FlightNumber: req.body.FlightNumber }
      );
    }

    if (data.Airport) {
      await flight.updateOne(
        { _id: ObjectId(updateFlightId) },
        { Airport: req.body.Airport }
      );
    }

    if (data.NumberOfEconomySeats) {
      await flight.updateOne(
        { _id: ObjectId(updateFlightId) },
        { NumberOfEconomySeats: req.body.NumberOfEconomySeats }
      );
    }

    if (data.NumberOfBusinessClassSeats) {
      await flight.updateOne(
        { _id: ObjectId(updateFlightId) },
        { NumberOfBusinessClassSeats: req.body.NumberOfBusinessClassSeats }
      );
    }

    if (data.ArrivalDateAndTime) {
      await flight.updateOne(
        { _id: ObjectId(updateFlightId) },
        { ArrivalDateAndTime: req.body.ArrivalDateAndTime }
      );
    }

    if (data.DepartureDateAndTime) {
      await flight.updateOne(
        { _id: ObjectId(updateFlightId) },
        { DepartureDateAndTime: req.body.DepartureDateAndTime }
      );
    }
  }

  res.status(200).send({ message: "true" });
});

app.post("/createFlight", async (req, res) => {
  const FlightNumber = req.body.FlightNumber;
  const Airport = req.body.Airport;

  const data = {
    ArrivalDateAndTime: req.body.ArrivalDateAndTime,
    DepartureDateAndTime: req.body.DepartureDateAndTime,
    FlightNumber: req.body.FlightNumber,
    NumberOfEconomySeats: req.body.NumberOfEconomySeats,
    NumberOfBusinessClassSeats: req.body.NumberOfBusinessClassSeats,
    Airport: req.body.Airport,
  };

  const flightNumber = await flight.findOne({ FlightNumber });
  const airport = await flight.findOne({ Airport });

  if (flightNumber) {
    if (airport) {
      if (
        flightNumber.FlightNumber == FlightNumber &&
        airport.Airport == Airport
      ) {
        res.status(403).send({ message: "false" });
      } else {
        await flight.create(data);
        res.status(200).send({ message: "true" });
      }
    } else {
      await flight.create(data);
      res.status(200).send({ message: "true" });
    }
  } else {
    await flight.create(data);
    res.status(200).send({ message: "true" });
  }
});

app.get("/getAllAvailableFlights", async (req, res) => {
  const flights = await flight.find();
  res.status(200).send(flights);
});

app.get("/getAllAvailableUsers", async (req, res) => {
  const users = await user.find();
  res.status(200).send(users);
});

app.get("/getAllSelectedFlights", async (req, res) => {
  const FlightNumber = req.body.flightNumber;
  const Airport = req.body.Airport;
  const data = {
    ArrivalDateAndTime: req.body.ArrivalDateAndTime,
    DepartureDateAndTime: req.body.DepartureDateAndTime,
    FlightNumber: req.body.FlightNumber,
    NumberOfEconomySeats: req.body.NumberOfEconomySeats,
    NumberOfBusinessClassSeats: req.body.NumberOfBusinessClassSeats,
    Airport: req.body.Airport,
    flightprice: FlightPrice,
  };
  const flightNumber = await flight.findOne({ FlightNumber });
  const airport = await flight.findOne({ Airport });
  if (flightNumber) {
    if (airport) {
      if (
        flightNumber.FlightNumber == FlightNumber &&
        airport.Airport == Airport
      ) {
        res.status(403).send({ message: "false" });
      } else {
        await flight.create(data);
        res.status(200).send({ message: "true" });
      }
    } else {
      await flight.create(data);
      res.status(200).send({ message: "true" });
    }
  } else {
    await flight.create(data);
    res.status(200).send({ message: "true" });
  }
});

app.listen(8000, () => {
  console.log(`Listening to requests on http://localhost:${8000}`);
});
