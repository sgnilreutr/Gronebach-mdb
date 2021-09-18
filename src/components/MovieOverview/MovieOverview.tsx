import React, { useEffect, useState } from 'react'
import './MovieOverview.scss'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Movie } from '../../data/api'
import MovieListItem from './MovieListItem'
import DetailHeader from '../Header/DetailHeader'
import * as global from '../../constants/globalConstants'
import fetchData from '../../data/fetchData'

interface Props {
  movies: any
}

const selectBaseLoaded = (state: any) => state.baseLoaded

const MovieOverview: React.FC<Props> = () => {
  const [movieList, setMovieList] = useState<Movie[]>([])
  const baseLoaded = useSelector(selectBaseLoaded)
  const location = useLocation()
  const partLoc = location.pathname.split('/')

  useEffect(() => {
    if (movieList.length === 0 && baseLoaded) {
      fetchData().then((value) => setMovieList(value))
    }
  }, [baseLoaded, movieList])


  const filteredList = () => {
    if (partLoc[2] === 'kids') {
      return movieList.filter((movie) => movie.Rated === 'PG' && 'G')
    }
    if (partLoc[2] === 'top') {
      return movieList.filter((movie: any) => movie.imdbRating >= 8.0)
    }
    return movieList.filter((movie) => movie.Genre.toLowerCase().includes(`${ partLoc[2] }`))
  }


  const renderMovies = () => {
    if (movieList) {

      return (
        <div>
          <h1>Alle {partLoc[2]} items</h1>
          <div className="movie-grid">
            {filteredList().length > 0 ? (
              filteredList().map((movie) => {
                const { Title, imdbID, Poster, Genre } = movie
                return (
                  <div key={movie.imdbID}>
                    <MovieListItem
                      movieInfo={{
                        Title,
                        Genre,
                        imdbID,
                        Poster,
                      }}
                    />
                  </div>
                )
              })
            ) : (
              <div>
                <p>{global.NO_ITEMS}</p>
                <Link to="/missing">{global.LINK_MISSING_TITLE}</Link>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <DetailHeader />
      {movieList ? renderMovies() : <h2>{global.LOADING}</h2>}
    </div>
  )
}

export default MovieOverview
