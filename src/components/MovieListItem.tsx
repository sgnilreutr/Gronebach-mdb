import React from 'react'
import './MovieListItem.scss'
import { Link } from 'react-router-dom'
import { getMoviePosterUrl, Movie } from '../data/api'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Props {
  movieInfo: Movie
}

const MovieListItem: React.FC<Props> = ({ movieInfo }) => {
  const ITEM_HEIGHT = (window.innerWidth <= 414) ? 176.72 : 378
  const ITEM_WIDTH = (window.innerWidth <= 414) ? 120.32 : 258

  return (
    <>
      <Link style={{ textDecoration: `none` }} to={`item/${movieInfo.imdbID}`}>
        <div className="item">
          <div className={'item-img'}>
            <LazyLoadImage
              src={getMoviePosterUrl(movieInfo.Poster)}
              alt={movieInfo.Title}
              effect="blur"
              height={ITEM_HEIGHT}
              width={ITEM_WIDTH}
            />
          </div>
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
