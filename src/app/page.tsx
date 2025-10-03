"use client";

import { useEffect, useState } from "react";
import { IMovie } from "@/app/models/IMovie";

import "./globals.css";
import {getMovies} from "@/app/api/getGenre";

export default function Page() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        const result = await getMovies(page);
        setMovies(result.movies);
        setTotalPages(Math.min(result.totalPages, 7));
      } catch (err) {
        console.error("Помилка:", err);
      }
    }
    fetchMoviesData();
  }, [page]);

  return (
      <div className="movies-container">
        <h1 className="movies-title">Фільми</h1>

        <div className="movies-grid">
          {movies.slice(0, 3).map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                />
                <div className="movie-info">
                  <h2 className="movie-name">{movie.title}</h2>
                  <p className="movie-overview">
                    {movie.overview.length > 100
                        ? movie.overview.slice(0, 100) + "..."
                        : movie.overview}
                  </p>

                  <p className="movie-meta">
                    ⭐ {movie.vote_average} | 📅 {movie.release_date}
                  </p>
                </div>
              </div>
          ))}
        </div>

        <div className="pagination">
          <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="pagination-btn"
          >
            ⬅ Назад
          </button>
          <span className="pagination-info">

        </span>
          <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="pagination-btn"
          >
            Вперед ➡
          </button>
        </div>
      </div>
  );
}
