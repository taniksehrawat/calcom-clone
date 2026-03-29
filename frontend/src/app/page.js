"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center px-6 py-12">

      {/* 🔥 NAVBAR */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-12">
        <h1 className="text-xl font-bold tracking-tight">
          ⚡ MeetEase
        </h1>
        <p className="text-sm text-gray-500">
          Simple Scheduling
        </p>
      </div>

      {/* 🔥 HERO SECTION */}
      <div className="text-center max-w-2xl mb-12">
        <h2 className="text-4xl font-semibold text-gray-900 leading-tight">
          Scheduling made <span className="text-black">simple</span>
        </h2>

        <p className="text-gray-600 mt-4 text-lg">
          Book meetings effortlessly with smart availability, buffer time, and
          real-time slot generation.
        </p>
      </div>

      {/* 🔥 EVENT LIST */}
      <div className="w-full max-w-2xl space-y-5">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => router.push(`/book/${event.slug}`)}
            className="group cursor-pointer bg-white border rounded-2xl p-6 flex justify-between items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {event.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                ⏱ {event.duration} mins meeting
              </p>
            </div>

            <div className="text-gray-400 group-hover:text-black transition">
              →
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 FOOTER */}
      <div className="mt-16 text-sm text-gray-400">
        Built with Next.js + Prisma 🚀
      </div>
    </div>
  );
}