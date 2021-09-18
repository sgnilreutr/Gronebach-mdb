import React, { useContext } from 'react'
import './MovieOverview.scss'
import { Link, useLocation } from 'react-router-dom'
import { MovieSearch } from '../../data/api'
import MovieListItem from './MovieListItem'
import DetailHeader from '../Header/DetailHeader'
import * as global from '../../constants/globalConstants'
import MovieDatabaseContext from '../../context/movieDatabaseContext'

const MovieOverview: React.FC = () => {
  const location = useLocation()
  const allMovieList = useContext(MovieDatabaseContext) as MovieSearch[]
  const partLoc = location.pathname.split('/')

  const filteredList = () => {
    if (partLoc[2] === 'kids' && allMovieList.length > 0) {
      return allMovieList.filter((movie) => movie.Rated === 'PG' && 'G')
    }
    if (partLoc[2] === 'top' && allMovieList.length > 0) {
      return allMovieList.filter((movie) => parseInt(movie.imdbRating, 10) >= 8.0)
    }
    return allMovieList.filter((movie) => movie.Genre.toLowerCase().includes(`${ partLoc[2] }`))
  }

  const renderMovies = () => {
    if (allMovieList) {
      return (
        <div>
          <h1>Alle {partLoc[2]} items</h1>
          <div className="movie-grid">
            {filteredList().length > 0 ? (
              filteredList().map((movie) => {
                const { Title, imdbID, Poster, Genre, Type } = movie
                return (
                  <div key={movie.imdbID}>
                    <MovieListItem
                      movieInfo={{
                        Title,
                        Genre,
                        imdbID,
                        Poster,
                        Type,
                      }}
                    />
                  </div>
                )
              })
            ) : (
              <div>
                <p>{global.NO_ITEMS}</p>
                <Link to="/missing">{global.LINK_MISSING_TITLE}</Link>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <DetailHeader />
      {allMovieList.length > 0 ? renderMovies() : <h2>{global.LOADING}</h2>}
    </div>
  )
}

export default MovieOverview
