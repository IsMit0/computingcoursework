import { createClient } from '@/lib/client';

interface Event {
    name: string;
}

export default async function Home() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("tblevents")
        .select("*")
        .eq("event_id", 2);

    if (error) {
        return <p>Error Loading: {error.message}</p>;
    }

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {data?.map((event, index) => (
                    <li key={index}>
                        {event.name} — {event.event_date}
                    </li>
                ))}
            </ul>
        </div>
    );

}