
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/events";
import EventDetails from "@/components/events/EventDetails";

type Props = {
    params: Promise<{ eventId: string }>;
};

export default async function EventPage({ params }: Props) {
    const { eventId } = await params;

    const event = await getEvent(Number(eventId));

    if (!event) {
        notFound();
    }

    return (
        <main className="container mx-auto px-6 py-12">
            <EventDetails event={event} />
        </main>
    );
}
