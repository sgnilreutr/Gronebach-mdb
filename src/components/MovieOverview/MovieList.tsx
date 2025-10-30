import { type ReactNode, useEffect, useState } from 'react'
import './MovieList.scss'
import { Link } from 'react-router-dom'

import type { Movie } from '../../data/dataTypes'
import { MovieListItem } from './MovieListItem'
import { NO_ITEMS, LINK_MISSING_TITLE, LOADING } from '../../constants/globalConstants'
import { ScrollMenu } from './ScrollMenu'
import { useBreakpoint } from '../../hooks/useBreakPoint'

interface MovieListProps {
  movies: Array<Movie>
}

export function MovieList({ movies }: MovieListProps) {
  const isTabletOrMobile = useBreakpoint('md')
  const [menuItems, setMenuItems] = useState<Array<ReactNode>>([])

  useEffect(() => {
    if (movies.length > 0) {
      setMenuItems(
        movies.map(({ Title, imdbID, Poster }) => (
          <MovieListItem
            key={imdbID}
            movieInfo={{
              Title,
              imdbID,
              Poster,
            }}
          />
        ))
      )
    }
  }, [movies])

  const renderMovies = () => (
    <div>
      {movies.length > 0 && !isTabletOrMobile && <ScrollMenu>{menuItems}</ScrollMenu>}
      {movies.length > 0 && isTabletOrMobile && (
        <div className='movie-horizontal-grid'>
          <div className='hs hs-scroll'>
            {movies.map(({ Title, imdbID, Poster }) => (
              <MovieListItem
                key={imdbID}
                movieInfo={{
                  Title,
                  imdbID,
                  Poster,
                }}
              />
            ))}
          </div>
        </div>
      )}
      {movies.length < 1 && (
        <div>
          <p>{NO_ITEMS}</p>
          <Link to='/missing'>{LINK_MISSING_TITLE}</Link>
        </div>
      )}
    </div>
  )

  return <div>{movies ? renderMovies() : <h2>{LOADING}</h2>}</div>
}
