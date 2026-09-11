import { Review } from '@/app/lib/validations/review';

interface WatchlistStatsProps {
    totalShows: number;
    reviews: Review[];
}

export function WatchlistStats({ totalShows, reviews }: WatchlistStatsProps) {
    const reviewCount = reviews.length;

    const averageRating =
        reviewCount > 0
        ? (
            reviews.reduce((acc, current) => acc + current.rating, 0) /
            reviewCount
            ).toFixed(1)
        : '0.0';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Total Shows
            </span>
            <p className="text-3xl font-extrabold text-white mt-1">{totalShows}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Reviews Written
            </span>
            <p className="text-3xl font-extrabold text-indigo-400 mt-1">
            {reviewCount}
            </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Average Rating
            </span>
            <p className="text-3xl font-extrabold text-amber-400 mt-1">
            {averageRating} <span className="text-sm font-normal text-slate-500">/ 10</span>
            </p>
        </div>
        </div>
    );
}