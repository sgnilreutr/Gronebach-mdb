import React from 'react'
import './SearchBar.scss'
import { FiSearch } from 'react-icons/fi'
import { useDispatch } from 'react-redux'

const SearchBar: React.FC = () => {
  const dispatch = useDispatch()

  const onSearch = (value: string) => {
    dispatch({ type: 'SEARCH_TERM_SET', payload: value })
  }

  return (
    <form className="search-bar" id="searchBar">
      <FiSearch style={{ stroke: '#8d8d8d', marginRight: '6px' }} />
      <input
        type="search"
        placeholder="Filter via titel, acteur, genre, type, of jaar"
        className="placeholder-text ph-size"
        id="searchInput"
        onChange={(e) => onSearch(e.target.value)}
      />
    </form>
  )
}

export default SearchBar
