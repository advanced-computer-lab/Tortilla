const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    FlightType: {
        type: String,
        required: true
    },
    FlightNumber: {
        type: Number,
        required: true,
    },
    DepartureDateAndTime: {
        type: String,
        required: true
    },
    ArrivalDateAndTime: {
        type: String,
        required: true
    },
    NumberOfEconomySeats: {
        type: Number,
        required: true
    },
    NumberOfBusinessClassSeats: {
        type: Number,
        required: true
    },
    ArrivalAirport: {
        type: String,
        required: true
    },
    Airport: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    BaggageAllowance: {
        type: Number,
        required: true
    },
    EcoSeats: {
        type: Array,
        required: false
    },
    BusSeats: {
        type: Array,
        required: false
    },
    isAvailable: {
        type: Boolean,
        required: false
    },
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;