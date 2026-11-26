
"use client";

import LayoutGrid from "@/components/ui/gallery";

type ImageItem = {
    image_id: number;
    url: string;
    caption: string | null;
};

export default function PostGallery({
    images,
}: {
    images: ImageItem[];
}) {
    if (!images.length) {
        return <p>No images available for this post.</p>;
    }

    const cards = images.map((image, index) => ({
        id: image.image_id,

        content: (
            <div className="flex h-full flex-col justify-end bg-black/40 p-6 text-white">
                <h3 className="text-xl font-semibold">
                    {image.caption || `Image ${index + 1}`}
                </h3>
            </div>
        ),

        className: "col-span-1 row-span-1",
        thumbnail: image.url,
    }));

    return <LayoutGrid cards={cards} />;
}
