'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { reviewSchema, ReviewFormValues } from '@/app/lib/validations/review';
import { saveReview } from '@/app/lib/reviews';

export async function submitReviewAction(data: ReviewFormValues) {
    const validationResult = reviewSchema.safeParse(data);

    if (!validationResult.success) {
        return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
        };
    }

    try {
        await saveReview(validationResult.data);
        
        revalidatePath('/lista');
        revalidatePath(`/shows/${data.showId}`);
    } catch (error) {
        console.error('Error occurred while saving the review:', error);
        return {
        success: false,
        message: 'A server error occurred. Please try again.',
        };
    }

    redirect('/lista');
}