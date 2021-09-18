import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { MdLocalMovies } from 'react-icons/md'
import './MovieTrailer.scss'
import { createApiClient } from '../../data/api'
import * as global from '../../constants/globalConstants'

const WATCH_TRAILER_BUTTON = 'Bekijk Trailer'

export const OpenTrailerButton = (props: any) => {
  const { openTrailer } = props
  return (
    <div aria-hidden="true" className="trailer-button" onClick={openTrailer}>
      <MdLocalMovies />
      {WATCH_TRAILER_BUTTON}
    </div>)
}

const api = createApiClient()

export const MovieTrailer = ({ movieID }: { movieID: any }) => {
  const [movieTrailer, setMovieTrailer] = useState<any>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getMovieTrailer(`${ movieID }`)
        setMovieTrailer(response)
      }
      catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [movieID])

  const itemHeight = window.innerWidth <= global.WINDOW_WIDTH_414 ? 193 : 376
  const itemWidth = window.innerWidth <= global.WINDOW_WIDTH_414 ? 343 : 640

  return (
    <div>
      <div className="movie-player">
        <ReactPlayer
          url={movieTrailer.videoUrl}
          style={{ borderRadius: '6px' }}
          height={itemHeight}
          width={itemWidth}
        />
      </div>
    </div>
  )
}
