'use server';

import { revalidatePath } from 'next/cache';
import { getWatchlist, saveWatchlist } from '@/app/lib/watchlist';

export async function toggleWatchlistAction(formData: FormData): Promise<void> {
    const rawShowId = formData.get('showId');

    if (!rawShowId) {
        throw new Error('The series ID was not passed.');
    }

    const showId = Number(rawShowId);

    if (isNaN(showId)) {
        throw new Error('Invalid show ID.');
    }

    try {
        const currentList = await getWatchlist();
        const exists = currentList.includes(showId);

        let updatedList: number[];

        if (exists) {
            updatedList = currentList.filter((id) => id !== showId);
        } else {
            updatedList = Array.from(new Set([...currentList, showId]));
        }

        await saveWatchlist(updatedList);

        revalidatePath('/lista');
        revalidatePath(`/shows/${showId}`);
        revalidatePath('/');
    } catch (error) {
        console.error('Error updating the list:', error);
        throw new Error('An error occurred while saving. Please try again.');
    }
}