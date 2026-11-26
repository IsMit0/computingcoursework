
import { createClient } from "@/lib/server";

export async function getEvents() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("tblevents")
        .select(`
            event_id,
            name,
            event_date,
            description,
            tblevent_posts (
                post_id,
                tblevent_images (
                    storage_path,
                    sort_order
                )
            )
        `)
        .order("event_date", { ascending: false });

    if (error) {
        console.error("Error fetching events:", error);
        throw new Error("Could not load events");
    }

    return (data ?? []).map((event) => {
        const images = (event.tblevent_posts ?? [])
            .flatMap((post) => post.tblevent_images ?? [])
            .sort(
                (a, b) =>
                    (a.sort_order ?? 0) - (b.sort_order ?? 0)
            );

        const thumbnail = images[0]?.storage_path;

        return {
            ...event,
            thumbnail: thumbnail
                ? supabase.storage
                    .from("images")
                    .getPublicUrl(thumbnail).data.publicUrl
                : "/placeholder.jpg",
        };
    });
}

export async function getEvent(eventId: number) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("tblevents")
        .select(`
            event_id,
            name,
            event_date,
            description,
            tblevent_posts (
                post_id,
                title,
                body,
                created_at,
                tblevent_images (
                    image_id,
                    storage_path,
                    caption,
                    sort_order
                )
            )
        `)
        .eq("event_id", eventId)
        .single();

    if (error) {
        console.error("Error fetching event:", error);
        return null;
    }

    const posts = (data.tblevent_posts ?? []).map((post) => ({
        ...post,
        images: (post.tblevent_images ?? [])
            .sort(
                (a, b) =>
                    (a.sort_order ?? 0) - (b.sort_order ?? 0)
            )
            .map((image) => ({
                ...image,
                url: supabase.storage
                    .from("images")
                    .getPublicUrl(image.storage_path).data.publicUrl,
            })),
    }));

    return { ...data, posts };
}

export async function getPost(
    postId: number,
    eventId: number
) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("tblevent_posts")
        .select(`
            post_id,
            event_id,
            title,
            body,
            created_at,
            tblevent_images (
                image_id,
                storage_path,
                caption,
                sort_order
            )
        `)
        .eq("post_id", postId)
        .eq("event_id", eventId)
        .single();

    if (error) {
        console.error("Error fetching post:", error);
        return null;
    }

    return {
        ...data,
        images: (data.tblevent_images ?? [])
            .sort(
                (a, b) =>
                    (a.sort_order ?? 0) - (b.sort_order ?? 0)
            )
            .map((image) => ({
                ...image,
                url: supabase.storage
                    .from("images")
                    .getPublicUrl(image.storage_path).data.publicUrl,
            })),
    };
}
