import React, { useEffect, useRef, useState } from 'react'
import './MovieList.scss'
import { Link } from 'react-router-dom'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import MovieListItem from './MovieListItem'
import * as global from '../../constants/globalConstants'
import { Movie } from '../../data/api'

interface Props {
  movies: Movie[]
}

const MovieList: React.FC<Props> = ({ movies }) => {
  const [menuItems, setMenuItems] = useState<any>([])
  const isMountedRef = useRef<boolean | null>(null)

  const Menu = () =>
    movies.map((movie: any) => (
      <MovieListItem
        key={movie.imdbID}
        movieInfo={{
          Title: `${ movie.Title }`,
          imdbID: `${ movie.imdbID }`,
          Poster: `${ movie.Poster }`,
          Genre: `${ movie.Genre }`,
          Type: `${ movie.Type }`,
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
      {movies.length > 0 && window.innerWidth >= global.WINDOW_WIDTH_416 && (
        <ScrollMenu data={menuItems} arrowLeft={ArrowLeft} arrowRight={ArrowRight} wheel={false} />
      )}
      {movies.length > 0 && window.innerWidth < global.WINDOW_WIDTH_416 && (
        <div className="movie-horizontal-grid">
          <div className="hs hs-scroll">
            {movies.map((movie) => {
              const { Title, imdbID, Poster, Genre, Type } = movie
              return (
                <MovieListItem
                  key={movie.imdbID}
                  movieInfo={{
                    Title,
                    imdbID,
                    Poster,
                    Genre,
                    Type,
                  }}
                />
              )
            })}
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

export default MovieList
