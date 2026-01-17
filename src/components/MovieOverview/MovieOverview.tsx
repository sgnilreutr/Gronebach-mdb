import { Link, useLocation } from 'react-router-dom'
import { filteredList } from '../../utils/filteredMovieList'
import { DetailHeader } from '../Header/DetailHeader'
import { MovieListItem } from './MovieListItem'
import { ALL_CATEGORY_VALUE, NO_ITEMS, LINK_MISSING_TITLE } from '../../constants/globalConstants'
import type { Movie } from '../../data/dataTypes'

function derivePartialLocation(pathname: string): Array<string> | null {
  const splittedPathname = pathname.split('/')
  if (splittedPathname.length === 0) {
    return null
  } else {
    return splittedPathname
  }
}

export default function MovieOverview({ allMovies }: { allMovies: Array<Movie> }) {
  const location = useLocation()
  const possiblePartialLocation = derivePartialLocation(location.pathname)

  const renderMovies = () => {
    if (possiblePartialLocation === null) {
      return null
    }
    const staticFilteredList = filteredList({
      activeFilter: possiblePartialLocation.at(2),
      movies: allMovies,
    })
    return (
      <div>
        <h1>Alle {possiblePartialLocation.at(2) !== ALL_CATEGORY_VALUE && possiblePartialLocation.at(2)} items</h1>
        <div className='grid justify-items-center grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-y-4 gap-x-0 md:grid-cols-[repeat(auto-fill,minmax(256px,1fr))] md:gap-y-[68px] md:gap-x-[68px] grid-rows-[auto]'>
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
              <Link to='/missing'>{LINK_MISSING_TITLE}</Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='relative'>
      <DetailHeader allMovies={allMovies} />
      {renderMovies()}
    </div>
  )
}
