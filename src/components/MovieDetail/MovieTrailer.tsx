import './MovieTrailer.scss'

import { useEffect, useState } from 'react'
import { MdLocalMovies } from 'react-icons/md'
import ReactPlayer from 'react-player'
import { useMediaQuery } from 'react-responsive'

import * as global from '../../constants/globalConstants'
import { createApiClient } from '../../data/api'
import type { MovieTrailer } from '../../data/dataTypes'
import { isEmpty } from '../../utils/isEmpty'

const WATCH_TRAILER_BUTTON = 'Bekijk Trailer'

interface OpenTrailerButtonProps {
  openTrailer: () => void
}

export function OpenTrailerButton({ openTrailer }: OpenTrailerButtonProps) {
  return (
    <div aria-hidden="true" className="trailer-button" onClick={openTrailer}>
      <MdLocalMovies />
      {WATCH_TRAILER_BUTTON}
    </div>
  )
}

interface MovieTrailerProps {
  movieID: string
}

export function MovieTrailerComponent({ movieID }: MovieTrailerProps) {
  const [movieTrailer, setMovieTrailer] = useState<MovieTrailer | undefined>(
    undefined
  )
  const [loadingState, setLoadingState] = useState<string>('idle')
  const isTabletOrMobile = useMediaQuery({ maxWidth: global.TABLET_MAX_WIDTH })
  const [itemHeight, setItemHeight] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState('loading')
      try {
        const response = await createApiClient().getMovieTrailer(`${movieID}`)
        if (!isEmpty(response)) {
          setMovieTrailer(response)
          setLoadingState('loaded')
        } else {
          setLoadingState('error')
        }
      } catch (err) {
        console.error(err)
        setLoadingState('error')
      }
    }
    if (movieID && loadingState === 'idle') {
      fetchData()
    }
  }, [movieID])

  useEffect(() => {
    setItemHeight(isTabletOrMobile ? 193 : 376)
    setItemWidth(isTabletOrMobile ? 343 : 640)
  }, [isTabletOrMobile])

  return (
    <div>
      <div className="movie-player">
        {loadingState === 'loaded' && movieTrailer?.videoUrl && (
          <ReactPlayer
            url={movieTrailer.videoUrl}
            style={{ borderRadius: '6px' }}
            height={itemHeight}
            width={itemWidth}
          />
        )}
        {loadingState === 'loading' && <p>{global.LOADING}</p>}
        {loadingState === 'idle' && <p>{global.LOADING}</p>}
        {loadingState === 'error' && <p>{global.COULD_NOT_LOAD}</p>}
      </div>
    </div>
  )
}
