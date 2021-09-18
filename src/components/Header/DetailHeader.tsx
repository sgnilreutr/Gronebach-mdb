import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import './DetailHeader.scss'
import { useHistory } from 'react-router-dom'
import TitleHeader from './TitleHeader'
import Searchbutton from '../Elements/SearchButton'
import RandomButton from '../Elements/RandomButton'

const BACK_TO_HOME = 'Terug naar homepage'

export default function Backtooverview() {
  const history = useHistory()

  function navigateBack() {
    history.push('/')
  }

  return (
    <div>
      <TitleHeader />
      <div className="back-container">
        <button className="back-button" onClick={navigateBack} type="button">
          <FiArrowLeft style={{ stroke: '#8d8d8d' }} size={24} />
          <div className="back">
            <span>{BACK_TO_HOME}</span>
          </div>
        </button>
        <RandomButton />
        <Searchbutton />
      </div>
    </div>
  )
}
