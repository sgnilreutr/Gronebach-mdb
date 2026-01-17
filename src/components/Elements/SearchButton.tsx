import { FiSearch } from 'react-icons/fi'
import { ROUTES } from '../../constants/routeConstants'
import { Link } from 'react-router-dom'

const SEARCH = 'Zoeken'

const preLoadSearch = () => {
  import('../Search/Search')
}

export function Searchbutton() {
  return (
    <Link
      to={{ pathname: ROUTES.search }}
      onFocus={preLoadSearch}
      onMouseOver={preLoadSearch}
      className='cursor-pointer'>
      <button className='flex flex-row gap-2' type='button'>
        <FiSearch size={24} />
        <p className='hidden md:block'>{SEARCH}</p>
      </button>
    </Link>
  )
}
