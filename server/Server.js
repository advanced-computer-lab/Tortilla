const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const user = require('./Models/User');
const flight = require('./Models/Flight');

const ObjectId = require('mongodb').ObjectId;

var F_ID=0;
var UserEmail="";


app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));

app.post('/bookFlight', async (req, res) => {

  const bookedFlightId = req.body.id;
  const userEmail = req.body.email;

  const NumberOfReservedBusiness = req.body.NumberOfReservedBusiness;
  const NumberOfReservedEconomy = req.body.NumberOfReservedEconomy;

  const bookedFlight = await flight.findOne({ _id: ObjectId(bookedFlightId) });

  const User = await user.findOne({ Email: userEmail });

  const remainingOfBusinessSeats = bookedFlight.NumberOfBusinessClassSeats - NumberOfReservedBusiness;
  const remainingOfEconomySeats = bookedFlight.NumberOfEconomySeats - NumberOfReservedEconomy;

  console.log(remainingOfBusinessSeats)
  console.log(remainingOfEconomySeats)
  console.log(User.ReservedFlights);

  const data = {
    NumberOfBusinessClassSeats: remainingOfBusinessSeats,
    NumberOfEconomySeats: remainingOfEconomySeats
  }

  if (bookedFlight) {
    await flight.updateOne({ _id: ObjectId(bookedFlightId) }, data);
    const reservedFlight = await flight.findOne({ _id: ObjectId(bookedFlightId) });
    User.ReservedFlights.push(reservedFlight);
    await User.save();
    res.send({ message: "true" });
  } else {
    res.send({ message: "false" });
  }

});

app.put('/editUserInfo', async (req, res) => {

  const data = {
    OldFirstName: req.body.OldFirstName,
    OldLasttName: req.body.OldLastName,
    OldPassportNumber: req.body.OldPassportNumber,

    NewFirstName: req.body.NewFirstName,
    NewLastName: req.body.NewLastName,
    NewEmail: req.body.NewEmail,
    NewPassportNumber: req.body.NewPassportNumber
  }

  const currentEmail = req.body.CurrentEmail;

  console.log(data);

  if (data.NewFirstName) {
    await user.updateOne({ Email: currentEmail }, { FirstName: data.NewFirstName });
  }

  if (data.NewLastName) {
    await user.updateOne({ Email: currentEmail }, { LastName: data.NewLastName });
  }

  if (data.NewEmail) {
    await user.updateOne({ Email: currentEmail }, { Email: data.NewEmail });
  }

  if (data.NewPassportNumber) {
    await user.updateOne({ Email: currentEmail }, { PassportNumber: data.NewPassportNumber });
  }
});


app.post('/deleteFlight', async (req, res) => {
  const deleteFlightId = req.body.id;
  const admin = req.body.Admin;

  if (admin == "Administrator") {
    const Flight = await flight.findOne({ _id: ObjectId(deleteFlightId) });
    await flight.deleteOne(Flight);
    res.status(200).send({ message: 'true' });
  } else {
    res.status(403).send({ message: 'false' });
  }

});

app.put('/updateFlight', async (req, res) => {
  const updateFlightId = req.body.id;

  const data = {
    ArrivalDateAndTime: req.body.ArrivalDateAndTime,
    DepartureDateAndTime: req.body.DepartureDateAndTime,
    FlightNumber: req.body.FlightNumber,
    NumberOfEconomySeats: req.body.NumberOfEconomySeats,
    NumberOfBusinessClassSeats: req.body.NumberOfBusinessClassSeats,
    Airport: req.body.Airport
  }

  const FlightNumber = req.body.FlightNumber;
  const Airport = req.body.Airport;

  const valid = await flight.findOne({ where: { FlightNumber, Airport } });


  if (valid) {
    console.log("Valid")
    if (data.FlightNumber) {
      await flight.updateOne({ _id: ObjectId(updateFlightId) }, { FlightNumber: req.body.FlightNumber });
    }

    if (data.Airport) {
      await flight.updateOne({ _id: ObjectId(updateFlightId) }, { Airport: req.body.Airport });
    }

    if (data.NumberOfEconomySeats) {
      await flight.updateOne({ _id: ObjectId(updateFlightId) }, { NumberOfEconomySeats: req.body.NumberOfEconomySeats });
    }

    if (data.NumberOfBusinessClassSeats) {
      await flight.updateOne({ _id: ObjectId(updateFlightId) }, { NumberOfBusinessClassSeats: req.body.NumberOfBusinessClassSeats });
    }

    if (data.ArrivalDateAndTime) {
      await flight.updateOne({ _id: ObjectId(updateFlightId) }, { ArrivalDateAndTime: req.body.ArrivalDateAndTime });
    }

    if (data.DepartureDateAndTime) {
      await flight.updateOne({ _id: ObjectId(updateFlightId) }, { DepartureDateAndTime: req.body.DepartureDateAndTime });
    }

  }
});

app.post('/createFlight', async (req, res) => {

  const FlightNumber = req.body.FlightNumber;
  const Airport = req.body.Airport;

  const data = {
    FlightType: req.body.FlightType,
    ArrivalDateAndTime: req.body.ArrivalDateAndTime,
    DepartureDateAndTime: req.body.DepartureDateAndTime,
    FlightNumber: req.body.FlightNumber,
    NumberOfEconomySeats: req.body.NumberOfEconomySeats,
    NumberOfBusinessClassSeats: req.body.NumberOfBusinessClassSeats,
    Airport: req.body.Airport,
    ArrivalAirport: req.body.ArrivalAirport,
    Price: req.body.Price,
    BaggageAllowance: req.body.BaggageAllowance
  }


  const flightNumber = await flight.findOne({ FlightNumber });
  const airport = await flight.findOne({ Airport });

  if (flightNumber) {

    if (airport) {

      if (flightNumber.FlightNumber == FlightNumber && airport.Airport == Airport) {
        res.status(403).send({ message: 'false' });
      } else {
        await flight.create(data);
        res.status(200).send({ message: 'true' });
      }

    } else {
      await flight.create(data);
      res.status(200).send({ message: 'true' });
    }

  } else {
    await flight.create(data);
    res.status(200).send({ message: 'true' });
  }
});

app.get('/getAllAvailableFlights', async (req, res) => {
  const flights = await flight.find();
  res.status(200).send(flights);
});

app.get('/getAllAvailableUsers', async (req, res) => {
  const users = await user.find();
  res.status(200).send(users);
});

app.get('/addUser', async (req, res) => {

  const Admin = {
    FirstName: "Mohamed",
    LastName: "Safar",
    Password: "1",
    Email: "m@yahoo.com",
    type: "Adminstrator",
    PassportNumber: "123456",
  }

  const Userdata = {
    FirstName: "Ahmed",
    LastName: "Sameer",
    Password: "2",
    Email: "a@yahoo.com",
    type: "male",
    ReservedFlights: [],
    Seats:[],
    PassportNumber: "012345",
  }

  const Userdata1 = {
    FirstName: "khaled",
    LastName: "ashraf",
    Password: "6",
    Email: "k@yahoo.com",
    type: "female",
    ReservedFlights: [],
    Seats:[],
    PassportNumber: "5555",
  }



  await user.create(Admin);
  await user.create(Userdata);
  await user.create(Userdata1);

});

app.post('/Summary', async (req, res) => {
  const email = req.body.email;
 // console.log(email);
  const TheUser = await user.findOne({Email:email});
 // console.log(TheUser.Email);
  const flights =  TheUser.ReservedFlights;

 res.status(200).send(flights);
});

app.post('/GetIDandEmail', async (req, res) => {
  F_ID= req.body.FlightID;
  UserEmail  = req.body.UserEmail;
  res.status(200).send({ message: 'true' });
});

app.get('/PostID&Email', async (req, res) => {
  const data={F_ID,UserEmail}
 // console.log(data);

 res.status(200).send(data);
});

app.post('/GetFlight', async (req, res) => {
 const FlightID = req.body.fid;
 //console.log(FlightID);
 const UserEmail = req.body.UserEmail;
  const Flight = await flight.findOne({ _id: ObjectId(FlightID) });
 const NumberOfEconomySeats=Flight.NumberOfEconomySeats;
 const NumberOfBusinessClassSeats=Flight.NumberOfBusinessClassSeats;
 //console.log(Flight);
 const data ={
  NumberOfEconomySeats,
  NumberOfBusinessClassSeats
 }
 res.status(200).send(data);
});

app.post('/SetSeats', async (req, res) => {
  const Seat= req.body.number;
  const email= req.body.email;
  const classtype= req.body.classtype;
  const TheUser = await user.findOne({ Email:email});
  const data ={classtype,Seat}
  TheUser.Seats.push(data);
    await TheUser.save();
  
  res.status(200).send({ message: 'true' });
});



app.listen(8000, () => {
  console.log(`Listening to requests on http://localhost:${8000}`);
});