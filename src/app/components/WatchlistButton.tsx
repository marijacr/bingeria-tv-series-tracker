import { toggleWatchlistAction } from '@/app/actions/watchlist';

interface WatchlistButtonProps {
    showId: number;
    isInWatchlist: boolean;
}

export function WatchlistButton({ showId, isInWatchlist }: WatchlistButtonProps) {
    return (
        <form action={toggleWatchlistAction}>
        <input type="hidden" name="showId" value={showId} />
        <button
            type="submit"
            className={`px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer ${
            isInWatchlist
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
        >
            {isInWatchlist ? '✓ Remove from my list' : '+ Add on my list'}
        </button>
        </form>
    );
}