const prisma = require("../lib/prisma");

// helper → adds minutes to HH:mm
const addMinutes = (time, minsToAdd) => {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes + minsToAdd);

  return date.toTimeString().slice(0, 5);
};

const getAvailableSlots = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { date } = req.query;

    // ✅ Validate input
    if (!date) {
      return res.status(400).json({
        error: "date query param required (YYYY-MM-DD)",
      });
    }

    // ✅ Parse date ONCE
    const selectedDate = new Date(date);
    const day = selectedDate.getDay();

    // ✅ Get event
    const event = await prisma.eventType.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    // ✅ Get availability
    const availability = await prisma.availability.findMany({
      where: { eventId },
    });

    // ✅ Create day boundaries
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // ✅ Get bookings
    const bookings = await prisma.booking.findMany({
      where: {
        eventId,
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    // ✅ Booked times set
    const bookedSet = new Set(
      bookings.map((b) =>
        new Date(b.startTime).toISOString().slice(11, 16)
      )
    );

    let availableSlots = [];

    console.log("Duration:", event.duration);
    console.log("Buffer:", event.bufferTime);

    for (let avail of availability) {
      // ✅ Day filtering
      if (avail.dayOfWeek !== day) continue;

      let currentTime = avail.startTime;

      while (currentTime < avail.endTime) {
        if (!bookedSet.has(currentTime)) {
          availableSlots.push({
            date,
            dayOfWeek: avail.dayOfWeek,
            time: currentTime,
          });
        }

        // ✅ Buffer logic
        currentTime = addMinutes(
          currentTime,
          event.duration + event.bufferTime
        );
      }
    }

    res.json(availableSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

module.exports = { getAvailableSlots };