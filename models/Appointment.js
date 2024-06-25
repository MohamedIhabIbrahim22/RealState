const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: String,
    client: String,
    location: String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
