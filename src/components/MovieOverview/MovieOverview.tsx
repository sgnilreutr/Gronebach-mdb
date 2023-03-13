import { useContext } from 'react'
import './MovieOverview.scss'
import { Link, useLocation } from 'react-router-dom'

import * as global from '../../constants/globalConstants'
import MovieDatabaseContext from '../../context/movieDatabaseContext'
import DetailHeader from '../Header/DetailHeader'
import MovieListItem from './MovieListItem'

const MovieOverview: React.FC = () => {
  const location = useLocation()
  const { movies } = useContext(MovieDatabaseContext)
  const partLoc = location.pathname.split('/')

  const filteredList = () => {
    if (partLoc[2] === 'kids' && movies.length > 0) {
      return movies.filter((movie) => movie.Rated === 'PG' && 'G')
    }
    if (partLoc[2] === 'top' && movies.length > 0) {
      return movies.filter((movie) => parseInt(movie.imdbRating, 10) >= 8.0)
    }
    if (partLoc[2] === 'all' && movies.length > 0) {
      return movies
    }
    return movies.filter((movie) =>
      movie.Genre.toLowerCase().includes(`${partLoc[2]}`)
    )
  }

  const renderMovies = () => {
    if (!movies) {
      return null
    }
    return (
      <div>
        <h1>
          Alle {partLoc[2] !== global.ALL_CATEGORY_VALUE && partLoc[2]} items
        </h1>
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

  return (
    <div>
      <DetailHeader />
      {movies.length > 0 ? renderMovies() : <h2>{global.LOADING}</h2>}
    </div>
  )
}

export default MovieOverview
