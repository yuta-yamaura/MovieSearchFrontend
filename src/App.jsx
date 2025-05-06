import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])

  const TMDB_API_KEY = '5236c086a277777d7410fd8aa38d04d5'

  useEffect(() => {
    async function fetchProducts() {
      const {data} = await axios.get('http://127.0.0.1:8000/api/movies/693134/')
      console.log(data)
      setProducts(data)
    }
    fetchProducts();
  }, [])

  return (
    <>
      <div>
          <img src={`https://image.tmdb.org/t/p/w500/${products.backdrop_path}`} alt="picture" />
      </div>
    </>
  )
}

export default App
