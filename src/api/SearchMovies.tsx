import type { IMovie } from "@/models/IMovie";

export async function searchMovies(query: string, page = 1): Promise<{ movies: IMovie[], totalPages: number }> {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=5ae29fc8e3ed1158d754205b35f9bb14&language=uk-UA&query=${encodeURIComponent(query)}&page=${page}`
        );
        const data = await res.json();
        return { movies: data.results ?? [], totalPages: data.total_pages ?? 1 };
    } catch {
        return { movies: [], totalPages: 1 };
    }
}
