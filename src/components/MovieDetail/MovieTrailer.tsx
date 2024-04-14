import './MovieTrailer.scss'

import { ReactNode, useEffect, useState } from 'react'
import { MdLocalMovies } from 'react-icons/md'
import ReactPlayer from 'react-player'
import { useMediaQuery } from 'react-responsive'

import { createApiClient } from '../../data/api'
import type { MovieTrailer } from '../../data/dataTypes'
import { isEmpty } from '../../utils/isEmpty'
import {
  TABLET_MAX_WIDTH,
  LOADING,
  COULD_NOT_LOAD,
  GenericLoadingState,
  GENERIC_LOADING_STATES,
} from '../../constants/globalConstants'

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

function SkeletonMovieTrailer({ children }: { children: ReactNode }) {
  return (
    <div className="movie-player">
      <div className="skeleton" id="skeleton">
        {children}
      </div>
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
  const [loadingState, setLoadingState] = useState<GenericLoadingState>(
    GENERIC_LOADING_STATES.idle
  )
  const isTabletOrMobile = useMediaQuery({ maxWidth: TABLET_MAX_WIDTH })
  const [itemHeight, setItemHeight] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState(GENERIC_LOADING_STATES.loading)
      try {
        const response = await createApiClient().getMovieTrailer(`${movieID}`)
        if (isEmpty(response)) {
          setLoadingState(GENERIC_LOADING_STATES.error)
          return
        }
        setMovieTrailer(response)
        setLoadingState(GENERIC_LOADING_STATES.loaded)
      } catch (err) {
        setLoadingState(GENERIC_LOADING_STATES.error)
      }
    }
    if (movieID) {
      fetchData()
    }
  }, [movieID])

  useEffect(() => {
    setItemHeight(isTabletOrMobile ? 193 : 376)
    setItemWidth(isTabletOrMobile ? 343 : 640)
  }, [isTabletOrMobile])

  const renderContent = () => {
    switch (loadingState) {
      case GENERIC_LOADING_STATES.loaded:
        return (
          <ReactPlayer
            url={movieTrailer?.videoUrl}
            style={{ borderRadius: '6px' }}
            height={itemHeight}
            width={itemWidth}
          />
        )
      case GENERIC_LOADING_STATES.loading:
        return (
          <SkeletonMovieTrailer>
            <p>{LOADING}</p>
          </SkeletonMovieTrailer>
        )
      case GENERIC_LOADING_STATES.idle:
        return (
          <SkeletonMovieTrailer>
            <p>{LOADING}</p>
          </SkeletonMovieTrailer>
        )
      case GENERIC_LOADING_STATES.error:
        return (
          <SkeletonMovieTrailer>
            <p>{COULD_NOT_LOAD}</p>
          </SkeletonMovieTrailer>
        )
      default:
        return (
          <SkeletonMovieTrailer>
            <p>{LOADING}</p>
          </SkeletonMovieTrailer>
        )
    }
  }

  return (
    <div>
      <div className="movie-player">{renderContent()}</div>
    </div>
  )
}
