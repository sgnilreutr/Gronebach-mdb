import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import './BackToOverview.scss'
import { useHistory } from 'react-router-dom'

export default function Backtooverview() {
  const history = useHistory()

  function navigateBack() {
    history.push('/')
  }

  return (
    <div className="back-container">
      <div className="back-button" onClick={navigateBack}>
        <FiArrowLeft style={{ stroke: '#8d8d8d' }} />
        <div className="back">
            Terug naar overzicht
        </div>
      </div>
    </div>
  )
}
