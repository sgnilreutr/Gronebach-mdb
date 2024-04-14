import { useContext } from 'react'
import './Search.scss'
import { Link } from 'react-router-dom'

import { MovieDatabaseContext } from '../../context/movieDatabaseContext'
import { CloseButton } from '../Elements/CloseButton'
import { SearchBar } from '../Elements/SearchBar'
import { MovieListItem } from '../MovieOverview/MovieListItem'
import { useAppSelector } from '../../store/hooks'
import { selectSearchTerm } from '../../store/appSlice'
import type { Movie } from '../../data/dataTypes'
import {
  NO_ITEMS,
  LINK_MISSING_TITLE,
  LOADING,
} from '../../constants/globalConstants'

const START_SEARCHING = 'Start met zoeken'

interface RenderSearchMoviesProps {
  movies: Array<Movie>
  searchTerm: string
}

const RenderSearchMovies = ({
  movies,
  searchTerm,
}: RenderSearchMoviesProps) => {
  const filteredMovies = movies.filter(
    ({
      Title,
      Year,
      Type,
      Runtime,
      Genre,
      Director,
      Actors,
      Country,
      Plot,
      imdbRating,
    }) =>
      (
        Title.toLowerCase() +
        Year +
        Type.toLowerCase() +
        Runtime.toLowerCase() +
        Genre.toLowerCase() +
        Director.toLowerCase() +
        Actors.toLowerCase() +
        Country.toLowerCase() +
        Plot.toLowerCase() +
        imdbRating
      ).includes(searchTerm.toLowerCase())
  )

  return (
    <div className="movie-grid">
      {filteredMovies.length > 0 ? (
        filteredMovies.map(({ Title, imdbID, Poster }) => (
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
        <div className="search-no-results">
          <p>{NO_ITEMS}</p>
          <Link to="/missing">{LINK_MISSING_TITLE}</Link>
        </div>
      )}
    </div>
  )
}

export default function Search() {
  const searchTerm = useAppSelector(selectSearchTerm)
  const { movies } = useContext(MovieDatabaseContext)

  return (
    <div>
      <div className="search-options">
        <SearchBar />
        <CloseButton />
      </div>
      {movies.length === 0 ? <h2>{LOADING}</h2> : null}
      {movies.length > 0 && searchTerm ? (
        <RenderSearchMovies movies={movies} searchTerm={searchTerm} />
      ) : null}
      {movies.length > 0 && !searchTerm ? (
        <h2 className="search-page-placeholder">{START_SEARCHING}</h2>
      ) : null}
    </div>
  )
}
