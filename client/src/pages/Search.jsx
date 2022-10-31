import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import './MoviesGrid.css'

import { MovieCard } from '../components/MovieCard'

const moviesDb = import.meta.env.VITE_API

export const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')

  const [movies, setMovies] = useState([])

  const getSearchedMovies =  () => {
    axios.get(`${moviesDb}/search`, {
      params: {
        title: query
      }
    })
    .then(response => {
      setMovies(response.data)
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    getSearchedMovies()
  }, [query])

  return (
    <div className="container">
      <h2 className="title">Results For: <span className="query_text">{query}</span></h2>
      <div className="movies_container">
        {movies.length === 0 && <p>Loading...</p>}
        {movies.length > 0 && movies.map((movie)=>(
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}