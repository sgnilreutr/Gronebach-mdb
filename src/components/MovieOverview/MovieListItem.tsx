import { useEffect, useState } from 'react'
import './MovieListItem.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useMediaQuery } from 'react-responsive'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useNavigate } from 'react-router-dom'

import * as global from '../../constants/globalConstants'
import { getMoviePosterUrl } from '../../data/api'
import type { IMovie } from '../../data/dataTypes'

interface IMovieListItem {
  movieInfo: Pick<IMovie, 'Title' | 'imdbID' | 'Poster'>
}

const MovieListItem = ({
  movieInfo: { imdbID, Poster, Title },
}: IMovieListItem) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: global.TABLET_MAX_WIDTH })
  const [itemHeight, setItemHeight] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)

  useEffect(() => {
    setItemHeight(isTabletOrMobile ? 176.72 : 378)
    setItemWidth(isTabletOrMobile ? 120.32 : 258)
  }, [isTabletOrMobile])

  const navigate = useNavigate()
  const openOverviewPage = () => {
    navigate(`/item/${imdbID}/`)
  }

  const userHasInternetConnection = window.navigator.onLine

  return (
    <div aria-hidden="true" onClick={() => openOverviewPage()}>
      <div className="item">
        <div className="item-img">
          {userHasInternetConnection ? (
            <LazyLoadImage
              src={getMoviePosterUrl(Poster)}
              alt={Title}
              effect="blur"
              height={itemHeight}
              width={itemWidth}
              style={{ borderRadius: `6px` }}
            />
          ) : (
            <span>{Title}</span>
          )}
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
