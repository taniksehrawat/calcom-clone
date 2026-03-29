const prisma = require("../lib/prisma");

// Add availability
const addAvailability = async (req, res) => {
  try {
    const { eventId, dayOfWeek, startTime, endTime } = req.body;

    // Validation
    if (!eventId || dayOfWeek === undefined || !startTime || !endTime) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const availability = await prisma.availability.create({
      data: {
        eventId,
        dayOfWeek,
        startTime,
        endTime,
      },
    });

    res.status(201).json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

module.exports = { addAvailability };