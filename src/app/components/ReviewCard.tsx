'use client';

import { Review } from '@/app/lib/validations/review';
import { useToggle } from '@/app/hooks/useToggle';

interface ReviewCardProps {
    review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
    const { value: isRevealed, toggle } = useToggle(false);

    const shouldBlur = review.hasSpoilers && !isRevealed;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-start">
            <div>
            <span className="text-amber-400 font-bold text-lg">★ {review.rating}/10</span>
            <p className="text-xs text-slate-400">Watched episode: {review.episodeNumber}</p>
            </div>
            {review.hasSpoilers && (
            <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs px-2.5 py-1 rounded-full font-medium">
                Spoiler
            </span>
            )}
        </div>

        <div className="relative mt-2">
            <p className={`text-slate-300 text-sm leading-relaxed transition-all duration-300 ${shouldBlur ? 'blur-md select-none' : ''}`}>
            {review.comment}
            </p>

            {shouldBlur && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 rounded-lg">
                <button
                onClick={toggle}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-600 shadow-lg cursor-pointer transition-colors"
                >
                👁 Reveal spoiler
                </button>
            </div>
            )}
        </div>
        </div>
    );
}