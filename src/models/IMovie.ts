export interface IMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[]
    images: string;
    vote_count: number;
    popularity: number;
    original_title: string;
}