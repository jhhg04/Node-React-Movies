import { useState, useEffect } from 'react'
import axios from 'axios'
import { MovieCard } from '../components/MovieCard'

import './MoviesGrid.css'

const moviesDb = import.meta.env.VITE_API

export const Home = () => {
  const [topMovies, setTopMovies] = useState([])

  const getTopRatedMovies = () => {
    axios.get(`${moviesDb}/most_popular`)
    .then(response => {
      setTopMovies(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }
  useEffect(() => {
    getTopRatedMovies()
  }, [])

  return (
    <div className="container">
      <h2 className="title">Best Movies:</h2>
      <div className="movies_container">
        {topMovies.length === 0 && <p>Loading...</p>}
        {topMovies.length > 0 && topMovies.map((movie)=>(
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}