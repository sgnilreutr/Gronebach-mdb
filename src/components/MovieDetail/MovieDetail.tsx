import { useContext, useEffect, useState, useRef } from 'react'
import './MovieDetail.scss'
import { FiStar } from 'react-icons/fi'
import { useParams } from 'react-router-dom'

import * as global from '../../constants/globalConstants'
import MovieDatabaseContext from '../../context/movieDatabaseContext'
import { getMoviePosterUrl } from '../../data/api'
import type { IMovie } from '../../data/dataTypes'
import DetailHeader from '../Header/DetailHeader'
import { MovieTrailer, OpenTrailerButton } from './MovieTrailer'
import RelatedMovies from './RelatedMovies'
import {
  REPORT_LINK,
  RATING,
  ACTORS,
  DIRECTOR,
  GENRE,
  RUNTIME,
  RELATED_MOVIES,
} from './MovieDetailConstants'

interface IRenderDetail {
  movie: IMovie
  movieID: string | undefined
}

const RenderDetail = ({ movie, movieID }: IRenderDetail) => {
  const [trailerActive, setTrailerActive] = useState(false)
  const movieTitleRef = useRef<any>(null)
  const {
    imdbID,
    Title,
    Year,
    Poster,
    Plot,
    Actors,
    Director,
    Genre,
    imdbRating,
    Runtime,
  } = movie

  useEffect(() => {
    setTrailerActive(false)
  }, [movieID])

  const triggerOpenTrailerState = () => {
    setTrailerActive(!trailerActive)
  }

  useEffect(() => {
    if (movieID && movieTitleRef.current) {
      movieTitleRef.current.scrollIntoView()
    }
  }, [movieID])

  return (
    <div className="detail-container" key={imdbID}>
      <div className="item-title">
        <div className="text-truncate">
          <h1 ref={movieTitleRef}>
            {Title} ({Year})
          </h1>
        </div>
      </div>
      <div>
        <div>
          <div className="details-inner">
            <div className="image-report">
              <img
                src={getMoviePosterUrl(Poster)}
                alt={Title}
                className="img"
              />
              <a
                href={`mailto:robberttg@gmail.com?subject=GMDB melding - ${Title}&body=${Title} (${imdbID}) is incorrect - aub een andere uploaden.`}
                style={{ marginTop: '1rem' }}
              >
                <small>{REPORT_LINK}</small>
              </a>
            </div>
            <div className="text-details">
              {!trailerActive && (
                <OpenTrailerButton openTrailer={triggerOpenTrailerState} />
              )}
              {trailerActive && <MovieTrailer movieID={imdbID} />}
              <div className="rating">
                <FiStar />
                <span style={{ marginLeft: `8px` }}>
                  <b>{imdbRating}</b> {RATING}
                </span>
              </div>
              <div className="description">{Plot}</div>
              <div className="details">
                <span className="detail-header">{ACTORS}</span>
                <span>{Actors}</span>
              </div>
              <div className="details">
                <span className="detail-header">{DIRECTOR}</span>
                <span>{Director}</span>
              </div>
              <div className="details">
                <span className="detail-header">{GENRE}</span>
                <span>{Genre}</span>
              </div>
              <div className="details">
                <span className="detail-header">{RUNTIME}</span>
                <span>{Runtime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="related-container slow_reveal">
        <h2>{RELATED_MOVIES}</h2>
        {movieID ? <RelatedMovies genre={Genre} activeMovie={movieID} /> : null}
      </div>
    </div>
  )
}

const MovieDetail = () => {
  const { movieID } = useParams()
  const { movies } = useContext(MovieDatabaseContext)

  const movie = movieID
    ? movies.find(({ imdbID }) => imdbID.toLowerCase().includes(`${movieID}`))
    : 'loading'

  return (
    <div>
      <DetailHeader />
      {movie === 'loading' ? <h2>{global.LOADING}</h2> : null}
      {typeof movie === 'object' ? (
        <RenderDetail movie={movie} movieID={movieID} />
      ) : null}
      {movie === undefined ? <h2>{global.COULD_NOT_LOAD}</h2> : null}
    </div>
  )
}

export default MovieDetail
