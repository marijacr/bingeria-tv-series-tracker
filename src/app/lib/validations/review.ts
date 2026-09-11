import { z } from 'zod';

export const reviewSchema = z
    .object({
        showId: z.number({ message: 'The series ID is mandatory.' }),
        rating: z
        .number({ message: 'Enter the show rating.' })
        .min(1, 'The rating minimum is 1.')
        .max(10, 'The rating maximum is 10.'),
        episodeNumber: z
        .number({ message: 'Enter episode number.' })
        .min(0, 'Episode number can not be negative.'),
        comment: z.string().trim(),
        hasSpoilers: z.boolean(),
    })
    .superRefine((data, ctx) => {
        const minLength = data.hasSpoilers ? 50 : 20;

        if (data.comment.length < minLength) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: data.hasSpoilers
            ? 'A comment containing a spoiler must be at least 50 characters long.'
            : 'A comment must be at least 20 characters long.',
            path: ['comment'],
        });
        }
    });

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export interface Review extends ReviewFormValues {
    id: string;
    createdAt: string;
}