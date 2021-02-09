import React, { useEffect, useState } from 'react'
import DetailHeader from './DetailHeader'
import './MovieDetail.scss'
import { FiStar } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import {
  createApiClient,
  getMoviePosterUrl,
  MovieDetail,
  Movie,
} from '../data/api'
import { MovieTrailer, OpenTrailerButton } from './MovieTrailer'
import MovieList from './MovieList'

const api = createApiClient()

const Moviedetail: React.FC<MovieDetail> = () => {
  const { movieID } = useParams<{ movieID: string }>()
  const [movie, setMovie] = useState<any>({})
  const [state, setState] = useState('closed')
  const [movieList, setMovieList] = useState<Movie[]>()
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const movieDetail = await api.getMovieDetail(`${ movieID }`)
  //     setMovie(movieDetail || 'No movie loaded.')
  //   }

  //   fetchData()
  // }, [movieID])

  useEffect(() => {
    const fetchData = async () => {
      const movies = await api.getMovies()
      setMovieList(movies || 'No movies loaded.')
    }

    fetchData()
  }, [])

  const triggerOpenTrailerState = () => {
    setState('open')
  }

  const renderDetail = (movie: MovieDetail) => {
    //Show related movies based on active movie.
    // if (movieList !== undefined) {
    //   const filterChildMovies = movieList.filter((movie: any) =>
    //     (movie.Rated === 'PG' && 'G'))
    //   setRelatedMovies(filterChildMovies.slice(0, 10))
    // }

    return (
      <div className="detail-container">
        <div className="item-title">
          <div className="text-truncate">
            <span>
              {movie.Title} ({movie.Year})
            </span>
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
        <div>
          <h2>Gerelateerde films</h2>
          {/* <RelatedMovies /> */}
          <MovieList movies={relatedMovies} />
        </div>
      </div>
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
