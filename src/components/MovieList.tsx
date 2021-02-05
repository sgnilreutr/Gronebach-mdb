import React from 'react'
import './MovieList.scss'

import { Movie } from '../data/api'
import { useSelector } from 'react-redux'

import MovieListItem from './MovieListItem'
import { Link } from 'react-router-dom'


interface Props {
  movies: any
}

const selectSearchTerm = (state: any) => state.searchTerm
const selectCategory = (state: any) => state.category

const MovieList: React.FC<Props> = ({ movies }) => {
  const searchTerm = useSelector(selectSearchTerm)
  const category = useSelector(selectCategory)

  const renderMovies = (movies: Movie[]) => {
    const filteredMovies = movies.filter((movie) =>
      (
        movie.Title.toLowerCase() +
        movie.Year +
        movie.Type.toLowerCase() +
        movie.Runtime.toLowerCase() +
        movie.Genre.toLowerCase() +
        movie.Director.toLowerCase() +
        movie.Actors.toLowerCase() +
        movie.Country.toLowerCase() +
        movie.imdbRating
      ).includes(
        searchTerm.toLowerCase() ||
        category.toLowerCase() ||
        (searchTerm.toLowerCase() && category.toLowerCase())
      )
    )

    return (
      <div className="movie-horizontal-grid">
        <div className="hs hs-scroll">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieListItem
                key={movie.imdbID}
                movieInfo={{
                  Title: `${ movie.Title }`,
                  Year: `${ movie.Year }`,
                  imdbID: `${ movie.imdbID }`,
                  Type: `${ movie.Type }`,
                  Poster: `${ movie.Poster }`,
                  Runtime: `${ movie.Runtime }`,
                  Genre: `${ movie.Genre }`,
                  Actors: `${ movie.Actors }`,
                  Country: `${ movie.Country }`,
                  imdbRating: `${ movie.imdbRating }`,
                  Director: `${ movie.Director }`
                }}
              />
            ))
          ) : (
              <div>
                <p>Geen items gevonden.</p>
                <Link to="/missing">Controleer de ontbrekende titels</Link>
              </div>
            )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {movies ? renderMovies(movies) : <h2>Loading...</h2>}
    </div>
  )
}

export default MovieList
