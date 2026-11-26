
import { getGalleryImages } from "@/lib/events";
import EventsGallery from "@/components/events/EventsGallery";

export default async function Homepage() {
    const images = await getGalleryImages();

    return (
        <main>
            <section className="container mx-auto px-6 py-12">
                <h1 className="mb-8 text-3xl font-bold">
                    Our Gallery
                </h1>

                <EventsGallery images={images} />
            </section>
        </main>
    );
}
