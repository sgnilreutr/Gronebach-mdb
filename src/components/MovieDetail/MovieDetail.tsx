import React, { useEffect, useState } from 'react'
import './MovieDetail.scss'
import { FiStar } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DetailHeader from '../Header/DetailHeader'
import {
  getMoviePosterUrl,
  MovieDetail
} from '../../data/api'
import { MovieTrailer, OpenTrailerButton } from './MovieTrailer'
import RelatedMovies from './RelatedMovies'
import * as global from '../../constants/globalConstants'
import fetchData from '../../data/fetchData'

const selectBaseLoaded = (state: any) => state.baseLoaded

const RATING = '/ 10'
const ACTORS = 'Acteurs'
const DIRECTOR = 'Regisseur'
const GENRE = 'Genre'
const RUNTIME = 'Runtime'
const RELATED_MOVIES = 'Gerelateerde films'

const Moviedetail: React.FC<MovieDetail> = () => {
  const { movieID } = useParams<{ movieID: string }>()
  const [movie, setMovie] = useState<any>()
  const [trailerActive, setTrailerActive] = useState(false)

  const baseLoaded = useSelector(selectBaseLoaded)

  useEffect(() => {
    if (baseLoaded && movieID) {
      fetchData().then((value) => setMovie(value.filter((item: any) =>
        item.imdbID.toLowerCase().includes(`${ movieID }`)
      )))
    }
  }, [movieID, baseLoaded])

  useEffect(() => {
    setTrailerActive(false)
  }, [movieID])

  const triggerOpenTrailerState = () => {
    setTrailerActive(!trailerActive)
  }

  const renderDetail = () => (
    <>
      {movie.map((item: any) => {
        const { imdbID, Title, Year, Poster, Plot, Actors, Director, Genre, imdbRating, Runtime } = item
        return (
          <div className="detail-container" key={imdbID}>
            <div className="item-title">
              <div className="text-truncate">
                <h1>
                  {Title} ({Year})
                </h1>
              </div>
            </div>
            <div>
              <div>
                <div className="details-inner">
                  <img
                    src={getMoviePosterUrl(Poster)}
                    alt={Title}
                    className="img"
                  />
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

            <div className="related-container">
              <h2>{RELATED_MOVIES}</h2>
              <RelatedMovies genre={Genre} />
            </div>
          </div>)
      })
      }
    </>
  )

  return (
    <div>
      <DetailHeader />
      {movie ? renderDetail() : <h2>{global.LOADING}</h2>}
    </div>
  )
}

export default Moviedetail