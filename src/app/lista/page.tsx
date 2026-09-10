import Link from 'next/link';
import Image from 'next/image';
import { getWatchlist } from '@/app/lib/watchlist';
import { getShowDetails } from '@/app/lib/tvmaze';
import { WatchlistButton } from '@/app/components/WatchlistButton';

export default async function WatchlistPage() {
    const showIds = await getWatchlist();

    const showsData = await Promise.all(
        showIds.map((id) => getShowDetails(id.toString()))
    );

    const shows = showsData.filter((show) => show !== null);

    return (
        <main className="bg-slate-950 min-h-screen">
            <div className='container mx-auto px-4 py-8 max-w-6xl'>
                <div className="flex justify-between items-center mb-8">
                    <div>
                    <h1 className="text-3xl font-bold text-white">My list</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Your list of shows to watch.
                    </p>
                    </div>
                    <Link
                    href="/"
                    className="text-sm font-medium text-gray-300 hover:text-indigo-300 transition-colors"
                    >
                    ← Back to catalogue
                    </Link>
                </div>

                {shows.length === 0 ? (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center max-w-md mx-auto my-12">
                    <p className="text-slate-300 text-lg font-medium mb-2">
                        Your watchlist is empty at the moment.
                    </p>
                    <p className="text-slate-500 text-sm mb-6">
                        Add shows from the catalogue so you can save them here.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                    >
                        Search the catalogue
                    </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {shows.map((show) => (
                        <div
                        key={show.id}
                        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between"
                        >
                        <Link href={`/shows/${show.id}`} className="group block">
                            <div className="relative aspect-[2/3] w-full bg-slate-800">
                            {show.image?.medium || show.image?.original ? (
                                <Image
                                src={show.image.medium || show.image.original}
                                alt={show.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-500">
                                No Photo
                                </div>
                            )}
                            </div>
                            <div className="p-4">
                            <h2 className="font-bold text-white text-lg line-clamp-1 group-hover:text-indigo-400 transition-colors">
                                {show.name}
                            </h2>
                            {show.rating?.average && (
                                <p className="text-xs text-amber-400 mt-1">
                                ★ {show.rating.average} / 10
                                </p>
                            )}
                            </div>
                        </Link>
                        <div className="p-4 pt-0">
                            <WatchlistButton showId={show.id} isInWatchlist={true} />
                        </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </main>
    );
}