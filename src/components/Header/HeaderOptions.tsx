import { selectCategory, setCategory } from '../../store/appSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import './HeaderOptions.scss'

const MENU_OPTIONS = [
  { name: 'Alles', category: '' },
  { name: 'Movies', category: 'Movie' },
  { name: 'Series', category: 'Series' },
]

export function HeaderOptions() {
  const selectedCategory = useAppSelector(selectCategory)
  const dispatch = useAppDispatch()

  const handleOnClick = (value: string) => {
    dispatch(setCategory(value))
  }

  return (
    <div className="headerOptions-container">
      {MENU_OPTIONS.map(({ name, category }) => (
        <div
          aria-hidden="true"
          id={name}
          key={name}
          onClick={() => handleOnClick(category)}
          className={`option ${
            selectedCategory === category && 'option--selected'
          }`}
        >
          {name}
        </div>
      ))}
    </div>
  )
}
