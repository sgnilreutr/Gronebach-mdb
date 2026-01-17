/* eslint-disable jsx-a11y/no-autofocus */
import { useContext, type FormEvent } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'

export function SearchBar() {
  const { searchTerm, setMovieDatabaseContextData } = useContext(MovieDatabaseContext)

  const onSearch = (value: string) => {
    setMovieDatabaseContextData((prevState) => ({ ...prevState, searchTerm: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form
      className='flex items-center dark:bg-neutral-800 bg-white rounded-md px-3 py-2 w-full'
      onSubmit={handleSubmit}>
      <FiSearch style={{ stroke: '#8d8d8d', marginRight: '6px' }} />
      <input
        // biome-ignore lint/a11y/noAutofocus: we want this
        autoFocus
        className='w-full'
        onChange={(e) => onSearch(e.target.value)}
        placeholder='Titels, genres, personen'
        type='search'
        value={searchTerm}
      />
    </form>
  )
}
