import React from 'react'
import './Header.scss'
import { useHistory, useLocation } from 'react-router-dom'
import BackToOverview from './BackToOverview'
import Overviewheader from './OverviewHeader'

export default function Header() {
  const history = useHistory()

  function navigateToHome() {
    history.push('/')
  }

  function HeaderOptionSelect() {
    const location = useLocation()

    if (location.pathname !== '/') {
      return <BackToOverview />
    } else {
      return <Overviewheader />
      // return <HeaderOptions selected/>
    }
  }

  return (
    <div className="header-container">
      <div className="header-title" onClick={navigateToHome}>
        <div className="title-1">Grönebach</div>
        <div className="title-2">Movie Database</div>
      </div>
      <HeaderOptionSelect />
    </div>
  )
}
