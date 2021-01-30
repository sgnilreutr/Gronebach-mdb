import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './HeaderOptions.scss'

// Set Alles option as default selected
const selectCategory = (state: any) => state.category

export default function Headeroptions() {
  // const [selectedButton, setSelectedButton] = useState<string>('All')
  const category = useSelector(selectCategory)
  const dispatch = useDispatch()

  const setCategory = async (value: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: value })
  }

  return (
    <div className="headerOptions-container">
      {/* <div className={`option ${selected && "option--selected"}`} onClick={() => setSelected(!selected)}>Alles</div> */}
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
        className={`option ${
          category === 'Movie' && 'option--selected'
        }`}
      >
        Films
      </div>
      <div
        id={'Series'}
        onClick={() => setCategory('Series')}
        className={`option ${
          category === 'Series' && 'option--selected'
        }`}
      >
        Series
      </div>
    </div>
  )
}
