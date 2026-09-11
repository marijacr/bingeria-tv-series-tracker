'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WatchlistButton } from '@/app/components/WatchlistButton';
import { ReviewCard } from '@/app/components/ReviewCard';
import { Review } from '@/app/lib/validations/review';

export interface ShowItem {
    id: number;
    name: string;
    image?: {
        medium?: string;
        original?: string;
    } | null;
    rating?: {
        average?: number | null;
    };
}

interface WatchlistContentProps {
    shows: ShowItem[];
    reviews: Review[];
}

type SortOption = 'date' | 'rating';

export function WatchlistContent({ shows, reviews }: WatchlistContentProps) {
    const [sortBy, setSortBy] = useState<SortOption>('date');

    const reviewsByShowId = new Map(
        reviews.map((review) => [review.showId, review])
    );

    const sortedShows = [...shows].sort((a, b) => {
    const reviewA = reviewsByShowId.get(a.id);
    const reviewB = reviewsByShowId.get(b.id);

    if (sortBy === 'rating') {
        const ratingA = reviewA?.rating ?? -1;
        const ratingB = reviewB?.rating ?? -1;

        if (ratingB !== ratingA) {
        return ratingB - ratingA;
        }

        return a.name.localeCompare(b.name);
    }

    if (sortBy === 'date') {
        const dateA = reviewA?.createdAt ? new Date(reviewA.createdAt).getTime() : 0;
        const dateB = reviewB?.createdAt ? new Date(reviewB.createdAt).getTime() : 0;

        if (dateA !== dateB) {
        return dateB - dateA;
        }
    }
        
        return 0;
    });

    return (
        <div>
        <div className="flex justify-between items-center mb-6 bg-slate-900/40 p-3 rounded-lg border border-slate-800">
            <span className="text-sm font-medium text-slate-300">Sort By:</span>
            <div className="flex gap-2">
            <button
                onClick={() => setSortBy('date')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                sortBy === 'date'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
            >
                Date Added
            </button>
            <button
                onClick={() => setSortBy('rating')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                sortBy === 'rating'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
            >
                Highest Rating
            </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedShows.map((show) => {
            const userReview = reviewsByShowId.get(show.id);

            return (
                <div
                key={show.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between p-4 space-y-4"
                >
                <div className="flex gap-4">
                    <div className="relative w-24 h-36 shrink-0 bg-slate-800 rounded-lg overflow-hidden">
                    {show.image?.medium || show.image?.original ? (
                        <Image
                        src={show.image.medium ?? show.image.original ?? ""}
                        alt={show.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                        No image
                        </div>
                    )}
                    </div>

                    <div className="flex flex-col justify-between grow">
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
                        Your Review:
                        </span>
                        <Link
                        href={`/shows/${show.id}/recenzija`}
                        className="text-xs text-indigo-400 hover:text-indigo-300 underline"
                        >
                        Edit Review
                        </Link>
                    </div>
                    <ReviewCard review={userReview} />
                    </div>
                ) : (
                    <div className="border-t border-slate-800/80 pt-3 flex justify-between items-center">
                    <span className="text-xs text-slate-500">No review written yet</span>
                    <Link
                        href={`/shows/${show.id}/recenzija`}
                        className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    >
                        + Write Review
                    </Link>
                    </div>
                )}
                </div>
            );
            })}
        </div>
        </div>
    );
}