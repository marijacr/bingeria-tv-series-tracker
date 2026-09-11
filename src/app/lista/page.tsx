import Link from 'next/link';
import Image from 'next/image';
import { getWatchlist } from '@/app/lib/watchlist';
import { getShowDetails } from '@/app/lib/tvmaze';
import { getReviews } from '@/app/lib/reviews';
import { WatchlistButton } from '@/app/components/WatchlistButton';
import { ReviewCard } from '@/app/components/ReviewCard';

export default async function WatchlistPage() {
    const [showIds, reviews] = await Promise.all([
        getWatchlist(),
        getReviews(),
    ]);

    const showsData = await Promise.all(
        showIds.map((id) => getShowDetails(id.toString()))
    );

    const shows = showsData.filter((show) => show !== null);

    const reviewsByShowId = new Map(
        reviews.map((review) => [review.showId, review])
    );

    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
            <div>
            <h1 className="text-3xl font-bold text-white">My list</h1>
            <p className="text-slate-400 text-sm mt-1">
                Your personal collection of saved series and reviews.
            </p>
            </div>
            <Link
            href="/"
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
            ← Back to catalogue
            </Link>
        </div>

        {shows.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center max-w-md mx-auto my-12">
            <p className="text-slate-300 text-lg font-medium mb-2">
                Your list is empty at the moment.
            </p>
            <p className="text-slate-500 text-sm mb-6">
                Add series from the catalog to save them here and write reviews.
            </p>
            <Link
                href="/"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
                Explore catalogue
            </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show) => {
                const userReview = reviewsByShowId.get(show.id);

                return (
                <div
                    key={show.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between p-4 space-y-4"
                >
                    <div className="flex gap-4">
                    <div className="relative w-24 h-36 flex-shrink-0 bg-slate-800 rounded-lg overflow-hidden">
                        {show.image?.medium || show.image?.original ? (
                        <Image
                            src={show.image.medium || show.image.original}
                            alt={show.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                        ) : (
                        <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                            No Photo
                        </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-between flex-grow">
                        <div>
                        <Link
                            href={`/shows/${show.id}`}
                            className="font-bold text-white text-lg hover:text-indigo-400 transition-colors line-clamp-2"
                        >
                            {show.name}
                        </Link>
                        {show.rating?.average && (
                            <p className="text-xs text-amber-400 mt-1">
                            ★ {show.rating.average} / 10 (TVmaze)
                            </p>
                        )}
                        </div>

                        <div className="pt-2">
                        <WatchlistButton showId={show.id} isInWatchlist={true} />
                        </div>
                    </div>
                    </div>

                    {userReview ? (
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-400">
                            Your review:
                        </span>
                        <Link
                            href={`/shows/${show.id}/recenzija`}
                            className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                        >
                            Edit review
                        </Link>
                        </div>
                        <ReviewCard review={userReview} />
                    </div>
                    ) : (

                    <div className="border-t border-slate-800/80 pt-3 flex justify-between items-center">
                        <span className="text-xs text-slate-500">You haven't written a review yet.</span>
                        <Link
                        href={`/shows/${show.id}/recenzija`}
                        className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                        + Write review
                        </Link>
                    </div>
                    )}
                </div>
                );
            })}
            </div>
        )}
        </main>
    );
}