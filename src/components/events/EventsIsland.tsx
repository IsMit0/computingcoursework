"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type EventImage = {
  image_id: number;
  storage_path: string;
  caption: string | null;
  sort_order: number | null;
  url: string;
};

type EventPost = {
  post_id: number;
  title: string;
  body: string | null;
  created_at: string;
  images: EventImage[];
};

type EventData = {
  event_id: number;
  name: string;
  event_date: string;
  description: string | null;
  thumbnail: string;
  posts: EventPost[];
};

type Props = {
  event: EventData | null;
  onClose: () => void;
};

function formatEventDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventsIsland({ event, onClose }: Props) {
  useEffect(() => {
    if (!event) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [event, onClose]);

  if (!event) return null;

  const imageCount = event.posts.reduce(
    (total, post) => total + post.images.length,
    0,
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-island-title"
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border-2 border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Vinovia event
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Event preview</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close event preview"
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl transition-colors hover:bg-secondary"
          >
            ×
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto">
          {/* Cover image */}
          <div className="relative aspect-video w-full bg-secondary">
            <Image
              src={event.thumbnail}
              alt={event.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-5 text-white sm:p-8">
              <p className="mb-2 text-sm font-medium text-white/80">
                {formatEventDate(event.event_date)}
              </p>

              <h2
                id="event-island-title"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                {event.name}
              </h2>
            </div>
          </div>

          <div className="space-y-8 p-5 sm:p-8">
            {/* Event information */}
            <section>
              <h3 className="text-xl font-bold">About this event</h3>

              <p className="mt-3 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                {event.description ||
                  "No event description has been added yet."}
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-secondary px-4 py-2">
                  {event.posts.length}{" "}
                  {event.posts.length === 1 ? "post" : "posts"}
                </span>

                <span className="rounded-full bg-secondary px-4 py-2">
                  {imageCount} {imageCount === 1 ? "photograph" : "photographs"}
                </span>
              </div>
            </section>

            {/* Event posts */}
            <section>
              <div className="mb-5">
                <h3 className="text-xl font-bold">Event posts</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Stories and highlights from this event.
                </p>
              </div>

              {event.posts.length > 0 ? (
                <div className="space-y-6">
                  {event.posts.map((post) => (
                    <article
                      key={post.post_id}
                      className="rounded-2xl border border-border bg-background/50 p-4 sm:p-5"
                    >
                      <h4 className="text-lg font-bold">{post.title}</h4>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>

                      {post.body && (
                        <p className="mt-4 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                          {post.body}
                        </p>
                      )}

                      {/* Post photographs */}
                      {post.images.length > 0 && (
                        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {post.images.map((image) => (
                            <div key={image.image_id}>
                              <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
                                <Image
                                  src={image.url}
                                  alt={image.caption || post.title}
                                  fill
                                  unoptimized
                                  sizes="(max-width: 640px) 50vw, 250px"
                                  className="object-cover"
                                />
                              </div>

                              {image.caption && (
                                <p className="mt-2 text-xs text-muted-foreground">
                                  {image.caption}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/events/${event.event_id}/posts/${post.post_id}`}
                        onClick={onClose}
                        className="mt-5 inline-flex text-sm font-semibold transition-opacity hover:opacity-70"
                      >
                        Read full post →
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-secondary/50 p-6 text-center text-sm text-muted-foreground">
                  No posts have been added to this event yet.
                </p>
              )}
            </section>

            {/* Full event page */}
            <div className="border-t border-border pt-6">
              <Link
                href={`/events/${event.event_id}`}
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-xl border-2 border-border bg-secondary px-6 py-4 font-semibold text-foreground transition-colors hover:bg-primary"
              >
                View Full Event →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
