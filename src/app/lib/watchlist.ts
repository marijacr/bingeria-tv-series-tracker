import { cookies } from 'next/headers';

const WATCHLIST_COOKIE_NAME = 'bingeria_watchlist';

export async function getWatchlist(): Promise<number[]> {
    const cookieStore = await cookies();
    const watchlistCookie = cookieStore.get(WATCHLIST_COOKIE_NAME);

    if (!watchlistCookie?.value) {
        return [];
    }

    try {
        return JSON.parse(watchlistCookie.value) as number[];
    } catch {
        return [];
    }
    }

export async function isShowInWatchlist(showId: number): Promise<boolean> {
    const watchlist = await getWatchlist();
    return watchlist.includes(showId);
    }

export async function saveWatchlist(watchlist: number[]): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(WATCHLIST_COOKIE_NAME, JSON.stringify(watchlist), {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax',
    });
}