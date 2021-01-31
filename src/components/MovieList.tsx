import React, { useEffect, useState } from 'react'
import './MovieList.scss'

import { createApiClient, Movie } from '../data/api'
import { useSelector } from 'react-redux'

import MovieListItem from './MovieListItem'
import Overviewheader from './OverviewHeader'

const api = createApiClient()
const selectSearchTerm = (state: any) => state.searchTerm
const selectCategory = (state: any) => state.category

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>()
  const searchTerm = useSelector(selectSearchTerm)
  const category = useSelector(selectCategory)

  useEffect(() => {
    const fetchData = async () => {
      const movies = await api.getMovies()
      setMovies(movies || 'No movies loaded.')
    }

    fetchData()
  }, [])

  const renderMovies = (movies: Movie[]) => {
    const filteredMovies = movies.filter((movie) =>
      (
        movie.Title.toLowerCase() +
        movie.imdbID +
        movie.Year +
        movie.Type
      ).includes(
        searchTerm.toLowerCase() ||
        category.toLowerCase() ||
        (searchTerm.toLowerCase() && category.toLowerCase())
      )
    )

    return (
      <div className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieListItem
              key={movie.imdbID}
              movieInfo={{
                Title: `${movie.Title}`,
                Year: `${movie.Year}`,
                imdbID: `${movie.imdbID}`,
                Type: `${movie.Type}`,
                Poster: `${movie.Poster}`,
              }}
            />
          ))
        ) : (
            <p>Geen items gevonden.</p>
          )}
      </div>
    )
  }

  return (
    <div>
      <Overviewheader />
      {/* {movies ? <p>Showing {ovies.length} results</p> : null} */}
      {movies ? renderMovies(movies) : <h2>Loading...</h2>}
    </div>
  )
}

export default MovieList
