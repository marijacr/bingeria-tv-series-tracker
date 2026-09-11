'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, ReviewFormValues } from '@/app/lib/validations/review';
import { submitReviewAction } from '@/app/actions/review';

interface ReviewFormProps {
    showId: number;
    initialValues?: Partial<ReviewFormValues>;
}

export function ReviewForm({ showId, initialValues }: ReviewFormProps) {
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
        showId,
        rating: initialValues?.rating ?? 8,
        episodeNumber: initialValues?.episodeNumber ?? 1,
        comment: initialValues?.comment ?? '',
        hasSpoilers: initialValues?.hasSpoilers ?? false,
        },
    });

    const hasSpoilers = watch('hasSpoilers');

    const onSubmit = async (values: ReviewFormValues) => {
        setServerError(null);
        const result = await submitReviewAction(values);

        if (result && !result.success) {
        setServerError(result.message || "Validation didn't through.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl bg-slate-900 p-6 rounded-xl border border-slate-800">
        {serverError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-lg">
            {serverError}
            </div>
        )}

        <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
            Review (1 - 10)
            </label>
            <input
            type="number"
            min="1"
            max="10"
            {...register('rating', { valueAsNumber: true })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
            {errors.rating && (
            <p className="text-xs text-rose-400 mt-1">{errors.rating.message}</p>
            )}
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
            Which episode have you reached?
            </label>
            <input
            type="number"
            min="0"
            {...register('episodeNumber', { valueAsNumber: true })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
            {errors.episodeNumber && (
            <p className="text-xs text-rose-400 mt-1">{errors.episodeNumber.message}</p>
            )}
        </div>

        <div className="flex items-center gap-3">
            <input
            type="checkbox"
            id="hasSpoilers"
            {...register('hasSpoilers')}
            className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="hasSpoilers" className="text-sm font-medium text-slate-300 cursor-pointer">
            This review contains spoilers
            </label>
        </div>

        <div>
            <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-slate-200">
                Comment
            </label>
            <span className="text-xs text-slate-400">
                {hasSpoilers ? 'Min. 50 characters' : 'Min. 20 characters'}
            </span>
            </div>
            <textarea
            rows={4}
            {...register('comment')}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
            placeholder="Tell us your thoughts on the show..."
            />
            {errors.comment && (
            <p className="text-xs text-rose-400 mt-1">{errors.comment.message}</p>
            )}
        </div>

        <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
        >
            {isSubmitting ? 'Saving...' : 'Save review'}
        </button>
        </form>
    );
}