import { useEffect, useMemo, useState } from 'react'
import './MovieListItem.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useMediaQuery } from 'react-responsive'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useNavigate } from 'react-router-dom'
import imageFallback from '../../img/placeholder-image.png'

import * as global from '../../constants/globalConstants'
import { getMoviePosterUrl } from '../../data/api'
import type { IMovie } from '../../data/dataTypes'

interface IMovieListItem {
  movieInfo: Pick<IMovie, 'Title' | 'imdbID' | 'Poster'>
}

const urlRegex: RegExp = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/

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
  const imageSrc = useMemo(() => getMoviePosterUrl(Poster), [Poster])

  return (
    <div aria-hidden="true" onClick={() => openOverviewPage()}>
      <div className="item">
        <div
          className={`${
            urlRegex.test(imageSrc) ? undefined : 'image_placeholder'
          } item-img`}
        >
          {userHasInternetConnection ? (
            <LazyLoadImage
              alt={Title}
              className="image"
              effect="blur"
              height={itemHeight}
              placeholderSrc={imageFallback}
              src={imageSrc}
              width={itemWidth}
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
