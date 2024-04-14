import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'
import { randomMovie } from '../../utils/randomMovie'
import './RandomButton.scss'

const BUTTON_TEXT = 'Suprise me!'

const preLoadRandomIntro = () => {
  import('../RandomMovieIntro/randomMovieIntro')
}

export function RandomButton() {
  const { allMovies } = useContext(MovieDatabaseContext)
  const navigate = useNavigate()

  const openIntroPage = (imdbID: string) => {
    navigate(`/random/${imdbID}/`)
  }

  const fetchRandomMovie = () => {
    const movie = randomMovie(allMovies)
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
