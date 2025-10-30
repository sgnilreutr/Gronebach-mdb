import { useEffect, useMemo, useState } from 'react'
import './MovieListItem.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Link } from 'react-router-dom'
import imageFallback from '../../img/placeholder-image.png'

import { getMoviePosterUrl } from '../../data/api'
import type { Movie } from '../../data/dataTypes'
import { useBreakpoint } from '../../hooks/useBreakPoint'

interface MovieListItemProps {
  movieInfo: Pick<Movie, 'Title' | 'imdbID' | 'Poster'>
}

const urlRegex: RegExp = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/

export function MovieListItem({ movieInfo: { imdbID, Poster, Title } }: MovieListItemProps) {
  const isTabletOrMobile = useBreakpoint('md')
  const [itemHeight, setItemHeight] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)

  useEffect(() => {
    setItemHeight(isTabletOrMobile ? 176.72 : 378)
    setItemWidth(isTabletOrMobile ? 120.32 : 258)
  }, [isTabletOrMobile])

  const userHasInternetConnection = window.navigator.onLine
  const imageSrc = useMemo(() => getMoviePosterUrl(Poster), [Poster])

  return (
    <Link to={`/item/${imdbID}/`} className='item-link'>
      <div className='item'>
        <div className={`${urlRegex.test(imageSrc) ? undefined : 'image_placeholder'} item-img`}>
          {userHasInternetConnection ? (
            <LazyLoadImage
              alt={Title}
              className='rounded'
              effect='blur'
              height={itemHeight}
              placeholderSrc={imageFallback}
              src={imageSrc}
              width={itemWidth}
            />
          ) : (
            <span>{Title}</span>
          )}
        </div>
        <div className='title'>
          <div className='text-truncate'>
            <span className='no-style'>{Title}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
