
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Event = {
    event_id: number;
    name: string;
    event_date: string;
    description: string | null;
    thumbnail: string;
};

type SelectedEvent = {
    event: Event;
    originX: number;
    originY: number;
    startScale: number;
};

type EventsGalleryProps = {
    events: Event[];
};

export default function EventsGallery({
    events,
}: EventsGalleryProps) {
    const [selectedEvent, setSelectedEvent] =
        useState<SelectedEvent | null>(null);

    const [expanded, setExpanded] = useState(false);

    function openEvent(
        event: Event,
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

        setSelectedEvent({
            event,
            originX,
            originY,
            startScale,
        });
    }

    useEffect(() => {
        if (!selectedEvent) return;

        const frame = requestAnimationFrame(() => {
            setExpanded(true);
        });

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                closeEvent();
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
    }, [selectedEvent]);

    function closeEvent() {
        setExpanded(false);

        setTimeout(() => {
            setSelectedEvent(null);
        }, 350);
    }

    if (!events.length) {
        return <p>No events found.</p>;
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <button
                        key={event.event_id}
                        type="button"
                        onClick={(e) =>
                            openEvent(event, e.currentTarget)
                        }
                        aria-label={`Open ${event.name}`}
                        className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                    >
                        <Image
                            src={event.thumbnail}
                            alt={event.name}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                    </button>
                ))}
            </div>

            {selectedEvent && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={closeEvent}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="event-dialog-title"
                        className="relative flex max-h-[90vh] w-[90vw] max-w-[900px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-transform duration-500 ease-out"
                        style={{
                            transform: expanded
                                ? "scale(1)"
                                : `scale(${selectedEvent.startScale})`,
                            transformOrigin: `${selectedEvent.originX}% ${selectedEvent.originY}%`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={closeEvent}
                            aria-label="Close event"
                            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-2xl text-white backdrop-blur-md transition hover:bg-black/80"
                        >
                            ×
                        </button>

                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                            <div className="relative aspect-video w-full bg-black">
                                <Image
                                    src={selectedEvent.event.thumbnail}
                                    alt={selectedEvent.event.name}
                                    fill
                                    unoptimized
                                    sizes="90vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6 sm:p-8">
                                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-500">
                                    Event
                                </p>

                                <h2
                                    id="event-dialog-title"
                                    className="text-2xl font-bold text-gray-900 sm:text-3xl"
                                >
                                    {selectedEvent.event.name}
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    {new Date(
                                        selectedEvent.event.event_date
                                    ).toLocaleDateString(undefined, {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>

                                {selectedEvent.event.description && (
                                    <p className="mt-6 whitespace-pre-line leading-relaxed text-gray-700">
                                        {selectedEvent.event.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}
