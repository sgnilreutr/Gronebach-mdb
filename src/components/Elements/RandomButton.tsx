import { useNavigate } from 'react-router-dom'
import { randomMovie } from '../../utils/randomMovie'
import type { Movie } from '../../data/dataTypes'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

const BUTTON_TEXT = 'Suprise me!'

const preLoadRandomIntro = () => {
  import('../RandomMovieIntro/randomMovieIntro')
}

export function RandomButton({ allMovies }: { allMovies: Array<Movie> }) {
  const navigate = useNavigate()

  const openIntroPage = (imdbID: string) => {
    navigate(`/random/${imdbID}/`)
  }

  const fetchRandomMovie = (allMovies: Movie[]) => {
    const movie = randomMovie(allMovies)
    if (movie) {
      openIntroPage(movie.imdbID)
    } else {
      console.error('Het is niet gelukt om film te laden')
    }
  }

  return (
    <div className='w-full flex items-center justify-center'>
      <button
        className='hover:animate-wiggle border border-bright-blue-500 rounded shadow-md px-3 py-2 bg-bright-blue-400 text-white font-semibold'
        onClick={() => fetchRandomMovie(allMovies)}
        onFocus={preLoadRandomIntro}
        onMouseOver={preLoadRandomIntro}
        type='button'>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-[24px_1fr]'>
          <GiPerspectiveDiceSixFacesRandom size='24' />
          <span className='hidden md:block justify-left'>{BUTTON_TEXT}</span>
        </div>
      </button>
    </div>
  )
}
