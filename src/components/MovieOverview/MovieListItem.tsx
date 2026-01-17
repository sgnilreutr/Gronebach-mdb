import { useEffect, useMemo, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Link } from 'react-router-dom'
import imageFallback from '../../img/placeholder-image.png'

import { getMoviePosterUrl } from '../../data/api'
import type { Movie } from '../../data/dataTypes'
import { useBreakpoint } from '../../hooks/useBreakPoint'
import { classNames } from '../../utils/classNames'

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
    <Link to={`/item/${imdbID}/`} className='all-unset'>
      <div className='rounded-[5px] backdrop-blur-[28px] cursor-pointer h-[176.72px] w-[120.32px] m-0 md:w-64 md:h-[23.5rem] md:mb-4 md:transition-[transform_0.3s_ease-in-out,box-shadow_0.2s_ease-in-out] md:hover:scale-[1.04] md:hover:shadow-[5px_10px_30px_0_rgba(108,111,136,0.57)] md:hover:mb-[0.938rem]'>
        <div
          className={classNames(
            imageSrc === undefined || urlRegex.test(imageSrc)
              ? undefined
              : 'h-[176.72px] w-[120.32px] md:h-[376px] md:w-64 rounded-[6px] dark:invert'
          )}>
          {userHasInternetConnection ? (
            <LazyLoadImage
              alt={Title}
              className='rounded'
              height={itemHeight}
              placeholderSrc={imageFallback}
              src={imageSrc}
              width={itemWidth}
            />
          ) : (
            <span>{Title}</span>
          )}
        </div>
        <div className='hidden md:block w-[15.188rem] h-4 mt-[0.938rem] mx-[0.438rem_0.375rem_0] font-[Helvetica] text-base font-normal leading-[1.19] text-[#707070] text-center'>
          <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
            <span>{Title}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
