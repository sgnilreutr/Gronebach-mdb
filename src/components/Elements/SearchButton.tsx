import './SearchButton.scss'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const SEARCH = 'Zoeken'

const preLoadSearch = () => {
  import('../Search/Search')
}

export default function Searchbutton() {
  const navigate = useNavigate()
  const openSearch = () => {
    navigate(`/search`)
  }

  return (
    <button
      className="search"
      onClick={openSearch}
      type="button"
      onMouseOver={preLoadSearch}
      onFocus={preLoadSearch}
      id="search"
    >
      <FiSearch size={24} />
      <p className="search-label">{SEARCH}</p>
    </button>
  )
}
