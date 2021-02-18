import React from 'react'
import './SearchBar.scss'
import { FiSearch } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'

const selectSearchTerm = (state: any) => state.searchTerm

const SearchBar: React.FC = () => {
  const dispatch = useDispatch()

  const searchTerm = useSelector(selectSearchTerm)

  const onSearch = (value: string) => {
    dispatch({ type: 'SEARCH_TERM_SET', payload: value })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
  }

  return (
    <form className="search-bar" id="searchBar" onSubmit={handleSubmit}>
      <FiSearch style={{ stroke: '#8d8d8d', marginRight: '6px' }} />
      <input
        type="search"
        value={searchTerm}
        placeholder="Titels, genres, personen"
        className="placeholder-text ph-size"
        id="searchInput"
        onChange={(e) => onSearch(e.target.value)}
        autoFocus
        style={{ backgroundColor: '#fff' }}
      />
    </form>
  )
}

export default SearchBar
