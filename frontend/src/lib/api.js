const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://calcom-clone-b89n.onrender.com/api";
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