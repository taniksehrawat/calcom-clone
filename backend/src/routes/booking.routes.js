const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/booking.controller");

// Create booking
router.post("/", createBooking);

module.exports = router;