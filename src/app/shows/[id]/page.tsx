import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getShowDetails, getShowEpisodes } from '@/app/lib/tvmaze';
import { stripHtml } from '@/app/lib/stripHtml';

interface ShowPageProps {
    params: Promise<{ id: string }>;
    }

export default async function ShowDetailsPage({ params }: ShowPageProps) {
    const { id } = await params;

    const [show, episodes] = await Promise.all([
        getShowDetails(id),
        getShowEpisodes(id),
    ]);

    if (!show) {
        notFound();
    }

    const cleanSummary = stripHtml(show.summary);

    return (
        <main className="bg-slate-950">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
            <Link
                href="/"
                className="inline-flex items-center border border-gray-300 rounded-b-md px-3 py-2 text-sm font-medium text-slate-400 hover:bg-gray-600 hover:text-white mb-6 transition-colors"
            >
                ← Back to catalogue
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="relative aspect-2/3 w-full rounded-xl overflow-hidden bg-slate-800">
                {show.image?.original || show.image?.medium ? (
                    <Image
                    src={show.image.original || show.image.medium}
                    alt={show.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-500">
                    No Photo
                    </div>
                )}
                </div>

                <div className="md:col-span-2 flex flex-col justify-start">
                <h1 className="text-4xl font-bold text-white mb-4">{show.name}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mb-6">
                    {show.rating?.average && (
                    <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30 font-semibold">
                        ★ {show.rating.average} / 10
                    </span>
                    )}
                    {show.premiered && (
                    <span className="text-slate-400">
                        Premiere: {show.premiered}
                    </span>
                    )}
                    <span className="text-slate-400">
                    Episodes: {episodes.length}
                    </span>
                </div>

                {show.genres && show.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                    {show.genres.map((genre) => (
                        <span
                        key={genre}
                        className="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-md"
                        >
                        {genre}
                        </span>
                    ))}
                    </div>
                )}

                <div className="prose prose-invert max-w-none text-slate-300">
                    <h2 className="text-xl font-semibold text-white mb-2">Description</h2>
                    <p className="leading-relaxed whitespace-pre-line">{cleanSummary || 'Summary not available.'}</p>
                </div>
                </div>
            </div>

            <section className="border-t border-slate-800 pt-8">
                <h2 className="text-2xl font-bold text-white mb-6">Episodes ({episodes.length})</h2>
                {episodes.length === 0 ? (
                <p className="text-slate-400">No available information on episodes.</p>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {episodes.map((episode) => (
                    <div
                        key={episode.id}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col justify-between"
                    >
                        <div>
                        <span className="text-xs text-indigo-400 font-semibold">
                            S{episode.season} E{episode.number}
                        </span>
                        <h3 className="font-medium text-white mt-1 line-clamp-1">
                            {episode.name}
                        </h3>
                        </div>
                        {episode.airdate && (
                        <p className="text-xs text-slate-500 mt-3">{episode.airdate}</p>
                        )}
                    </div>
                    ))}
                </div>
                )}
            </section>
        </div>
        </main>
    );
}