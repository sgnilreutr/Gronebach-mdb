import React from 'react'
import './MovieListItem.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useNavigate } from 'react-router-dom'
import { getMoviePosterUrl, IMovie } from '../../data/api'
import * as global from '../../constants/globalConstants'

interface Props {
  movieInfo: IMovie
}

const MovieListItem: React.FC<Props> = ({ movieInfo: { imdbID, Poster, Title } }) => {
  const itemHeight = window.innerWidth <= global.WINDOW_WIDTH_414 ? 176.72 : 378
  const itemWidth = window.innerWidth <= global.WINDOW_WIDTH_414 ? 120.32 : 258

  const navigate = useNavigate()
  const openOverviewPage = () => {
    navigate(`/item/${ imdbID }/`)
  }

  return (
    <div aria-hidden="true" onClick={() => openOverviewPage()}>
      <div className="item">
        <div className="item-img">
          {window.navigator.onLine ?
            <LazyLoadImage
              src={getMoviePosterUrl(Poster)}
              alt={Title}
              effect="blur"
              height={itemHeight}
              width={itemWidth}
              style={{ borderRadius: `6px` }}
            /> : <span>{Title}</span>}
        </div>
        <div className="title">
          <div className="text-truncate">
            <span className="no-style">{Title}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieListItem
