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
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    PassportNumber: {
        type: String,
        required: true
    },
    ReservedFlights: {
        type: Array,
        required: false
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;