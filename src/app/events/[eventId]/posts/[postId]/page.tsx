import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPost } from "@/lib/events";
import PostGallery from "@/components/events/PostGallery";

type Props = {
  params: Promise<{
    eventId: string;
    postId: string;
  }>;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { eventId, postId } = await params;

  const post = await getPost(Number(postId), Number(eventId));

  if (!post) {
    notFound();
  }

  const heroImage = post.images[0]?.url;
  const event = post.images[0]?.event;

  return (
    <div className="space-y-12">
      <Link
        href={`/events/${eventId}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span>
        Back to event
      </Link>

      <section className="relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl border-2 border-border bg-secondary sm:min-h-[440px]">
        {heroImage && (
          <Image
            src={heroImage}
            alt={post.title}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 p-6 text-white sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Vinovia memories
          </p>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            {post.title}
          </h1>

          <p className="mt-4 text-sm font-medium text-white/80 sm:text-base">
            {formatDate(post.created_at)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          About this post
        </p>

        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {post.body ||
            "Explore the photographs and memories captured in this Vinovia post."}
        </p>
      </section>

      <section>
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Captured moments
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Photo Gallery
          </h2>

          <p className="mt-3 text-muted-foreground">
            Explore the photographs from this post. Select any photograph to
            view it full-screen.
          </p>
        </div>

        <PostGallery images={post.images} />
      </section>

      {event && (
        <section className="rounded-2xl border-2 border-border bg-secondary/50 p-6 sm:p-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Part of this event
          </p>

          <h2 className="text-2xl font-bold">{event.name}</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {formatDate(event.event_date)}
          </p>

          <Link
            href={`/events/${eventId}`}
            className="mt-5 inline-flex font-semibold transition-colors hover:text-muted-foreground"
          >
            View event <span className="ml-2">→</span>
          </Link>
        </section>
      )}

      <div className="border-t-2 border-border pt-8 text-center">
        <Link
          href={`/events/${eventId}`}
          className="inline-flex rounded-xl border-2 border-border bg-secondary px-6 py-3 font-semibold text-foreground transition-colors hover:bg-primary"
        >
          ← Back to event
        </Link>
      </div>
    </div>
  );
}
