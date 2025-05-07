import React from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import "./MovieList.css";

export const MovieList = ({ movies }) => {
  return (
    <div className="movie-grid">
      {movies.length === 0 ? (
        <div className="no-results">
          <p>ヒットしませんでした</p>
        </div>
      ) : (
        movies.map((movie) => <MovieCard movie={movie} />)
      )}
    </div>
  );
};
