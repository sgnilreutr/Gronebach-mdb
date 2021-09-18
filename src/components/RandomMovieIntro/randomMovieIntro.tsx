import React, { useEffect } from 'react'
import './randomMovieIntro.scss'
import { useHistory, useParams } from 'react-router-dom'
import {
  CircleMediumLoader,
  CircleSmallLoader,
  CircleLargeLoader,
  BarsDownLoader,
  BarsUpDownLoader,
  BarsPulseSizeLoader,
  BarsPulseDarkLoader,
  BarsPulseSizeDarkLoader,
} from '../Elements/Loaders'

const MAX_TIME = 1000

const LOADERS = [
  <CircleSmallLoader size={40} />,
  <CircleMediumLoader size={40} />,
  <CircleLargeLoader size={40} />,
  <BarsDownLoader size={40} />,
  <BarsUpDownLoader size={40} />,
  <BarsPulseSizeLoader size={40} />,
  <BarsPulseDarkLoader size={40} />,
  <BarsPulseSizeDarkLoader size={40} />,
]

const LOADERS_TEXT = [
  'Het is...',
  'Deze is goed!',
  'Veel plezier',
  '1..2...3...',
  '<3 Serendipiteit',
]

const randomText = () => {
  const randomNumber = Math.floor(Math.random() * (LOADERS_TEXT.length - 1)) + 1
  return LOADERS_TEXT[randomNumber]
}
const randomLoader = () => {
  const randomNumber = Math.floor(Math.random() * (LOADERS.length - 1)) + 1
  return LOADERS[randomNumber]
}

// Make the page show different loaders on different locations on the page
// One loader is center and big
// The different loaders are all different in size and color (strenght) - they are never brighter or bigger than the main one
// The different loaders come in at different times

const RandomMovieIntro = () => {
  const { movieID } = useParams<{ movieID: string }>()
  const history = useHistory()

  useEffect(() => {
    const openOverviewPage = () => {
      history.push({ pathname: `/item/${movieID}/` })
    }
    setTimeout(() => {
      openOverviewPage()
    }, MAX_TIME)
  }, [])

  return (
    <div className="wrapper">
      <div className="loader_container">
        <h1>{randomText()}</h1>
        {randomLoader()}
      </div>
    </div>
  )
}

export default RandomMovieIntro
