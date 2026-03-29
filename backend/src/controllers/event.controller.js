const prisma = require("../lib/prisma");


// GET all events
const getEvents = async (req, res) => {
  try {
    const events = await prisma.eventType.findMany();

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};


// Create event type
const createEvent = async (req, res) => {
  try {
    const { title, duration, userId , bufferTime} = req.body;

    // Validation
    if (!title || !duration || !userId) {
      return res.status(400).json({
        error: "title, duration and userId are required",
      });
    }

    // Generate slug (basic version)
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const event = await prisma.eventType.create({
      data: {
        title,
        duration,
        slug,
        userId,
        bufferTime: bufferTime || 0,
      },
    });

    res.status(201).json(event);
  } catch (error) {
      console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

module.exports = {
  createEvent,
  getEvents, // 👈 add this
};