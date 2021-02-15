import React, { useEffect, useState } from 'react'
import DetailHeader from './DetailHeader'
import './MovieDetail.scss'
import { FiStar } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import {
  getMoviePosterUrl,
  MovieDetail
} from '../data/api'
import { MovieTrailer, OpenTrailerButton } from './MovieTrailer'
import RelatedMovies from './RelatedMovies'
import { useSelector } from 'react-redux'

const selectBaseLoaded = (state: any) => state.baseLoaded

const Moviedetail: React.FC<MovieDetail> = () => {
  const { movieID } = useParams<{ movieID: string }>()
  const [movie, setMovie] = useState<any>()
  const [state, setState] = useState('closed')

  const baseLoaded = useSelector(selectBaseLoaded)

  useEffect(() => {
    const json = localStorage.getItem("movies");
    if (json) {
      const allMovies = JSON.parse(json);
      if (allMovies) {
        setMovie(allMovies.filter((movie: any) =>
          movie.imdbID.toLowerCase().includes(`${ movieID }`)
        ))
      }
    } else {
      console.log('No movies loaded')
    }
  }, [movieID, baseLoaded]);

  const triggerOpenTrailerState = () => {
    setState('open')
  }

  console.log(movie)
  const renderDetail = (movie: MovieDetail[]) => {

    return (
      <>
        {movie.map((movie: any) =>
          <div className="detail-container" key={movie.imdbID}>
            <div className="item-title">
              <div className="text-truncate">
                <h1>
                  {movie.Title} ({movie.Year})
              </h1>
              </div>
            </div>
            <div>
              <div>
                <div className="details-inner">
                  <img
                    src={getMoviePosterUrl(movie.Poster)}
                    alt={movie.Title}
                    className="img"
                  />
                  <div className="text-details">
                    {state === 'closed' && (
                      <OpenTrailerButton openTrailer={triggerOpenTrailerState} />
                    )}
                    {state === 'open' && <MovieTrailer movieID={movie.imdbID} />}
                    <div className="description">{movie.Plot}</div>
                    <div className="actors">
                      <span className="detail-header">Acteurs</span>
                      <span>{movie.Actors}</span>
                    </div>
                    <div className="director">
                      <span className="detail-header">Regisseur</span>
                      <span>{movie.Director}</span>
                    </div>
                    <div className="genre">
                      <span className="detail-header">Genre</span>
                      <span>{movie.Genre}</span>
                    </div>
                    <div className="rating">
                      <FiStar />
                      <span style={{ marginLeft: `8px` }}>
                        <b>{movie.imdbRating}</b> / 10
                    </span>
                    </div>
                    <div className="runtime">
                      <span className="detail-header">Runtime</span>
                      <span>{movie.Runtime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="related-container">
              <h2>Gerelateerde films</h2>
              <RelatedMovies genre={movie.Genre} />
            </div>
          </div>
        )
        }
      </>
    )
  }

  return (
    <div>
      <DetailHeader />
      {movie ? renderDetail(movie) : <h2>Loading...</h2>}
    </div>
  )
}

export default Moviedetail
