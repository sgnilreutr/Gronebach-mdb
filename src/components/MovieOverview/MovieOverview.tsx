import { useContext } from 'react'
import './MovieOverview.scss'
import { Link, useLocation } from 'react-router-dom'

import * as global from '../../constants/globalConstants'
import MovieDatabaseContext from '../../context/movieDatabaseContext'
import filteredList from '../../utils/filteredMovieList'
import DetailHeader from '../Header/DetailHeader'
import MovieListItem from './MovieListItem'

const MovieOverview = () => {
  const location = useLocation()
  const { movies } = useContext(MovieDatabaseContext)
  const partLoc = location.pathname.split('/')

  const renderMovies = () => {
    if (!movies) {
      return null
    }
    const staticFilteredList = filteredList({
      activeFilter: partLoc[2],
      movies,
    })
    return (
      <div>
        <h1>
          Alle {partLoc[2] !== global.ALL_CATEGORY_VALUE && partLoc[2]} items
        </h1>
        <div className="movie-grid">
          {staticFilteredList.length > 0 ? (
            staticFilteredList.map(({ Title, imdbID, Poster }) => (
              <div key={imdbID}>
                <MovieListItem
                  movieInfo={{
                    Title,
                    imdbID,
                    Poster,
                  }}
                />
              </div>
            ))
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
