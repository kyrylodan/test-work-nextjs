    'use client'
    import { useEffect, useState } from "react";
    import { useParams, useRouter } from "next/navigation";
    import '@/app/globals.css';
    import {getMovieById} from "@/models/getMovieById";
    import {IMovieDetail} from "@/models/IMovieDetails";
    import "@/app/globals.css"
    export default function MovieDetailPage() {
        const { id } = useParams();
        const [movie, setMovie] = useState<IMovieDetail | null>(null);
        const router = useRouter();

        useEffect(() => {
            async function fetchMovie() {
                if (!id) return;
                try {
                    const data = await getMovieById(Number(id));
                    setMovie(data);
                } catch (err) {
                    console.error(err);
                }
            }
            fetchMovie();
        }, [id]);

        if (!movie) {
            return <div className="container">Завантаження...</div>;
        }

        return (
            <div className="container">
                <button onClick={() => router.back()}>◀ Назад</button>
                <div className="Movies-Container">
                    <div className="movie-detail-card">
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-detail-poster"
                            />
                        ) : (
                            <div className="movie-poster placeholder">No image</div>
                        )}

                        <div className="movie-detail-info">
                            <h2>{movie.title}</h2>
                            <p><strong>Рейтинг:</strong> ⭐ {movie.vote_average}</p>
                            <p><strong>Жанри:</strong>{" "}
                                {movie.genres?.map((g) => (
                                    <span key={g.id}>{g.name} </span>
                                ))}
                            </p>
                            <p className="overview">{movie.overview}</p>
                            <p><strong></strong> {movie.runtime}</p>
                            <p><strong></strong> {movie.release_date} хв</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
