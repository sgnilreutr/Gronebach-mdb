import React, { useContext, useEffect, useState, useRef } from 'react'
import './MovieDetail.scss'
import { FiStar } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import DetailHeader from '../Header/DetailHeader'
import { getMoviePosterUrl, IMovie, IMovieDetail } from '../../data/api'
import { MovieTrailer, OpenTrailerButton } from './MovieTrailer'
import RelatedMovies from './RelatedMovies'
import * as global from '../../constants/globalConstants'
import MovieDatabaseContext from '../../context/movieDatabaseContext'

const RATING = '/ 10'
const ACTORS = 'Acteurs'
const DIRECTOR = 'Regisseur'
const GENRE = 'Genre'
const RUNTIME = 'Runtime'
const RELATED_MOVIES = 'Gerelateerde films'
const REPORT_LINK = 'Report an invalid movie'

const MovieDetail = () => {
  const { movieID } = useParams()
  const [movie, setMovie] = useState<any>()
  const [trailerActive, setTrailerActive] = useState(false)
  const movieTitleRef = useRef<any | null>(null)
  const allMovieList = useContext(MovieDatabaseContext) as IMovie[]

  useEffect(() => {
    if (movieID && movieTitleRef.current) {
      movieTitleRef.current.scrollIntoView()
    }
  }, [movieID])

  useEffect(() => {
    if (movieID && allMovieList.length > 0) {
      setMovie(
        allMovieList.filter((item) =>
          item.imdbID.toLowerCase().includes(`${ movieID }`)
        )
      )
    }
  }, [movieID, allMovieList])

  useEffect(() => {
    setTrailerActive(false)
  }, [movieID])

  const triggerOpenTrailerState = () => {
    setTrailerActive(!trailerActive)
  }

  const renderDetail = () => (
    <>
      {movie.map((item: IMovieDetail) => {
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
        } = item
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
                      href={`mailto:robberttg@gmail.com?subject=GMDB melding - ${ Title }&body=${ Title } (${ imdbID }) is incorrect - aub een andere uploaden.`}
                      style={{ marginTop: '1rem' }}
                    >
                      <small>{REPORT_LINK}</small>
                    </a>
                  </div>
                  <div className="text-details">
                    {!trailerActive && (
                      <OpenTrailerButton
                        openTrailer={triggerOpenTrailerState}
                      />
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
              {movieID && <RelatedMovies genre={Genre} activeMovie={movieID} />}
            </div>
          </div>
        )
      })}
    </>
  )

  return (
    <div>
      <DetailHeader />
      {movie ? renderDetail() : <h2>{global.LOADING}</h2>}
    </div>
  )
}

export default MovieDetail
