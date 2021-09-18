import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import ReactPlayer from 'react-player'
import { MdLocalMovies } from 'react-icons/md'
import './MovieTrailer.scss'
import { createApiClient } from '../../data/api'
import * as global from '../../constants/globalConstants'

const WATCH_TRAILER_BUTTON = 'Bekijk Trailer'

interface TrailerButton {
  openTrailer(): any
}

export const OpenTrailerButton = (props: TrailerButton) => {
  const { openTrailer } = props
  return (
    <div aria-hidden="true" className="trailer-button" onClick={openTrailer}>
      <MdLocalMovies />
      {WATCH_TRAILER_BUTTON}
    </div>
  )
}

export const MovieTrailer = ({ movieID }: { movieID: string }) => {
  const [movieTrailer, setMovieTrailer] = useState<any>({})
  const [loadingState, setLoadingState] = useState<string>('idle')

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState('loading')
      try {
        const response = await createApiClient().getMovieTrailer(`${ movieID }`)
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

  const itemHeight = window.innerWidth <= global.WINDOW_WIDTH_414 ? 193 : 376
  const itemWidth = window.innerWidth <= global.WINDOW_WIDTH_414 ? 343 : 640

  return (
    <div>
      <div className="movie-player">
        {loadingState === 'loaded' && movieTrailer.videoUrl && (
          <ReactPlayer
            url={movieTrailer.videoUrl}
            style={{ borderRadius: '6px' }}
            height={itemHeight}
            width={itemWidth}
          />
        )}
        {loadingState === 'loading' && <p>{global.LOADING}</p>}
        {loadingState === 'error' && <p>{global.COULD_NOT_LOAD}</p>}
      </div>
    </div>
  )
}
