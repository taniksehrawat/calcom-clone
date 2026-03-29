const express = require("express");
const router = express.Router();
const { getAvailableSlots } = require("../controllers/slot.controller");

router.get("/:eventId", getAvailableSlots);

module.exports = router;