import { useContext } from 'react'
import './MovieOverview.scss'
import { Link, useLocation } from 'react-router-dom'

import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'
import { filteredList } from '../../utils/filteredMovieList'
import { DetailHeader } from '../Header/DetailHeader'
import { MovieListItem } from './MovieListItem'
import {
  ALL_CATEGORY_VALUE,
  NO_ITEMS,
  LINK_MISSING_TITLE,
  LOADING,
} from '../../constants/globalConstants'

const MovieOverview = () => {
  const location = useLocation()
  const { allMovies } = useContext(MovieDatabaseContext)
  const partLoc = location.pathname.split('/')

  const renderMovies = () => {
    if (!allMovies) {
      return null
    }
    const staticFilteredList = filteredList({
      activeFilter: partLoc[2],
      movies: allMovies,
    })
    return (
      <div>
        <h1>Alle {partLoc[2] !== ALL_CATEGORY_VALUE && partLoc[2]} items</h1>
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
              <p>{NO_ITEMS}</p>
              <Link to="/missing">{LINK_MISSING_TITLE}</Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <DetailHeader />
      {allMovies.length > 0 ? renderMovies() : <h2>{LOADING}</h2>}
    </div>
  )
}

export default MovieOverview
