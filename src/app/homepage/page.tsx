import Image from "next/image";
import Link from "next/link";
import { getGalleryImages } from "@/lib/events";
import EventsGallery from "@/components/events/EventsGallery";

export default async function Homepage() {
  const images = await getGalleryImages();
  const heroImage = images[0];

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section
        id="home"
        className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-2xl border-2 border-border bg-secondary sm:min-h-[520px]"
      >
        {heroImage && (
          <Image
            src={heroImage.url}
            alt="A view from the Vinovia Minecraft world"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        )}

        {/* Dark overlay for readable text */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
            Explore · Build · Belong
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Welcome to Vinovia
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-white/85 sm:text-lg">
            A community built around creativity, adventure and the memories we
            make together.
          </p>

          <Link
            href="#gallery"
            className="mt-8 inline-flex rounded-lg border-2 border-white/70 bg-secondary px-7 py-3 font-semibold text-foreground shadow-lg transition hover:-translate-y-1 hover:bg-primary"
          >
            Explore Our Gallery →
          </Link>
        </div>
      </section>

      {/* Gallery section */}
      <section id="gallery" className="scroll-mt-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Our memories
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Gallery
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Explore the builds, events and moments that make Vinovia special.
          </p>
        </div>

        <EventsGallery images={images} />
      </section>
    </div>
  );
}
