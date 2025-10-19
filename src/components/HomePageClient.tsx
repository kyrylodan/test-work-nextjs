    'use client'

    import { useState, useEffect } from "react";
    import { useRouter } from "next/navigation";
    import { getMovies } from "@/api/getMovie";
    import { getGenres } from "@/api/getGener";
    import { searchMovies } from "@/api/SearchMovies";
    import { IMovie } from "@/models/IMovie";
    import { IGenre } from "@/models/IGenre";
    import "@/app/globals.css"
    import Link from "next/link";
    export default function HomePage() {
        const [movies, setMovies] = useState<IMovie[]>([]);
        const [genres, setGenres] = useState<IGenre[]>([]);
        const [page, setPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);
        const [query, setQuery] = useState('');
        const router = useRouter();
        const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

        const moviesPerPage = 3;

        useEffect(() => {
            async function fetchGenres() {
                try {
                    const genresData = await getGenres();
                    setGenres(genresData);
                } catch (err) {
                    console.error("Помилка завантаження жанрів:", err);
                }
            }
            fetchGenres();
        }, []);


        useEffect(() => {
            async function fetchMoviesData() {
                try {
                    let result;
                    if (selectedGenre) {
                        const res = await fetch(
                            `https://api.themoviedb.org/3/discover/movie?api_key=5ae29fc8e3ed1158d754205b35f9bb14&language=uk-UA&with_genres=${selectedGenre}&page=${page}`
                        );
                        result = await res.json();
                        setMovies(result.results || []);
                        setTotalPages(Math.min(result.total_pages || 1, 7));
                    } else {
                        result = await getMovies(page);
                        setMovies(result.movies);
                        setTotalPages(Math.min(result.totalPages, 7));
                    }
                } catch (err) {
                    console.error("Помилка:", err);
                }
            }
            fetchMoviesData();
        }, [page, selectedGenre]);



            const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== "Enter" || !query.trim()) return;
            try {
                const { movies } = await searchMovies(query, 1);
                if (movies.length) {
                    router.push(`/movie/${movies[0].id}`);
                } else {
                    alert("Фільм не знайдено");
                }
            } catch (err) {
                console.error("Помилка пошуку:", err);
            }
        };




        const startIndex = (page - 1) * moviesPerPage;
        const paginatedMovies = movies.slice(startIndex, startIndex + moviesPerPage);

        return (
            <div className="container">



                <header>
                    <h1>Movies App</h1>
                    <input
                        className="SearchMovies"
                        type="text"
                        placeholder="Пошук фільмів..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </header>

                <h2 className="GenresName">Жанри</h2>
                <div className="GenresContainer">
                    {genres.map((genre) => (
                        <button
                            className="GenreButton"
                            key={genre.id}
                            onClick={() => setSelectedGenre(genre.id)}
                        >
                            {genre.name || "Не вибрано"}
                        </button>
                    ))}
                </div>

                <div className="Movies-Container">
                    <div className="movies-grid">
                        {paginatedMovies.map((movie) => (
                            <div
                                key={movie.id}
                                className="movie-card"
                                onClick={() => router.push(`/movie/${movie.id}`)}
                            >
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                ) : (
                                    <div className="movie-poster placeholder">No image</div>
                                )}

                                <div className="movie-info">
                                    <h3>{movie.title}</h3>
                                    <p><strong>Рейтинг:</strong> ⭐ {movie.vote_average}</p>
                                    <p><strong>Жанри:</strong>{" "}
                                        {movie.genre_ids?.map((genreId) => {
                                            const genre = genres.find((g) => g.id === genreId);
                                            return <span key={genreId}>{genre?.name} </span>;
                                        })}
                                    </p>
                                    <p className="overview">
                                        {movie.overview.length > 100
                                            ? movie.overview.slice(0, 100) + "..."
                                            : movie.overview}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                            ◀ Попередня
                        </button>

                        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                            Наступна ▶
                        </button>
                    </div>
                </div>

                <div className="TheEndPage">
                    <p>Movies</p>
                    <Link href={"#"} >For designers</Link>
                    <Link href={"#"} >Hire talent</Link>
                    <Link href={"#"} >Inspiration</Link>
                    <Link href={"#"} >Advertising</Link>
                    <Link href={"#"} >Blog</Link>
                    <Link href={"#"} >Careers</Link>
                    <Link href={"#"} >About</Link>
                    <Link href={"#"} >Support</Link>


                </div>

                <div className={'TheEnd'}>
                    <Link href={"#"}> © 2025 Movies</Link>
                    <Link href={"#"}>Terms</Link>
                    <Link href={"#"}>Privacy</Link>
                    <Link href={"#"}>Cookies</Link>
                </div>

            </div>
        );
    }

