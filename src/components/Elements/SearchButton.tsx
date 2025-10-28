import './SearchButton.scss'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routeConstants'

const SEARCH = 'Zoeken'

const preLoadSearch = () => {
  import('../Search/Search')
}

export function Searchbutton() {
  const navigate = useNavigate()
  const openSearch = () => {
    navigate(ROUTES.search)
  }

  return (
    <button
      className='search'
      id='search'
      onClick={openSearch}
      onFocus={preLoadSearch}
      onMouseOver={preLoadSearch}
      type='button'>
      <FiSearch size={24} />
      <p className='search-label'>{SEARCH}</p>
    </button>
  )
}
