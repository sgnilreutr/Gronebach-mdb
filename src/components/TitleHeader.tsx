import React from 'react'
import { useHistory } from 'react-router-dom'
import './TitleHeader.scss'

export default function TitleHeader() {
  const history = useHistory()

  function navigateToHome() {
    history.push('/')
  }

  return (
    <div className="title-container">
      <div className="header-title" onClick={navigateToHome}>
        <div className="title-1">Grönebach</div>
        <div className="title-2">Movie Database</div>
      </div>
    </div>
  )
}
