import { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'
import { CloseButton } from '../Elements/CloseButton'
import { SearchBar } from '../Elements/SearchBar'
import { MovieListItem } from '../MovieOverview/MovieListItem'
import type { Movie } from '../../data/dataTypes'
import { NO_ITEMS, LINK_MISSING_TITLE } from '../../constants/globalConstants'
import { useDebounce } from '../../hooks/useDebounce'

interface SearchMoviesProps {
  movies: Array<Movie>
  searchTerm: string
}

function SearchMovies({ movies, searchTerm }: SearchMoviesProps) {
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
        <div className='w-full col-span-3'>
          <p>{NO_ITEMS}</p>
          <Link to='/missing' className='font-semibold underline'>
            {LINK_MISSING_TITLE}
          </Link>
        </div>
      ),
    [filteredMovies]
  )

  return (
    <div
      className='mx-3 lg:mx-0 grid justify-items-center grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-y-4 gap-x-0 md:grid-cols-[repeat(auto-fill,minmax(256px,1fr))] md:gap-y-[68px] md:gap-x-[68px] grid-rows-[auto]'
      key={filteredMovies.length + debouncedSearchTerm}>
      {memoizedFilteredMovies}
    </div>
  )
}

export default function Search({ allMovies }: { allMovies: Array<Movie> }) {
  const { searchTerm } = useContext(MovieDatabaseContext)

  return (
    <div className='flex flex-col gap-2'>
      <div className='mx-3 lg:mx-0 flex flex-row items-center gap-4 px-1'>
        <SearchBar />
        <CloseButton />
      </div>
      <SearchMovies movies={allMovies} searchTerm={searchTerm} />
    </div>
  )
}
