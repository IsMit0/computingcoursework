// page.tsx
import { redirect } from 'next/navigation';

export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        redirect('/homepage');
    }
}
