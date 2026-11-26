
"use client";

import { useState } from "react";
import Image from "next/image";

type Card = {
    id: number;
    content: React.ReactNode;
    className: string;
    thumbnail: string;
};

type LayoutGridProps = {
    cards: Card[];
};

export default function LayoutGrid({
    cards,
}: LayoutGridProps) {
    const [selectedImage, setSelectedImage] = useState<Card | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <button
                        key={card.id}
                        type="button"
                        onClick={() => setSelectedImage(card)}
                        className={`group relative h-64 overflow-hidden rounded-xl text-left ${card.className}`}
                    >
                        <Image
                            src={card.thumbnail}
                            alt="Gallery image"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                        <div className="absolute inset-0">
                            {card.content}
                        </div>
                    </button>
                ))}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        type="button"
                        aria-label="Close image"
                        className="absolute right-6 top-6 z-10 text-3xl text-white"
                        onClick={() => setSelectedImage(null)}
                    >
                        ×
                    </button>

                    <div className="relative h-[80vh] w-full max-w-5xl">
                        <Image
                            src={selectedImage.thumbnail}
                            alt="Selected gallery image"
                            fill
                            sizes="100vw"
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
