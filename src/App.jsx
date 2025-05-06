import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [movies, setMovies] = useState([])


  useEffect(() => {
    const fetchMovies = async() => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movies/693134/')
        setMovies(response.data.results)
        console.log(movies)
      } catch(err) {
          console.log(err)
      }
    }
    fetchMovies();
  }, [])

  return (
    <>
      <div>
        {movies.map((movie) => 
          <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="picture" />
        )}
      </div>
    </>
  )
}

export default App
