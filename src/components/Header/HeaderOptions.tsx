import { useContext } from 'react'
import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'
import { classNames } from '../../utils/classNames'

const MENU_OPTIONS = [
  { name: 'Alles', category: '' },
  { name: 'Films', category: 'movie' },
  { name: 'Series', category: 'series' },
] as const

export type CategoryOptions = (typeof MENU_OPTIONS)[number]['category']

export function HeaderOptions() {
  const { activeCategory, setMovieDatabaseContextData } = useContext(MovieDatabaseContext)

  const baseClasses = 'font-normal leading-[1.19] text-left cursor-pointer active:font-semibold'
  const selectedClasses =
    "text-bright-blue-500 md:font-semibold md:after:content-[''] md:after:h-0.5 md::after:top-[-8px] md:after:bg-purple-500 md::after:relative md::after:w-full md:after:inline-block"

  return (
    <div className='flex md:w-48 w-full justify-around gap-4'>
      {MENU_OPTIONS.map(({ name, category }) => (
        <button
          type='button'
          id={name}
          key={name}
          onClick={() => setMovieDatabaseContextData((prevState) => ({ ...prevState, activeCategory: category }))}
          className={classNames(baseClasses, activeCategory === category ? selectedClasses : null)}>
          {name}
        </button>
      ))}
    </div>
  )
}
