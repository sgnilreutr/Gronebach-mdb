import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import MovieDatabaseContext from '../../context/movieDatabaseContext'
import { MovieSearch } from '../../data/api'
import { randomMovie } from '../../utils/randomMovie'
import './RandomButton.scss'

const BUTTON_TEXT = 'Suprise me!'

const preLoadRandomIntro = () => {
  import('../RandomMovieIntro/randomMovieIntro')
}

const RandomButton = () => {
  const allMovieList = useContext(MovieDatabaseContext) as MovieSearch[]

  const history = useHistory()
  const openIntroPage = (imdbID: string) => {
    history.push({ pathname: `/random/${imdbID}/` })
  }

  const fetchRandomMovie = () => {
    const movie = randomMovie(allMovieList)
    if (Object.keys(movie).length > 0) {
      openIntroPage(movie.imdbID)
    } else {
      console.error('Mislukt laden random movie')
    }
  }

  return (
    <div className="randombutton_container">
      <button
        className="random"
        type="button"
        onClick={() => fetchRandomMovie()}
        onMouseOver={preLoadRandomIntro}
        onFocus={preLoadRandomIntro}
      >
        {BUTTON_TEXT}
      </button>
    </div>
  )
}

export default RandomButton
