import {IMovie} from "@/app/models/IMovie";


export const getMovies = async (page: number = 1): Promise<{ movies: IMovie[], totalPages: number }> => {
    const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=5ae29fc8e3ed1158d754205b35f9bb14&language=uk-UA&page=${page}`
);
    const data = await res.json();
    return {
        movies: data.results || [],
        totalPages: data.total_pages || 1
    };
};