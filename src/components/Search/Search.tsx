import { useContext, useMemo } from 'react'
import './Search.scss'
import { Link } from 'react-router-dom'

import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'
import { CloseButton } from '../Elements/CloseButton'
import { SearchBar } from '../Elements/SearchBar'
import { MovieListItem } from '../MovieOverview/MovieListItem'
import type { Movie } from '../../data/dataTypes'
import { NO_ITEMS, LINK_MISSING_TITLE, LOADING } from '../../constants/globalConstants'
import { useDebounce } from '../../hooks/useDebounce'

const START_SEARCHING = 'Start met zoeken'

interface RenderSearchMoviesProps {
  movies: Array<Movie>
  searchTerm: string
}

function RenderSearchMovies({ movies, searchTerm }: RenderSearchMoviesProps) {
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const filteredMovies = movies.filter(
    ({ Title, Year, Type, Runtime, Genre, Director, Actors, Country, Plot, imdbRating }) =>
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
      ).includes(debouncedSearchTerm.toLowerCase())
  )

  const memoizedFilteredMovies = useMemo(
    () =>
      filteredMovies.length > 0 ? (
        filteredMovies.map(({ Title, imdbID, Poster }) => (
          <MovieListItem
            key={imdbID}
            movieInfo={{
              Title,
              imdbID,
              Poster,
            }}
          />
        ))
      ) : (
        <div className='search-no-results'>
          <p>{NO_ITEMS}</p>
          <Link to='/missing'>{LINK_MISSING_TITLE}</Link>
        </div>
      ),
    [filteredMovies]
  )

  return (
    <div className='movie-grid' key={filteredMovies.length + debouncedSearchTerm}>
      {memoizedFilteredMovies}
    </div>
  )
}

export default function Search() {
  const { allMovies, searchTerm } = useContext(MovieDatabaseContext)

  return (
    <div>
      <div className='search-options'>
        <SearchBar />
        <CloseButton />
      </div>
      {allMovies.length === 0 ? <h2>{LOADING}</h2> : null}
      {allMovies.length > 0 && searchTerm ? <RenderSearchMovies movies={allMovies} searchTerm={searchTerm} /> : null}
      {allMovies.length > 0 && !searchTerm ? <h2 className='search-page-placeholder'>{START_SEARCHING}</h2> : null}
    </div>
  )
}
