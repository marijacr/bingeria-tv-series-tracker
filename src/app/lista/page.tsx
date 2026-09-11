import Link from 'next/link';
import { getWatchlist } from '@/app/lib/watchlist';
import { getShowDetails } from '@/app/lib/tvmaze';
import { getReviews } from '@/app/lib/reviews';
import { WatchlistStats } from '@/app/components/WatchlistStats';
import { WatchlistContent } from '@/app/components/WatchlistContent';

export default async function WatchlistPage() {
    const [showIds, reviews] = await Promise.all([
        getWatchlist(),
        getReviews(),
    ]);

    const showsData = await Promise.all(
        showIds.map((id) => getShowDetails(id.toString()))
    );

    const shows = showsData.filter((show) => show !== null);

    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
            <div>
            <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
            <p className="text-slate-400 text-sm mt-1">
                Your personal collection of saved shows and reviews.
            </p>
            </div>
            <Link
            href="/"
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
            ← Back to Catalog
            </Link>
        </div>

        {shows.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center max-w-md mx-auto my-12">
            <p className="text-slate-300 text-lg font-medium mb-2">
                Your watchlist is currently empty.
            </p>
            <p className="text-slate-500 text-sm mb-6">
                Add shows from the catalog to save them here and write reviews.
            </p>
            <Link
                href="/"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
                Browse Catalog
            </Link>
            </div>
        ) : (
            <>
            {/* Statistics Block */}
            <WatchlistStats totalShows={shows.length} reviews={reviews} />

            {/* Immutably Sorted Content Container */}
            <WatchlistContent shows={shows} reviews={reviews} />
            </>
        )}
        </main>
    );
}