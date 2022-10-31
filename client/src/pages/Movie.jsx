import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs'

import './Movie.css'
import { MovieCard } from '../components/MovieCard'

const moviesDb = import.meta.env.VITE_API

export const Movie = () => {
  const {id} =useParams()
  const [movie, setMovie] = useState(null)

  const getMovie = async(url) => {
    const response = await fetch(url)
    const data = await response.json()

    setMovie(data)
  }

  function formatCurrency(number) {
    return number.toLocaleString('en-US', {
      style:'currency',
      currency: 'USD'
    })
  }

   useEffect(() => {
    const movieUrl = `${moviesDb}/movies/${id}`
    getMovie(movieUrl)
  }, [])


  return <div className="movie_page">
    {movie && (
      <>
      <MovieCard movie={movie} showLink={false} />
      <p className="tag">{movie.tagline}</p>
      <div className="info">
        <h3>
          <BsWallet2 /> Budget:
        </h3>
        <p>
          {formatCurrency(movie.budget)}
        </p>
      </div>
      <div className="info">
        <h3>
          <BsGraphUp /> Income:
        </h3>
        <p>
          {formatCurrency(movie.revenue)}
        </p>
      </div>
      <div className="info">
        <h3>
          <BsHourglassSplit /> Duration:
        </h3>
        <p>
          {movie.runtime} mins
        </p>
      </div>
      <div className="info description">
        <h3>
          <BsFillFileEarmarkTextFill /> Description:
        </h3>
        <p>
          {movie.overview}
        </p>
      </div>
      </>
    )}
  </div>
}