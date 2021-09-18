import React from 'react'
import './MovieListItem.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useHistory } from 'react-router-dom'
import { getMoviePosterUrl, Movie } from '../../data/api'
import * as global from '../../constants/globalConstants'

interface Props {
  movieInfo: Movie
}

const MovieListItem: React.FC<Props> = ({ movieInfo: { imdbID, Poster, Title } }) => {
  const itemHeight = window.innerWidth <= global.WINDOW_WIDTH_414 ? 176.72 : 378
  const itemWidth = window.innerWidth <= global.WINDOW_WIDTH_414 ? 120.32 : 258

  const history = useHistory()
  const openOverviewPage = () => {
    history.push({ pathname: `/item/${imdbID}/` })
  }

  return (
    <div aria-hidden="true" onClick={() => openOverviewPage()}>
      <div className="item">
        <div className="item-img">
          <LazyLoadImage
            src={getMoviePosterUrl(Poster)}
            alt={Title}
            effect="blur"
            height={itemHeight}
            width={itemWidth}
            style={{ borderRadius: `6px` }}
          />
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
