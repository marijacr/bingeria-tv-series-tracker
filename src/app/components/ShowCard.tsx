import Link from 'next/link';
import { Show } from '../types/show';

interface ShowCardProps {
    show: Show;
    compact?: boolean;
}

export default function ShowCard({show, compact = false}:ShowCardProps) {

    return(
        <Link href={`/shows/${show.id}`} className='border border-gray-300 rounded-lg text-center bg-white'>
            <div className='bg-stone-100 p-3'>
                <div className="relative w-full h-80 bg-gray-200">
                    {show.image ? (
                        <img
                            src={show.image.medium}
                            alt={show.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full text-gray-500">
                        No photo
                        </div>
                    )}
                </div>
                <div className="p-4 flex flex-col">
                <div>
                    <h2 className="font-semibold text-lg">
                        {show.name}
                    </h2>
                    {!compact && (
                        <p className="text-sm text-gray-600 mt-1">
                            {show.genres.length > 0 ? show.genres.join(', ') : 'Genre unknown'}
                        </p>
                    )}
                </div>
                <div className="p-3 text-sm font-medium">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        ⭐ {show.rating.average ? show.rating.average.toFixed(1) : 'N/A'}
                    </span>
                </div>
            </div>
            </div>
        </Link>
    );
}