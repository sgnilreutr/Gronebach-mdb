import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './HeaderOptions.scss'

const selectCategory = (state: any) => state.category

export default function Headeroptions() {
  const category = useSelector(selectCategory)
  const dispatch = useDispatch()

  const setCategory = async (value: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: value })
  }

  return (
    <div className="headerOptions-container">
      <div
        id={'All'}
        onClick={() => setCategory('')}
        className={`option ${category === '' && 'option--selected'}`}
      >
        Alles
      </div>
      <div
        id={'Movies'}
        onClick={() => setCategory('Movie')}
        className={`option ${category === 'Movie' && 'option--selected'}`}
      >
        Films
      </div>
      <div
        id={'Series'}
        onClick={() => setCategory('Series')}
        className={`option ${category === 'Series' && 'option--selected'}`}
      >
        Series
      </div>
    </div>
  )
}
