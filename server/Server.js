const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const user = require('./Models/User');
const flight = require('./Models/Flight');
const nodemailer = require('nodemailer')
const ObjectId = require('mongodb').ObjectId;
<<<<<<< HEAD

var F_ID = 0;
var UserEmail = "";
=======
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const stripe = require("stripe")("sk_test_51KAJHLC9bIWLACdlQPoQeDwEYIXGm2o07vrxX51LS7pi2xK661KpVG7pSfYixVTjTrgAdRvqw3fbDz7Z8mZ61cSb005yR8SCQ0");
const uuid = require("uuid").v4;

var F_ID = 0;
>>>>>>> safar

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("MongoDB is now connected"))
  .catch(err => console.log(err));

<<<<<<< HEAD

app.post('/sendCancelationEmail', (req, res) => {

  const userEmail = req.body.email;

  const f = await flight.findOne({ _id: ObjectId(req.body.id) });

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "ACL.600@outlook.com",
=======
//Payment
app.post('/payment', (req, res) => {
  const { token, amount } = req.body;
  const idempotencyKey = uuid();

  return (stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer => {
    stripe.charges.create({
      amount: amount*100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,

    }, { idempotencyKey: idempotencyKey })
  }).then(result => res.status(200).json(result))
    .catch(err =>
      console.log(err)
    )
  )
});

//Authentication
app.post('/register', async (req, res) => {

  const Userdata = {
    FirstName: req.body.firstName,
    LastName: req.body.lastName,
    Username: req.body.username,
    Password: req.body.password,
    Email: req.body.email,
    telephonenumbers: req.body.telephonenumbers,
    PassportNumber: req.body.passportNumber,
    homeAddress: req.body.homeAddress,
    countryCode: req.body.countryCode
  }

  const salt = await bcrypt.genSalt(10);
  hashPassword = Userdata.Password = bcrypt.hashSync(Userdata.Password, salt);

  await user.create(Userdata);
  return res.status(201).send({ message: 'true' });
});

app.post('/login', async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  const userExist = await user.findOne({ Email: email });

  if (!userExist)
    return res.status(403).send({ message: 'false' });

  if (!bcrypt.compareSync(password, userExist.Password))
    return res.status(403).send({ message: 'false' });


  const token = jwt.sign({ user_id: user._id }, "SECRET", { expiresIn: "2h" });

  await user.updateOne({ Email: email }, { Token: token });

  res.status(201).send({ token: token });
});

app.post('/logout', async (req, res) => {
  const userToken = req.body.token;
  await user.updateOne({ Token: userToken }, { Token: "" });
  res.status(201).send({ message: "true" });
});

app.put('/changePassword', async (req, res) => {
  var oldPassword = req.body.OldPassword;
  var newPassword = req.body.NewPassword;
  const userToken = req.body.token;

  const userExist = await user.findOne({ Token: userToken });

  if (!bcrypt.compareSync(oldPassword, userExist.Password))
    return res.status(403).send({ message: 'false' });

  const salt = await bcrypt.genSalt(10);
  hashPassword = newPassword = bcrypt.hashSync(newPassword, salt);

  await user.updateOne({ Token: userToken }, { Password: newPassword });

  res.status(201).send({ message: 'Done' });

});
//End

//Send Email
app.post('/sendEmail', async (req, res) => {

  const userToken = req.body.token;

  const f = await flight.findOne({ _id: ObjectId(req.body.id) });

  const User = await user.findOne({ Token: userToken });

  //const userEmail = User.Email;

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "ACL.900@outlook.com",
>>>>>>> safar
      pass: "acl123456"
    },
  });

  const mailOptions = {
<<<<<<< HEAD
    from: 'ACL.600@outlook.com',
    to: userEmail,
    subject: 'This is a cancelation mail',
    text: `Hello user, we want to infrom you that your flight has been canceled. Amount to be refunded ${f.Price}`
=======
    from: 'ACL.900@outlook.com',
    to: "ACL.600@outlook.com",
    subject: 'This is a cancelation mail',
    text: `Hello user, we want to infrom you with your flight details -->  
    ${f.FlightType,
      f.FlightNumber,
      f.DepartureDateAndTime,
      f.ArrivalDateAndTime,
      f.NumberOfEconomySeats,
      f.NumberOfBusinessClassSeats,
      f.ArrivalAirport,
      f.Airport,
      f.Price,
      f.BaggageAllowance,
      User.Seats
      }`
>>>>>>> safar
  }

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent : ' + info.response);
      res.status(200).send({ message: 'Email sent' });
    }
  })

});

<<<<<<< HEAD
app.post('/bookFlight', async (req, res) => {

  const bookedFlightId = req.body.id;
  const userEmail = req.body.email;

  const NumberOfReservedBusiness = req.body.NumberOfReservedBusiness;
  const NumberOfReservedEconomy = req.body.NumberOfReservedEconomy;

  const bookedFlight = await flight.findOne({ _id: ObjectId(bookedFlightId) });

  const User = await user.findOne({ Email: userEmail });

  const remainingOfBusinessSeats = bookedFlight.NumberOfBusinessClassSeats - NumberOfReservedBusiness;
  const remainingOfEconomySeats = bookedFlight.NumberOfEconomySeats - NumberOfReservedEconomy;

  const data = {
    NumberOfBusinessClassSeats: remainingOfBusinessSeats,
    NumberOfEconomySeats: remainingOfEconomySeats
  }

  if (bookedFlight) {
    const reservedFlight = await flight.findOne({ _id: ObjectId(bookedFlightId) });
    User.ReservedFlights.push(reservedFlight);
    await User.save();
    res.send({ message: "true" });
  } else {
    res.send({ message: "false" });
  }

});

app.put('/editUserInfo', async (req, res) => {
=======
app.post('/sendCancelationEmail', async (req, res) => {

  const userToken = req.body.token;

  const f = await flight.findOne({ _id: ObjectId(req.body.id) });

  const User = await user.findOne({ Token: userToken });

  //const userEmail = User.Email;

  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "ACL.900@outlook.com",
      pass: "acl123456"
    },
  });

  const mailOptions = {
    from: 'ACL.900@outlook.com',
    to: "ACL.600@outlook.com",
    subject: 'This is a cancelation mail',
    text: `Hello user, we want to infrom you that your flight has been canceled. Amount to be refunded ${f.Price}`
  }

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent : ' + info.response);
      res.status(200).send({ message: 'Email sent' });
    }
  })

});
//End

app.put('/editUserInfo', async (req, res) => {
  const userToken = req.body.token;
>>>>>>> safar

  const data = {
    OldFirstName: req.body.OldFirstName,
    OldLasttName: req.body.OldLastName,
    OldPassportNumber: req.body.OldPassportNumber,

    NewFirstName: req.body.NewFirstName,
    NewLastName: req.body.NewLastName,
    NewEmail: req.body.NewEmail,
    NewPassportNumber: req.body.NewPassportNumber
  }

<<<<<<< HEAD
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
=======
  if (data.NewFirstName) {
    await user.updateOne({ Token: userToken }, { FirstName: data.NewFirstName });
  }

  if (data.NewLastName) {
    await user.updateOne({ Token: userToken }, { LastName: data.NewLastName });
  }

  if (data.NewEmail) {
    await user.updateOne({ Token: userToken }, { Email: data.NewEmail });
  }

  if (data.NewPassportNumber) {
    await user.updateOne({ Token: userToken }, { PassportNumber: data.NewPassportNumber });
  }

  return res.status(200).send({ message: 'true' });

>>>>>>> safar
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

  const Bseats = [];
  const Eseats = [];
  for (var i = 0; i < req.body.NumberOfBusinessClassSeats; i++) {
    Bseats.push(i + 1);
  }
  for (var i = 0; i < req.body.NumberOfEconomySeats; i++) {
    Eseats.push(i + 1);
  }
  //console.log(Bseats);

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
    BaggageAllowance: req.body.BaggageAllowance,
    BusSeats: Bseats,
    EcoSeats: Eseats
  }

  console.log();
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

<<<<<<< HEAD
app.get('/getReservedFlights:email', async (req, res) => {
  const Email = req.params.email;
  const User = await user.findOne({ Email: Email });
  res.status(200).send(User.ChosenFlights);
});

app.post('/SummaryChosen', async (req, res) => {
  const email = req.body.email;
  const TheUser = await user.findOne({ Email: email });
  const flights = TheUser.ReservedFlights;

  const data = {
    Seats: TheUser.Seats,
    flights: flights
  }

  res.status(200).send(data);
});


app.post('/cancelReservedFlight', async (req, res) => {
  const Email = req.body.email;
  const cancelFlightId = req.body.id;

  const User = await user.findOne({ Email: Email });
  const records = User.ReservedFlights;

  for (var i = 0; i < records.length; i++) {
    if (cancelFlightId + "" == records[i]._id + "") {
      records.splice(i, 1);
      await User.save();
    }
  }

  res.status(200).send(records);

});

app.post('/cancelChosenFlight', async (req, res) => {
  const Email = req.body.email;
  const cancelFlightId = req.body.id;

  const User = await user.findOne({ Email: Email });
  const records = User.ChosenFlights;
=======
app.post('/addFlightToChosen', async (req, res) => {

  const chosenFlightId = req.body.chosenFlightId;
  const chosenFlight = await flight.findOne({ _id: ObjectId(chosenFlightId) });

  const userToken = req.body.token;
  const theUser = await user.findOne({ Token: userToken });

  const records = theUser.ChosenFlights;

  if (chosenFlight) {
    records.push(chosenFlight);
    await theUser.save();
    return res.status(200).send({ message: 'true' });
  }
  return res.status(403).send({ message: 'false' });

});

app.post('/addFlightToReserved', async (req, res) => {
  const ReservedFlightId = req.body.ReservedFlightId;
  const ReservedFlight = await flight.findOne({ _id: ObjectId(ReservedFlightId) });

  const userToken = req.body.token;
  const theUser = await user.findOne({ Token: userToken });

  const records = theUser.ReservedFlights;

  const r = theUser.ChosenFlights;

  for (var i = 0; i < r.length; i++) {
    if (ReservedFlightId == r[i]._id) {
      r.splice(i, 1);
      await theUser.save();
    }
  }

  if (ReservedFlight) {
    records.push(ReservedFlight);
    await theUser.save();
    return res.status(200).send({ message: 'true' });
  }

  return res.status(403).send({ message: 'false' });

});

app.get('/getAllChosenFlights:userToken', async (req, res) => {
  const userToken = req.params.userToken;
  const theUser = await user.find({ Token: userToken });

  const data = {
    Seats: theUser[0].Seats,
    flights: theUser[0].ChosenFlights
  }
  return res.status(200).send(data);
});

app.get('/getReservedFlights:userToken', async (req, res) => {
  const userToken = req.params.userToken;
  const theUser = await user.findOne({ Token: userToken });
  const data = {
    flights: theUser.ReservedFlights,
    Seats: theUser.Seats,
  }
  return res.status(200).send(data);
});

app.post('/cancelChosenFlight', async (req, res) => {

  const userToken = req.body.token;
  const cancelFlightId = req.body.id;

  const theUser = await user.findOne({ Token: userToken });
  const records = theUser.ChosenFlights;
>>>>>>> safar

  const f = await flight.findOne({ _id: ObjectId(cancelFlightId) });

  for (var i = 0; i < records.length; i++) {
    if (cancelFlightId == records[i]._id) {
      records.splice(i, 1);
<<<<<<< HEAD
      await User.save();
    }
  }

  const len = User.Seats.length;
=======
      await theUser.save();
    }
  }

  const len = theUser.Seats.length;
>>>>>>> safar

  const index = [];

  for (var i = 0; i < len; i++) {
<<<<<<< HEAD
    if (cancelFlightId == User.Seats[i].id) {
      index.push(User.Seats[i]);
      if (User.Seats[i].classtype === "Business") {
        f.BusSeats.push(User.Seats[i].Seat);
      }
      if (User.Seats[i].classtype === "Economy") {
        f.EcoSeats.push(User.Seats[i].Seat);
=======
    if (cancelFlightId == theUser.Seats[i].id) {
      index.push(theUser.Seats[i]);
      if (theUser.Seats[i].classtype === "Business") {
        f.BusSeats.push(theUser.Seats[i].Seat);
      }
      if (theUser.Seats[i].classtype === "Economy") {
        f.EcoSeats.push(theUser.Seats[i].Seat);
>>>>>>> safar
      }
    }
  }
  await f.save();

<<<<<<< HEAD

  for (var i = 0; i < index.length; i++) {
    const place = User.Seats.indexOf(index[i])
    User.Seats.splice(place, 1);
  }
  await User.save();
=======
  for (var i = 0; i < index.length; i++) {
    const place = theUser.Seats.indexOf(index[i])
    theUser.Seats.splice(place, 1);
  }
  await theUser.save();
>>>>>>> safar

  res.status(200).send(records);

});

<<<<<<< HEAD
app.post('/SummaryReserved', async (req, res) => {
  const email = req.body.UserEmail;
  const FlightID = req.body.FlightID;
  const TheUser = await user.findOne({ Email: email });
  const records = TheUser.ReservedFlights;

  const f = await flight.findOne({ _id: ObjectId(FlightID) });

  const recordChosen = TheUser.ChosenFlights;

  for (var i = 0; i < records.length; i++) {
    if (ObjectId(FlightID) + "" == records[i]._id + "") {
      recordChosen.push(f);
      await TheUser.save();
    }
  }

});

app.post('/GetIDandEmail', async (req, res) => {
  F_ID = req.body.FlightID;
  UserEmail = req.body.UserEmail;
  res.status(200).send({ message: 'true' });
});

app.post('/addReservedFlight', async (req, res) => {
  F_ID = req.body.FlightID;
  UserEmail = req.body.UserEmail;

  const Flight = await flight.findOne({ _id: ObjectId(F_ID) });
  const User = await user.findOne({ Email: UserEmail });

  res.status(200).send({ message: 'true' });
});

app.get('/PostID&Email', async (req, res) => {
  const data = { F_ID, UserEmail }
  // console.log(data);

  res.status(200).send(data);
=======
app.post('/cancelReservedFlight', async (req, res) => {

  const userToken = req.body.token;
  const cancelFlightId = req.body.id;

  const theUser = await user.findOne({ Token: userToken });
  const records = theUser.ReservedFlights;

  const f = await flight.findOne({ _id: ObjectId(cancelFlightId) });

  for (var i = 0; i < records.length; i++) {
    if (cancelFlightId == records[i]._id) {
      records.splice(i, 1);
      await theUser.save();
    }
  }

  const len = theUser.Seats.length;

  const index = [];

  for (var i = 0; i < len; i++) {
    if (cancelFlightId == theUser.Seats[i].id) {
      index.push(theUser.Seats[i]);
      if (theUser.Seats[i].classtype === "Business") {
        f.BusSeats.push(theUser.Seats[i].Seat);
      }
      if (theUser.Seats[i].classtype === "Economy") {
        f.EcoSeats.push(theUser.Seats[i].Seat);
      }
    }
  }
  await f.save();

  for (var i = 0; i < index.length; i++) {
    console.log(theUser.Seats.indexOf(index[i]));
    const place = theUser.Seats.indexOf(index[i])
    theUser.Seats.splice(place, 1);
  }
  await theUser.save();

  res.status(200).send(records);

});

app.post('/PostID', async (req, res) => {
  F_ID = req.body.FlightID;
  return res.status(200).send({ message: 'true' });
});

app.get('/GetID', async (req, res) => {
  const data = { F_ID }
  return res.status(200).send(data);
>>>>>>> safar
});

app.post('/GetFlight', async (req, res) => {
  const FlightID = req.body.fid;
<<<<<<< HEAD
  //console.log(FlightID);
  const UserEmail = req.body.UserEmail;
  const Flight = await flight.findOne({ _id: ObjectId(FlightID) });
  const EcoSeats = Flight.EcoSeats;
  const BusSeats = Flight.BusSeats;
  //console.log(Flight);
=======
  const Flight = await flight.findOne({ _id: ObjectId(FlightID) });
  const EcoSeats = Flight.EcoSeats;
  const BusSeats = Flight.BusSeats;
>>>>>>> safar
  const data = {
    EcoSeats,
    BusSeats
  }
<<<<<<< HEAD
  res.status(200).send(data);
});

app.post('/SetSeats', async (req, res) => {
  const SeatIndex = req.body.number;
  const Seat = req.body.seat;

  const email = req.body.email;
  const id = F_ID;
  const classtype = req.body.classtype;

  const TheUser = await user.findOne({ Email: email });

  const data = { classtype, Seat, id }

  TheUser.Seats.push(data);
  await TheUser.save();
=======
  return res.status(200).send(data);
});

app.post('/SetSeats', async (req, res) => {
  const userToken = req.body.token;
  const theUser = await user.findOne({ Token: userToken });
  const Seat = req.body.seat;
  const id = F_ID;
  const classtype = req.body.classtype;
  const data = { classtype, Seat, id }
  theUser.Seats.push(data);
  await theUser.save();
>>>>>>> safar

  const myflight = await flight.findOne({ _id: ObjectId(F_ID) });
  if (classtype == "Business") {
    const place = myflight.BusSeats.indexOf(Seat);
    myflight.BusSeats.splice(place, 1);
  }
  if (classtype == "Economy") {
    const place1 = myflight.EcoSeats.indexOf(Seat);
    myflight.EcoSeats.splice(place1, 1);
  }
  await myflight.save();

  res.status(200).send({ message: 'true' });
});

<<<<<<< HEAD

app.listen(8000, () => {
  console.log(`Listening to requests on http://localhost:${8000}`);
});





// app.get('/addUser', async (req, res) => {

//   const Admin = {
//     FirstName: "Mahmoud",
//     LastName: "Safar",
//     Password: "1",
//     Email: "m@yahoo.com",
//     type: "user",
//     PassportNumber: "1234567",
//   }

//   const Userdata = {
//     FirstName: "A",
//     LastName: "S",
//     Password: "2",
//     Email: "a@yahoo.com",
//     type: "user",
//     ReservedFlights: [],
//     ChosenFlights: [],
//     PassportNumber: "0123456",
//   }


//   const Userdata1 = {
//     FirstName: "E",
//     LastName: "S",
//     Password: "3",
//     Email: "E@yahoo.com",
//     type: "user",
//     ReservedFlights: [],
//     ChosenFlights: [],
//     PassportNumber: "0123456",
//   }

//   await user.create(Admin);
//   await user.create(Userdata);
//   await user.create(Userdata1);

// });
=======
app.post('/removeSeat', async (req, res) => {

  const userToken = req.body.token;
  const seat = req.body.seat;
  const classtype = req.body.classtype;
  const flightId = req.body.flightId;

  const theUser = await user.findOne({ Token: userToken });
  const f = await flight.findOne({ _id: ObjectId(flightId) });

  var records = theUser.Seats;
  for (var i = 0; i < records.length; i++) {
    if ((theUser.Seats[i].classtype == classtype) && (theUser.Seats[i].Seat == seat)) {
      records.splice(i, 1);
      await theUser.save();
    }
  }
  if (classtype === "Business") {
    f.BusSeats.push(seat);
  }
  if (classtype === "Economy") {
    f.EcoSeats.push(seat);
  }
  await f.save();

  res.status(200).send({ message: 'true' });
});


app.listen(8000, () => {
  console.log(`Listening to requests on http://localhost:${8000}`);
});
>>>>>>> safar
