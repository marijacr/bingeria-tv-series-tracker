import Link from 'next/link';

export default function ShowNotFound() {
    return (
        <main className="container mx-auto px-4 py-24 text-center max-w-md">
        <h1 className="text-6xl font-bold text-indigo-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">Show not found</h2>
        <p className="text-slate-400 mb-8">
            Show you are looking for doesn't exist or it has been removed.
        </p>
        <Link
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
            Back to catalogue
        </Link>
        </main>
    );
}