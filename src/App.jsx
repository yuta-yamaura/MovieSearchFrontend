import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// ジャンルIDと名前のマッピング
const genreMap = {
  28: "アクション",
  12: "アドベンチャー",
  16: "アニメ",
  35: "コメディ",
  80: "犯罪",
  99: "ドキュメンタリー",
  18: "ドラマ",
  10751: "ファミリー",
  14: "ファンタジー",
  36: "歴史",
  27: "ホラー",
  10402: "音楽",
  9648: "ミステリー",
  10749: "ロマンス",
  878: "SF",
  10770: "TV映画",
  53: "スリラー",
  10752: "戦争",
  37: "西部劇",
};

// ジャンルIDをジャンル名に変換する関数
const getGenreNames = (genreIds) => {
  return genreIds.map((id) => genreMap[id] || "--").join(", ");
};

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMovies = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/movies/?page=${page}&year=${selectedYear}&query=${searchQuery}`
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
        <input
          type="text"
          placeholder="キーワードで検索"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="2020">2020年</option>
          <option value="2021">2021年</option>
          <option value="2022">2022年</option>
          <option value="2023">2023年</option>
          <option value="2024">2024年</option>
        </select>
      </div>
      <div className="movie-grid">
        {movies.length === 0 ? (
          <div className="no-results">
            <p>ヒットしませんでした</p>
          </div>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt="picture"
              />
              <p>{movie.release_date}</p>
              <p>{getGenreNames(movie.genre_ids)}</p>
            </div>
          ))
        )}
      </div>

      {movies.length > 0 && currentPage < totalPages && (
        <button onClick={loadMore} className="load-more-btn">
          もっと見る
        </button>
      )}
    </div>
  );
}

export default App;
