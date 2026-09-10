export interface ShowImage {
    medium: string;
    original: string;
}

export interface ShowRating {
    average: number | null;
}

export interface Show {
    id: number;
    name: string;
    image: ShowImage | null;
    genres: string[];
    rating: ShowRating;
    summary: string | null;
    premiered?: string | null;
}

export interface Episode {
    id: number;
    name: string;
    season: number;
    number: number;
    airdate?: string | null;
    summary?: string | null;
    image?: ShowImage | null;
}