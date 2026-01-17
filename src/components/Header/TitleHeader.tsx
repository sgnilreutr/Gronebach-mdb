import { Link } from 'react-router-dom'
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
    <div className='flex justify-between mt-[1.3rem] mx-4 mb-4 md:mt-16 md:mb-4 md:mx-0'>
      <div>
        <Link to={ROUTES.homepage} className='all-unset'>
          <div className='text-3xl w-max flex mb-[0.438rem] cursor-pointer select-none max-md:hidden'>
            <div className='font-semibold'>{GRONEBACH}</div>
            <div className='ml-[6px]'>
              {MOVIE_DATABASE} {EMOJI}
            </div>
          </div>
          <div className='text-3xl mb-[0.438rem] cursor-pointer select-none md:hidden'>
            {SMALL_TITLE}
            {EMOJI}
          </div>
        </Link>
      </div>
      <SwitchDarkMode />
    </div>
  )
}
