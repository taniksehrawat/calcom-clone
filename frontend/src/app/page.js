"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/lib/api";
import Link from "next/link";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvents();
        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl font-bold">Cal.com Clone</h1>
        <p className="text-gray-600 mt-2">
          Select an event to schedule a meeting
        </p>
      </div>

      {/* EVENT LIST */}
      <div className="max-w-5xl mx-auto grid gap-6">
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => (
            <Link key={event.id} href={`/book/${event.slug}`}>
              <div className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-500 mt-2">
                  {event.duration} mins meeting
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}