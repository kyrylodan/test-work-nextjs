import {IGenre} from "@/app/models/IGenre";

export interface IMovieDetail {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    runtime: number;
    vote_average: number;
    genres: IGenre[];
}