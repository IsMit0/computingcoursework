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
      caption?: string | null;
    }[];
  }[];
};

function formatEventDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventDetails({ event }: { event: Event }) {
  const eventImages = event.posts.flatMap((post) => post.images);
  const heroImage = eventImages[0]?.url;

  return (
    <div className="space-y-12">
      {/* Back navigation */}
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span>
        Back to events
      </Link>

      {/* Event hero */}
      <section className="relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl border-2 border-border bg-secondary sm:min-h-[440px]">
        {heroImage && (
          <Image
            src={heroImage}
            alt={event.name}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 p-6 text-white sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Vinovia event
          </p>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            {event.name}
          </h1>

          <p className="mt-4 text-sm font-medium text-white/80 sm:text-base">
            {formatEventDate(event.event_date)}
          </p>
        </div>
      </section>

      {/* Event description */}
      <section className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          About the event
        </p>

        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {event.description ||
            "Explore the memories and moments from this Vinovia event."}
        </p>
      </section>

      {/* Event posts */}
      <section>
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Event memories
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Event Posts
          </h2>

          <p className="mt-3 text-muted-foreground">
            Explore the stories, photographs and highlights from this event.
          </p>
        </div>

        {event.posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {event.posts.map((post) => (
              <Link
                key={post.post_id}
                href={`/events/${event.event_id}/posts/${post.post_id}`}
                className="group overflow-hidden rounded-2xl border-2 border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Post image */}
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  {post.images[0] ? (
                    <Image
                      src={post.images[0].url}
                      alt={post.images[0].caption || post.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-sm font-medium text-muted-foreground">
                        No photograph available
                      </span>
                    </div>
                  )}
                </div>

                {/* Post information */}
                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.body || "Discover the moments captured in this post."}
                  </p>

                  <p className="mt-5 text-sm font-semibold">
                    Read post <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-border bg-secondary/50 px-6 py-12 text-center">
            <h3 className="text-lg font-semibold">No posts yet</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Posts and photographs from this event will appear here.
            </p>
          </div>
        )}
      </section>

      {/* Bottom navigation */}
      <div className="border-t-2 border-border pt-8 text-center">
        <Link
          href="/events"
          className="inline-flex rounded-xl border-2 border-border bg-secondary px-6 py-3 font-semibold text-foreground transition-colors hover:bg-primary"
        >
          ← Back to all events
        </Link>
      </div>
    </div>
  );
}
