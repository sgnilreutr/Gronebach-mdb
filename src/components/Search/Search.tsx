import { useContext } from 'react'
import './Search.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import * as global from '../../constants/globalConstants'
import MovieDatabaseContext from '../../context/movieDatabaseContext'
import CloseButton from '../Elements/CloseButton'
import SearchBar from '../Elements/SearchBar'
import MovieListItem from '../MovieOverview/MovieListItem'

const selectSearchTerm = (state: any) => state.searchTerm

const START_SEARCHING = 'Start met zoeken'

export default function Search() {
  const searchTerm = useSelector(selectSearchTerm)
  const { movies } = useContext(MovieDatabaseContext)

  const renderSearchMovies = () => {
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
        movie.Plot.toLowerCase() +
        movie.imdbRating
      ).includes(searchTerm.toLowerCase())
    )

    return (
      <div className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => {
            const {
              Title,
              Year,
              imdbID,
              Type,
              Poster,
              Runtime,
              Genre,
              Actors,
              Country,
              imdbRating,
              Director,
            } = movie
            return (
              <div key={movie.imdbID}>
                <MovieListItem
                  movieInfo={{
                    Title,
                    Year,
                    imdbID,
                    Type,
                    Poster,
                    Runtime,
                    Genre,
                    Actors,
                    Country,
                    imdbRating,
                    Director,
                  }}
                />
              </div>
            )
          })
        ) : (
          <div className="search-no-results">
            <p>{global.NO_ITEMS}</p>
            <Link to="/missing">{global.LINK_MISSING_TITLE}</Link>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="search-options">
        <SearchBar />
        <CloseButton />
      </div>
      {movies.length === 0 ? <h2>{global.LOADING}</h2> : null}
      {movies.length > 0 && searchTerm ? renderSearchMovies() : null}
      {movies.length > 0 && !searchTerm ? (
        <h2 className="search-page-placeholder">{START_SEARCHING}</h2>
      ) : null}
    </div>
  )
}
