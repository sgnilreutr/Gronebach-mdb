import React, { useContext } from 'react'
import './Search.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IMovieSearch } from '../../data/api'
import SearchBar from '../Elements/SearchBar'
import MovieListItem from '../MovieOverview/MovieListItem'
import CloseButton from '../Elements/CloseButton'
import * as global from '../../constants/globalConstants'
import MovieDatabaseContext from '../../context/movieDatabaseContext'

const selectSearchTerm = (state: any) => state.searchTerm

const START_SEARCHING = 'Start met zoeken'

export default function Search() {
  const searchTerm = useSelector(selectSearchTerm)
  const allMovieList = useContext(MovieDatabaseContext) as IMovieSearch[]

  const renderSearchMovies = () => {
    const filteredMovies = allMovieList.filter((movie) =>
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
      {allMovieList.length === 0 && <h2>{global.LOADING}</h2>}
      {allMovieList.length > 0 && searchTerm && renderSearchMovies()}
      {allMovieList.length > 0 && !searchTerm && (
        <h2 className="search-page-placeholder">{START_SEARCHING}</h2>
      )}
    </div>
  )
}
