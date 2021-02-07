import React from 'react'
import './MovieListItem.scss'
import { getMoviePosterUrl, Movie } from '../data/api'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useHistory } from "react-router-dom";

interface Props {
  movieInfo: Movie
}

const MovieListItem: React.FC<Props> = ({ movieInfo }) => {
  const itemHeight = (window.innerWidth <= 414) ? 176.72 : 378
  const itemWidth = (window.innerWidth <= 414) ? 120.32 : 258

  const history = useHistory();
  const openOverviewPage = (imdbID: string) => {
    history.push(`/item/${ imdbID }`)
  }

  return (
    <>
      <div onClick={() => openOverviewPage(movieInfo.imdbID)}>
        <div className="item">
          <div className={'item-img'}>
            <LazyLoadImage
              src={getMoviePosterUrl(movieInfo.Poster)}
              alt={movieInfo.Title}
              effect="blur"
              height={itemHeight}
              width={itemWidth}
              style={{ borderRadius: `6px` }}
            />
          </div>
          <div className="title">
            <div className="text-truncate">
              <span className="no-style">{movieInfo.Title}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieListItem
