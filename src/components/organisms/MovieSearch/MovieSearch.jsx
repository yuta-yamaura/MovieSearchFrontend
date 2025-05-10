import { useState, useEffect } from "react";
import axios from "axios";
import { LoadMoreButton } from "../../atoms/LoadMoreButton/LoadMoreButton";
import { SelectYear } from "../../atoms/SelectYear/SelectYear";
import { SearchInput } from "../../atoms/SearchInput/SearchInput";
import { MovieList } from "../../molecules/MovieList/MovieList";
import "./MovieSearch.css";

export const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMovies = async (page) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/movies/?page=${page}&year=${selectedYear}&query=${searchQuery}`
      );
      const data = response.data;

      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
      // 最後のページ数をセット
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // 検索条件が変更されたらページをリセット
    fetchMovies(1);
  }, [selectedYear, searchQuery]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1>Search Movie App</h1>
      <div className="search-container">
        <SearchInput
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        <SelectYear
          selectedYear={selectedYear}
          handleYearChange={handleYearChange}
        />
      </div>
      <MovieList movies={movies} />

      {movies.length > 0 && currentPage < totalPages && (
        <LoadMoreButton loadMore={loadMore} />
      )}
    </div>
  );
};
