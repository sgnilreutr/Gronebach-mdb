import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './HeaderOptions.scss'

const MENU_OPTIONS = [
  { name: 'Alles', category: '' },
  { name: 'Movies', category: 'Movie' },
  { name: 'Series', category: 'Series' },
]

const selectCategory = (state: any) => state.category

export default function Headeroptions() {
  const category = useSelector(selectCategory)
  const dispatch = useDispatch()

  const setCategory = async (value: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: value })
  }

  return (
    <div className="headerOptions-container">
      {MENU_OPTIONS.map((item) => (
        <div
          aria-hidden="true"
          id={item.name}
          key={item.name}
          onClick={() => setCategory(item.category)}
          className={`option ${category === item.category && 'option--selected'}`}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}
