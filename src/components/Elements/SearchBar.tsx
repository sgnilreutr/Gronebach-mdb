/* eslint-disable jsx-a11y/no-autofocus */
import type { FormEvent } from 'react'
import './SearchBar.scss'
import { FiSearch } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectSearchTerm, setSearchTerm } from '../../store/appSlice'

export function SearchBar() {
  const dispatch = useAppDispatch()

  const searchTerm = useAppSelector(selectSearchTerm)

  const onSearch = (value: string) => {
    dispatch(setSearchTerm(value))
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
