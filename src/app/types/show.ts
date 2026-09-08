export interface ShowImage {
    medium: string,
    original: string
}

export interface ShowRating {
    average: number | null
}

export interface Show {
    id: number,
    name: string,
    image: ShowImage,
    genres: String[],
    rating: ShowRating
}