const express = require("express");
const router = express.Router();
const { addAvailability } = require("../controllers/availability.controller");

// Add availability
router.post("/", addAvailability);

module.exports = router;