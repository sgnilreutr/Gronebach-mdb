import { useEffect, useRef, useState } from 'react'
import './MovieList.scss'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'

import * as global from '../../constants/globalConstants'
import type { Movie } from '../../data/dataTypes'
import { MovieListItem } from './MovieListItem'

interface MovieListProps {
  movies: Array<Movie>
}

export function MovieList({ movies }: MovieListProps) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: global.TABLET_MAX_WIDTH })
  const [menuItems, setMenuItems] = useState<Array<JSX.Element>>([])
  const isMountedRef = useRef<boolean | null>(null)

  const Menu = () =>
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

  const ArrowLeft = (
    <div className="arrow-global arrow-prev">
      <FaChevronLeft size={30} />
    </div>
  )
  const ArrowRight = (
    <div className="arrow-global arrow-next">
      <FaChevronRight size={30} />
    </div>
  )

  // Create menu from items
  useEffect(() => {
    isMountedRef.current = true
    if (movies.length > 0) setMenuItems(Menu())
    return () => {
      isMountedRef.current = false
    }
  }, [movies])

  const renderMovies = () => (
    <div>
      {movies.length > 0 && !isTabletOrMobile && (
        <ScrollMenu
          data={menuItems}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          wheel={false}
        />
      )}
      {movies.length > 0 && isTabletOrMobile && (
        <div className="movie-horizontal-grid">
          <div className="hs hs-scroll">
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
          <p>{global.NO_ITEMS}</p>
          <Link to="/missing">{global.LINK_MISSING_TITLE}</Link>
        </div>
      )}
    </div>
  )

  return <div>{movies ? renderMovies() : <h2>{global.LOADING}</h2>}</div>
}
