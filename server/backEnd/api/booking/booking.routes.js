// backEnd/api/booking/booking.routes.js

const express = require("express");
const router = express.Router();
const Booking = require("../../models/booking");

// @route   POST /api/booking
// @desc    Create a new booking
// @access  Public (no auth for now)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, destination, date, time, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !address || !destination || !date || !time) {
      return res.status(400).json({ error: "Please fill in all required fields." });
    }

    // Create and save new booking
    const newBooking = new Booking({
      name,
      email,
      phone,
      address,
      destination,
      date,
      time,
      message,
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking successful" });
  } catch (error) {
    console.error("Booking Error:", error.message);
    res.status(500).json({ error: "Server error during booking." });
  }
});

module.exports = router;
