import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getShowDetails } from '@/app/lib/tvmaze';
import { getReviewForShow } from '@/app/lib/reviews';
import { ReviewForm } from '@/app/components/ReviewForm';

interface ReviewPageProps {
    params: Promise<{ id: string }>;
}

export default async function WriteReviewPage({ params }: ReviewPageProps) {
    const { id } = await params;
    const showId = Number(id);

    if (isNaN(showId)) {
        notFound();
    }

    const [show, existingReview] = await Promise.all([
        getShowDetails(id),
        getReviewForShow(showId),
    ]);

    if (!show) {
        notFound();
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Link
            href="/lista"
            className="inline-block text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
            ← Back to list
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">
            Write review: {show.name}
        </h1>
        <p className="text-slate-400 text-sm mb-8">
            Share your impressions with other viewers.
        </p>

        <ReviewForm showId={showId} initialValues={existingReview || undefined} />
        </main>
    );
}