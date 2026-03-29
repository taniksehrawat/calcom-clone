"use client";

import BookingModal from "@/components/BookingModal";
import { useEffect, useState } from "react";
import { getEvents, getSlots } from "@/lib/api";

export default function BookingClient({ slug }) {
  const [event, setEvent] = useState(null);
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState("2026-03-30");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ DEBUG
  console.log("SLUG PROP:", slug);

  // 🔥 Fetch event
  useEffect(() => {
    const fetchEvent = async () => {
      const events = await getEvents();

      console.log("EVENTS:", events);

      const found = events.find((e) => e.slug === slug);

      console.log("FOUND EVENT:", found);

      setEvent(found);
    };

    if (slug) fetchEvent();   // ✅ IMPORTANT
  }, [slug]);

  // 🔥 Fetch slots
  useEffect(() => {
    if (!event) return;

    const fetchSlots = async () => {
      const data = await getSlots(event.id, date);

      console.log("SLOTS:", data);

      setSlots(data || []);
    };

    fetchSlots();
  }, [event, date]);

  if (!event) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-8">
      <div className="w-full max-w-5xl bg-white border rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT */}
        <div className="p-8 border-r">
          <p className="text-sm text-gray-500 mb-2">Event</p>

          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            {event.title}
          </h1>

          <p className="text-gray-600 mb-6">
            Book a quick meeting.
          </p>

          <div className="flex items-center gap-2 text-gray-500">
            ⏱ <span>{event.duration} mins</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Select a Date & Time
          </h2>

          <input
            type="date"
            value={date}
            onChange={(e) => {
              setSelectedSlot(null);
              setDate(e.target.value);
            }}
            className="border rounded-lg p-3 mb-6 w-full"
          />

          <div className="grid grid-cols-3 gap-3">
            {slots.map((slot) => {
              const isSelected = selectedSlot === slot.time;

              return (
                <button
                  key={slot.time}
                  onClick={() => {
                    setSelectedSlot(slot.time);
                    setShowModal(true);
                  }}
                  className={`py-2 rounded-lg text-sm border transition
                    ${
                      isSelected
                        ? "bg-black text-white border-black"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>

          {selectedSlot && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">Selected</p>
              <p className="font-medium">
                {date} at {selectedSlot}
              </p>
            </div>
          )}

          <BookingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            event={event}
            date={date}
            time={selectedSlot}
          />
        </div>
      </div>
    </div>
  );
}