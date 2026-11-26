"use client";

import { useState } from "react";
import Image from "next/image";
import EventsIsland from "@/components/events/EventsIsland";
import type { getEvents } from "@/lib/events";

type Event = Awaited<ReturnType<typeof getEvents>>[number];

type Props = {
  events: Event[];
  emptyMessage: string;
};

function formatEventDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventsGrid({ events, emptyMessage }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <button
              key={event.event_id}
              type="button"
              onClick={() => setSelectedEvent(event)}
              className="group overflow-hidden rounded-2xl border-2 border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <Image
                  src={event.thumbnail}
                  alt={event.name}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  {formatEventDate(event.event_date)}
                </p>

                <h3 className="text-xl font-bold tracking-tight">
                  {event.name}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {event.description ||
                    "Discover the memories from this Vinovia event."}
                </p>

                <p className="mt-5 text-sm font-semibold">
                  Explore event <span aria-hidden="true">→</span>
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-border bg-secondary/50 px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      )}

      <EventsIsland
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
