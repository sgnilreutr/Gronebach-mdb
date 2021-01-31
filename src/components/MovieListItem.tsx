import React from 'react'
import './MovieListItem.scss'
import { Link } from 'react-router-dom'
import { getMoviePosterUrl, Movie } from '../data/api'

interface Props {
  movieInfo: Movie
}

const MovieListItem: React.FC<Props> = ({ movieInfo }) => {
  return (
    <>
      <Link style={{ textDecoration: `none` }} to={`item/${movieInfo.imdbID}`}>
        <div className="item">
          <img
            className={'item-img'}
            src={getMoviePosterUrl(movieInfo.Poster)}
            alt={movieInfo.Title}
          ></img>
          <div className="title">
            <div className="text-truncate">
              <span className="no-style">{movieInfo.Title}</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default MovieListItem
