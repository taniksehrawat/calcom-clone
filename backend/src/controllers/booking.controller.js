const prisma = require("../lib/prisma");

// Create booking
const createBooking = async (req, res) => {
  try {
    const { eventId, startTime, name, email } = req.body;

    // Validation
    if (!eventId || !startTime || !name || !email) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Get event (to calculate duration)
    const event = await prisma.eventType.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    const start = new Date(startTime);

    // Calculate end time using duration
    const end = new Date(start.getTime() + event.duration * 60000);

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        eventId,
        startTime: start,
        endTime: end,
        name,
        email,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    // Handle double booking
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "This slot is already booked",
      });
    }

    console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

module.exports = { createBooking };