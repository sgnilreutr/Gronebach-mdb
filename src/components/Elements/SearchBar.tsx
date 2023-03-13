/* eslint-disable jsx-a11y/no-autofocus */
import type { FormEvent } from 'react'
import './SearchBar.scss'
import { FiSearch } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'

const selectSearchTerm = (state: any) => state.searchTerm

const SearchBar = () => {
  const dispatch = useDispatch()

  const searchTerm = useSelector(selectSearchTerm)

  const onSearch = (value: string) => {
    dispatch({ type: 'SEARCH_TERM_SET', payload: value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form className="search-bar" id="searchBar" onSubmit={handleSubmit}>
      <FiSearch style={{ stroke: '#8d8d8d', marginRight: '6px' }} />
      <input
        autoFocus
        className="placeholder-text ph-size"
        id="searchInput"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Titels, genres, personen"
        style={{ backgroundColor: '#fff' }}
        type="search"
        value={searchTerm}
      />
    </form>
  )
}

export default SearchBar
