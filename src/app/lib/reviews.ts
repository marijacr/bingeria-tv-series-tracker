import { cookies } from 'next/headers';
import { Review } from '@/app/lib/validations/review';

const REVIEWS_COOKIE_NAME = 'bingeria_reviews';

export async function getReviews(): Promise<Review[]> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(REVIEWS_COOKIE_NAME);

    if (!cookie?.value) {
        return [];
    }

    try {
        return JSON.parse(cookie.value) as Review[];
    } catch {
        return [];
    }
}

export async function getReviewForShow(showId: number): Promise<Review | null> {
    const reviews = await getReviews();
    return reviews.find((r) => r.showId === showId) || null;
    }

    export async function saveReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    const reviews = await getReviews();
    
    const filteredReviews = reviews.filter((r) => r.showId !== reviewData.showId);
    
    const newReview: Review = {
        ...reviewData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };

    const updatedReviews = [...filteredReviews, newReview];

    const cookieStore = await cookies();
    cookieStore.set(REVIEWS_COOKIE_NAME, JSON.stringify(updatedReviews), {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax',
    });

    return newReview;
}