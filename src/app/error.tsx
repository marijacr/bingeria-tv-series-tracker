'use client';

import Link from 'next/link';

export default function GlobalError({
    error,
    reset,
    }: {
    error: Error & { digest?: string };
    reset: () => void;
    }) {
    return (
        <main className="container mx-auto px-4 py-24 text-center max-w-md">
        <h1 className="text-4xl font-bold text-rose-500 mb-4">Something went wrong.</h1>
        <p className="text-slate-300 mb-6">
            {error.message || 'An unexpected error occurred while processing your request.'}
        </p>
        <div className="flex justify-center gap-4">
            <button
            onClick={() => reset()}
            className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
            Try again
            </button>
            <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
            Home
            </Link>
        </div>
        </main>
    );
}