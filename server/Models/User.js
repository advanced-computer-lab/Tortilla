const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true
    },
<<<<<<< HEAD
=======
    Username: {
        type: String,
        required: true,
    },
>>>>>>> safar
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
<<<<<<< HEAD
    type: {
        type: String,
=======
    telephonenumbers: {
        type: Array,
>>>>>>> safar
        required: true
    },
    PassportNumber: {
        type: String,
        required: true
    },
<<<<<<< HEAD
=======
    homeAddress: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
>>>>>>> safar
    ReservedFlights: {
        type: Array,
        required: false
    },
    ChosenFlights: {
        type: Array,
        required: false
    },
    Seats: {
        type: Array,
        required: false
<<<<<<< HEAD
=======
    },
    Token: {
        type: String,
        required: false
>>>>>>> safar
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;