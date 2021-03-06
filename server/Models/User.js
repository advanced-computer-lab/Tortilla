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
    Username: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    telephonenumbers: {
        type: Array,
        required: true
    },
    PassportNumber: {
        type: String,
        required: true
    },
    homeAddress: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
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
    },
    Token: {
        type: String,
        required: false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;