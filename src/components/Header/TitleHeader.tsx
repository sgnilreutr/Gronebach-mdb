import { Link } from 'react-router-dom'
import './TitleHeader.scss'
import { ROUTES } from '../../constants/routeConstants'
import { SwitchDarkMode } from '../Elements/ModeSwitch/SwitchDarkMode'

const GRONEBACH = 'Grönebach'
const MOVIE_DATABASE = 'Movie Database'
const EMOJI = (
  <span role='img' aria-label='popcorn'>
    🍿
  </span>
)
const SMALL_TITLE = 'GMDb '

export function TitleHeader() {
  return (
    <div id='title-container' className='title-container'>
      <div>
        <Link to={ROUTES.homepage} className='link-container'>
          <div className='header-title'>
            <div className='title-1'>{GRONEBACH}</div>
            <div className='title-2'>
              {MOVIE_DATABASE} {EMOJI}
            </div>
          </div>
          <div className='mobile-title'>
            {SMALL_TITLE}
            {EMOJI}
          </div>
        </Link>
      </div>
      <SwitchDarkMode />
    </div>
  )
}
