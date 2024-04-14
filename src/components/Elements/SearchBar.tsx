/* eslint-disable jsx-a11y/no-autofocus */
import { useContext, type FormEvent } from 'react'
import './SearchBar.scss'
import { FiSearch } from 'react-icons/fi'
import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'

export function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(MovieDatabaseContext)

  const onSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form className="search-bar" id="search-bar" onSubmit={handleSubmit}>
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
