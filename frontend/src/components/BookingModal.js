"use client";

import { useState } from "react";
import { createBooking } from "@/lib/api";

export default function BookingModal({
  isOpen,
  onClose,
  event,
  date,
  time,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const startTime = new Date(`${date}T${time}:00.000Z`);
      const endTime = new Date(startTime.getTime() + event.duration * 60000);

      await createBooking({
        eventId: event.id,
        name,
        email,
        startTime,
        endTime,
        timezone: "UTC",
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">

        {!success ? (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Confirm Booking
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {date} at {time}
            </p>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 mb-3"
            />

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? "Booking..." : "Confirm"}
            </button>

            <button
              onClick={onClose}
              className="mt-3 text-sm text-gray-500 w-full"
            >
              Cancel
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">
              🎉 Booked!
            </h2>

            <p className="text-gray-500 text-sm">
              Your meeting is confirmed.
            </p>

            <button
              onClick={onClose}
              className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}