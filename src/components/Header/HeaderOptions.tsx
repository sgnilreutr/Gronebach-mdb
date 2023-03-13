import { useDispatch, useSelector } from 'react-redux'
import './HeaderOptions.scss'

const MENU_OPTIONS = [
  { name: 'Alles', category: '' },
  { name: 'Movies', category: 'Movie' },
  { name: 'Series', category: 'Series' },
]

const selectCategory = (state: any) => state.category

export default function Headeroptions() {
  const selectedCategory = useSelector(selectCategory)
  const dispatch = useDispatch()

  const setCategory = async (value: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: value })
  }

  return (
    <div className="headerOptions-container">
      {MENU_OPTIONS.map(({ name, category }) => (
        <div
          aria-hidden="true"
          id={name}
          key={name}
          onClick={() => setCategory(category)}
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
