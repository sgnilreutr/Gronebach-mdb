import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import MovieDatabaseContext from '../../context/movieDatabaseContext'
import { randomMovie } from '../../utils/randomMovie'
import './RandomButton.scss'

const BUTTON_TEXT = 'Suprise me!'

const preLoadRandomIntro = () => {
  import('../RandomMovieIntro/randomMovieIntro')
}

const RandomButton = () => {
  const { movies } = useContext(MovieDatabaseContext)

  const navigate = useNavigate()
  const openIntroPage = (imdbID: string) => {
    navigate(`/random/${imdbID}/`)
  }

  const fetchRandomMovie = () => {
    const movie = randomMovie(movies)
    if (movie) {
      openIntroPage(movie.imdbID)
    } else {
      console.error('Het is niet gelukt om film te laden')
    }
  }

  return (
    <div className="randombutton_container">
      <button
        className="random"
        onClick={() => fetchRandomMovie()}
        onFocus={preLoadRandomIntro}
        onMouseOver={preLoadRandomIntro}
        type="button"
      >
        {BUTTON_TEXT}
      </button>
    </div>
  )
}

export default RandomButton
