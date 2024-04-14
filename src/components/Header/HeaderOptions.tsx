import { useContext } from 'react'
import './HeaderOptions.scss'
import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'

const MENU_OPTIONS = [
  { name: 'Alles', category: '' },
  { name: 'Movies', category: 'Movie' },
  { name: 'Series', category: 'Series' },
] as const

export type CategoryOptions = (typeof MENU_OPTIONS)[number]['category']

export function HeaderOptions() {
  const { activeCategory, setActiveCategory } = useContext(MovieDatabaseContext)

  return (
    <div className="headerOptions-container">
      {MENU_OPTIONS.map(({ name, category }) => (
        <div
          aria-hidden="true"
          id={name}
          key={name}
          onClick={() => setActiveCategory(category)}
          className={`option ${
            activeCategory === category && 'option--selected'
          }`}
        >
          {name}
        </div>
      ))}
    </div>
  )
}
