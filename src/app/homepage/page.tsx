
import { getEvents } from "@/lib/events";
import EventsGallery from "@/components/events/EventsGallery";

export default async function Homepage() {
    const events = await getEvents();

    return (
        <main>
            <section className="container mx-auto px-6 py-12">
                <h1 className="mb-8 text-3xl font-bold">
                    Our Events
                </h1>

                <EventsGallery events={events} />
            </section>
        </main>
    );
}
