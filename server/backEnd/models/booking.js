// backEnd/models/booking.js

const mongoose = require("mongoose");

// Define schema based on frontend fields
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Name of the user
  email: { type: String, required: true },         // Email address
  phone: { type: String, required: true },         // Phone number
  address: { type: String, required: true },       // Pickup address
  destination: { type: String, required: true },   // Drop-off location
  date: { type: String, required: true },          // Booking date
  time: { type: String, required: true },          // Booking time
  message: { type: String },                       // Optional message
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
