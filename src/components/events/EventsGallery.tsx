
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type GalleryImage = {
    image_id: number;
    caption: string | null;
    sort_order: number | null;
    created_at?: string;
    url: string;
    post: {
        post_id: number;
        title: string;
        body: string | null;
    };
    event: {
        event_id: number;
        name: string;
        event_date: string;
        description: string | null;
    };
};

type SelectedImage = {
    image: GalleryImage;
    originX: number;
    originY: number;
    startScale: number;
};

type EventsGalleryProps = {
    images: GalleryImage[];
};

export default function EventsGallery({
    images,
}: EventsGalleryProps) {
    const [selectedImage, setSelectedImage] =
        useState<SelectedImage | null>(null);

    const [expanded, setExpanded] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("all");
    const [selectedPost, setSelectedPost] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

    const eventOptions = Array.from(
        new Map(
            images.map((image) => [
                image.event.event_id,
                image.event.name,
            ])
        ),
        ([id, name]) => ({ id, name })
    );

    const postOptions = Array.from(
        new Map(
            images
                .filter(
                    (image) =>
                        selectedEvent === "all" ||
                        image.event.event_id === Number(selectedEvent)
                )
                .map((image) => [
                    image.post.post_id,
                    image.post.title,
                ])
        ),
        ([id, title]) => ({ id, title })
    );

    const filteredImages = images
        .filter((image) => {
            const matchesEvent =
                selectedEvent === "all" ||
                image.event.event_id === Number(selectedEvent);

            const matchesPost =
                selectedPost === "all" ||
                image.post.post_id === Number(selectedPost);

            const searchText = search.toLowerCase();

            const matchesSearch =
                !searchText ||
                (image.caption ?? "").toLowerCase().includes(searchText) ||
                image.event.name.toLowerCase().includes(searchText) ||
                image.post.title.toLowerCase().includes(searchText) ||
                (image.post.body ?? "").toLowerCase().includes(searchText) ||
                (image.event.description ?? "")
                    .toLowerCase()
                    .includes(searchText);

            return matchesEvent && matchesPost && matchesSearch;
        })
        .sort((a, b) => {
            const dateA = a.created_at
                ? new Date(a.created_at).getTime()
                : a.image_id;

            const dateB = b.created_at
                ? new Date(b.created_at).getTime()
                : b.image_id;

            return sortOrder === "oldest"
                ? dateA - dateB
                : dateB - dateA;
        });

    function openImage(
        image: GalleryImage,
        element: HTMLButtonElement
    ) {
        const rect = element.getBoundingClientRect();

        const panelWidth = Math.min(
            window.innerWidth * 0.9,
            900
        );

        const panelHeight = window.innerHeight * 0.9;

        const panelLeft =
            (window.innerWidth - panelWidth) / 2;

        const panelTop =
            (window.innerHeight - panelHeight) / 2;

        const originX =
            ((rect.left + rect.width / 2 - panelLeft) /
                panelWidth) * 100;

        const originY =
            ((rect.top + rect.height / 2 - panelTop) /
                panelHeight) * 100;

        const startScale = Math.min(
            rect.width / panelWidth,
            rect.height / panelHeight
        );

        setExpanded(false);

        setSelectedImage({
            image,
            originX,
            originY,
            startScale,
        });
    }

    function closeImage() {
        setExpanded(false);

        setTimeout(() => {
            setSelectedImage(null);
        }, 350);
    }

    function changeImage(direction: number) {
        if (!selectedImage) return;

        const currentIndex = filteredImages.findIndex(
            (image) =>
                image.image_id === selectedImage.image.image_id
        );

        const nextIndex = currentIndex + direction;

        if (
            nextIndex < 0 ||
            nextIndex >= filteredImages.length
        ) {
            return;
        }

        setSelectedImage({
            ...selectedImage,
            image: filteredImages[nextIndex],
        });
    }

    useEffect(() => {
        if (!selectedImage) return;

        const frame = requestAnimationFrame(() => {
            setExpanded(true);
        });

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                closeImage();
            }

            if (event.key === "ArrowLeft") {
                changeImage(-1);
            }

            if (event.key === "ArrowRight") {
                changeImage(1);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            cancelAnimationFrame(frame);
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [selectedImage]);

    const selectedIndex = selectedImage
        ? filteredImages.findIndex(
            (image) =>
                image.image_id === selectedImage.image.image_id
        )
        : -1;

    if (!images.length) {
        return <p>No gallery images found.</p>;
    }

    return (
        <>
            {/* Search and filters */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search gallery..."
                    className="rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <select
                    value={selectedEvent}
                    onChange={(e) => {
                        setSelectedEvent(e.target.value);
                        setSelectedPost("all");
                    }}
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                    <option value="all">All events</option>

                    {eventOptions.map((event) => (
                        <option key={event.id} value={event.id}>
                            {event.name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedPost}
                    onChange={(e) => setSelectedPost(e.target.value)}
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                    <option value="all">All posts</option>

                    {postOptions.map((post) => (
                        <option key={post.id} value={post.id}>
                            {post.title}
                        </option>
                    ))}
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                </select>
            </div>

            <p className="mb-5 text-sm text-gray-500">
                Showing {filteredImages.length} of {images.length} images
            </p>

            {/* Masonry gallery */}
            {filteredImages.length > 0 ? (
                <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                    {filteredImages.map((image) => (
                        <button
                            key={image.image_id}
                            type="button"
                            onClick={(e) =>
                                openImage(image, e.currentTarget)
                            }
                            aria-label={`Open image from ${image.event.name}`}
                            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                        >
                            <Image
                                src={image.url}
                                alt={
                                    image.caption ||
                                    image.post.title
                                }
                                width={1200}
                                height={900}
                                unoptimized
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                            />
                        </button>
                    ))}
                </div>
            ) : (
                <p className="rounded-xl bg-gray-50 p-8 text-center text-gray-500">
                    No images match your search or filters.
                </p>
            )}

            {/* Dynamic Island */}
            {selectedImage && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={closeImage}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="gallery-dialog-title"
                        className="relative flex max-h-[90vh] w-[90vw] max-w-[900px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-transform duration-500 ease-out"
                        style={{
                            transform: expanded
                                ? "scale(1)"
                                : `scale(${selectedImage.startScale})`,
                            transformOrigin: `${selectedImage.originX}% ${selectedImage.originY}%`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={closeImage}
                            aria-label="Close gallery"
                            className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-2xl text-white backdrop-blur-md transition hover:bg-black/80"
                        >
                            ×
                        </button>

                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                            {/* Image area - light background, no black bars */}
                            <div className="flex w-full items-center justify-center bg-gray-100 p-4 sm:p-6">
                                <Image
                                    src={selectedImage.image.url}
                                    alt={
                                        selectedImage.image.caption ||
                                        selectedImage.image.post.title
                                    }
                                    width={1600}
                                    height={1200}
                                    unoptimized
                                    sizes="90vw"
                                    className="h-auto max-h-[55vh] w-auto max-w-full rounded-xl object-contain"
                                />
                            </div>

                            <div className="p-6 sm:p-8">
                                {selectedImage.image.caption && (
                                    <p className="mb-6 text-sm text-gray-500">
                                        {selectedImage.image.caption}
                                    </p>
                                )}

                                {/* Post information */}
                                <div className="border-b border-gray-200 pb-7">
                                    <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-500">
                                        Post
                                    </p>

                                    <h2
                                        id="gallery-dialog-title"
                                        className="text-2xl font-bold text-gray-900 sm:text-3xl"
                                    >
                                        {selectedImage.image.post.title}
                                    </h2>

                                    {selectedImage.image.post.body && (
                                        <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-700">
                                            {selectedImage.image.post.body}
                                        </p>
                                    )}
                                </div>

                                {/* Event information */}
                                <div className="pt-7">
                                    <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-500">
                                        Event
                                    </p>

                                    <h3 className="text-xl font-bold text-gray-900">
                                        {selectedImage.image.event.name}
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        {new Date(
                                            selectedImage.image.event.event_date
                                        ).toLocaleDateString(undefined, {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>

                                    {selectedImage.image.event.description && (
                                        <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-700">
                                            {selectedImage.image.event.description}
                                        </p>
                                    )}
                                </div>

                                {/* Previous and next */}
                                <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-5">
                                    <button
                                        type="button"
                                        onClick={() => changeImage(-1)}
                                        disabled={selectedIndex <= 0}
                                        className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        ← Previous
                                    </button>

                                    <span className="text-sm text-gray-500">
                                        {selectedIndex + 1} / {filteredImages.length}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => changeImage(1)}
                                        disabled={
                                            selectedIndex ===
                                            filteredImages.length - 1
                                        }
                                        className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}
