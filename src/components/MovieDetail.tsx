import React, { useEffect, useState } from 'react'
import Header from './Header'
import './MovieDetail.scss'
import { FiStar } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { createApiClient, MovieDetail } from '../data/api'

const api = createApiClient()

const Moviedetail: React.FC<MovieDetail> = () => {
  const { movieID } = useParams<{ movieID: string }>()
  const [movie, setMovie] = useState<any>({})

  useEffect(() => {
    const fetchData = async () => {
      const movieDetail = await api.getMovieDetail(`${movieID}`)
      setMovie(movieDetail || 'No movie loaded.')
    }

    fetchData()
  }, [movieID])

  const renderDetail = (movie: MovieDetail) => {
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
          <div className="details">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="img"
            ></img>
            <div className="text-details">
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
    )
  }

  return (
    <div>
      <Header />
      {movie ? renderDetail(movie) : <h2>Loading...</h2>}
    </div>
  )
}

export default Moviedetail
