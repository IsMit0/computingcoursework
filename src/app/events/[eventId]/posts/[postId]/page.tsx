
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost } from "@/lib/events";
import PostGallery from "../../../../components/events/PostGallery";

type Props = {
    params: Promise<{
        eventId: string;
        postId: string;
    }>;
};

export default async function PostPage({ params }: Props) {
    const { eventId, postId } = await params;

    const post = await getPost(
        Number(postId),
        Number(eventId)
    );

    if (!post) {
        notFound();
    }

    return (
        <main className="container mx-auto px-6 py-12">
            <Link
                href={`/events/${eventId}`}
                className="text-sm text-blue-600 hover:underline"
            >
                ← Back to event
            </Link>

            <h1 className="mb-3 mt-6 text-3xl font-bold">
                {post.title}
            </h1>

            {post.body && (
                <p className="mb-8 max-w-3xl">
                    {post.body}
                </p>
            )}

            <PostGallery images={post.images} />
        </main>
    );
}
