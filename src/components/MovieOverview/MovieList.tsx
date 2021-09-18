import React, { useEffect, useRef, useState } from 'react'
import './MovieList.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import MovieListItem from './MovieListItem'
import * as global from '../../constants/globalConstants'
import { Movie } from '../../data/api'

interface Props {
  movies: Movie[]
}

const selectCategory = (state: any) => state.category

const MovieList: React.FC<Props> = ({ movies }) => {
  const category = useSelector(selectCategory)
  const [menuItems, setMenuItems] = useState<any>([])
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const isMountedRef = useRef<boolean | null>(null)

  useEffect(() => {
    if (movies.length > 0) {
      const moviesFiltered = movies.filter((movie) =>
        movie.Type.toLowerCase().includes(category.toLowerCase())
      )
      setFilteredMovies(moviesFiltered)
    }
  }, [category, movies])

  const Menu = () =>
    filteredMovies.map((movie: any) => (
      <MovieListItem
        key={movie.imdbID}
        movieInfo={{
          Title: `${movie.Title}`,
          imdbID: `${movie.imdbID}`,
          Poster: `${movie.Poster}`,
          Genre: `${movie.Genre}`,
          Type: `${movie.Type}`,
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
    if (filteredMovies.length > 0) setMenuItems(Menu())
    return () => {
      isMountedRef.current = false
    }
  }, [filteredMovies])

  const renderMovies = () => (
    <div>
      {filteredMovies.length > 0 && window.innerWidth >= global.WINDOW_WIDTH_416 && (
        <ScrollMenu data={menuItems} arrowLeft={ArrowLeft} arrowRight={ArrowRight} wheel={false} />
      )}
      {filteredMovies.length > 0 && window.innerWidth < global.WINDOW_WIDTH_416 && (
        <div className="movie-horizontal-grid">
          <div className="hs hs-scroll">
            {filteredMovies.map((movie) => {
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
      {filteredMovies.length < 1 && (
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
