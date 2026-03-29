const BASE_URL = "http://localhost:5000/api";

export const getEvents = async () => {
  const res = await fetch(`${BASE_URL}/events`);
  return res.json();
};

export const getSlots = async (eventId, date) => {
  const res = await fetch(
    `${BASE_URL}/slots/${eventId}?date=${date}`
  );
  return res.json();
};

export const createBooking = async (data) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};