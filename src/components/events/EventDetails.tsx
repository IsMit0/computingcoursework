
import Image from "next/image";
import Link from "next/link";

type Event = {
    event_id: number;
    name: string;
    event_date: string;
    description: string | null;
    posts: {
        post_id: number;
        title: string;
        body: string | null;
        images: {
            url: string;
        }[];
    }[];
};

export default function EventDetails({
    event,
}: {
    event: Event;
}) {
    return (
        <div>
            <Link
                href="/homepage"
                className="text-sm text-blue-600 hover:underline"
            >
                ← Back to homepage
            </Link>

            <h1 className="mt-6 text-3xl font-bold">
                {event.name}
            </h1>

            <p className="mt-2 text-gray-500">
                {new Date(event.event_date).toLocaleDateString()}
            </p>

            {event.description && (
                <p className="mt-4 max-w-3xl">
                    {event.description}
                </p>
            )}

            <h2 className="mb-6 mt-12 text-2xl font-semibold">
                Event posts
            </h2>

            {event.posts.length === 0 ? (
                <p>No posts have been added to this event yet.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {event.posts.map((post) => (
                        <Link
                            key={post.post_id}
                            href={`/events/${event.event_id}/posts/${post.post_id}`}
                            className="overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
                        >
                            {post.images[0] && (
                                <div className="relative h-56">
                                    <Image
                                        src={post.images[0].url}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                            )}

                            <div className="p-4">
                                <h3 className="text-lg font-semibold">
                                    {post.title}
                                </h3>

                                {post.body && (
                                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                                        {post.body}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
