import { getEvents } from "@/lib/events";
import EventsGrid from "@/components/events/EventsGrid";

export default async function EventsPage() {
  const events = await getEvents();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter((event) => new Date(`${event.event_date}T00:00:00`) >= today)
    .sort(
      (a, b) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime(),
    );

  const pastEvents = events
    .filter((event) => new Date(`${event.event_date}T00:00:00`) < today)
    .sort(
      (a, b) =>
        new Date(b.event_date).getTime() - new Date(a.event_date).getTime(),
    );

  return (
    <div className="space-y-16">
      {/* Page heading */}
      <section className="pt-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Explore Vinovia
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Our Events
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Discover the moments, adventures and memories that bring Vinovia
          together.
        </p>
      </section>

      {/* Upcoming events */}
      <section>
        <div className="mb-7">
          <h2 className="text-2xl font-bold sm:text-3xl">Upcoming Events</h2>

          <p className="mt-2 text-muted-foreground">
            See what's coming up in Vinovia.
          </p>
        </div>

        <EventsGrid
          events={upcomingEvents}
          emptyMessage="No upcoming events. Check back soon for what's happening next."
        />
      </section>

      {/* Past events */}
      <section>
        <div className="mb-7">
          <h2 className="text-2xl font-bold sm:text-3xl">Past Events</h2>

          <p className="mt-2 text-muted-foreground">
            Take a look back at our previous events and memories.
          </p>
        </div>

        <EventsGrid
          events={pastEvents}
          emptyMessage="No past events yet. Previous events will appear here."
        />
      </section>
    </div>
  );
}
