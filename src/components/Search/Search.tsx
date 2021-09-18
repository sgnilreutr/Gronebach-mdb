import React, { useEffect, useState } from 'react'
import './Search.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MovieSearch } from '../../data/api'
import SearchBar from '../Elements/SearchBar'
import MovieListItem from '../MovieOverview/MovieListItem'
import CloseButton from '../Elements/CloseButton'
import * as global from '../../constants/globalConstants'
import fetchData from '../../data/fetchData'

const selectSearchTerm = (state: any) => state.searchTerm
const selectBaseLoaded = (state: any) => state.baseLoaded

const START_SEARCHING = 'Start met zoeken'

export default function Search() {
  const searchTerm = useSelector(selectSearchTerm)
  const baseLoaded = useSelector(selectBaseLoaded)
  const [movieList, setMovieList] = useState<MovieSearch[]>([])

  useEffect(() => {
    if (movieList.length === 0 && baseLoaded) {
      fetchData().then((value) => setMovieList(value))
    }
  }, [baseLoaded, movieList])

  const renderSearchMovies = () => {
    const filteredMovies = movieList.filter((movie) =>
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
            const { Title, Year, imdbID, Type, Poster, Runtime, Genre, Actors, Country, imdbRating, Director } = movie
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
          }
          )
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
      {movieList.length === 0 && <h2>{global.LOADING}</h2>}
      {movieList.length > 0 && searchTerm && renderSearchMovies()}
      {movieList.length > 0 && !searchTerm && <h2 className="search-page-placeholder">{START_SEARCHING}</h2>}
    </div>
  )
}
