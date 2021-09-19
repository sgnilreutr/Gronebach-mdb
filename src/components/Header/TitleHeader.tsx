import React from 'react'
import { useHistory } from 'react-router-dom'
import './TitleHeader.scss'
import ModeSwitch from '../Elements/ModeSwitch/modeSwitch'

const GRONEBACH = 'Grönebach'
const MOVIE_DATABASE = 'Movie Database'
const EMOJI = <span role="img" aria-label="popcorn">🍿</span>
const SMALL_TITLE = 'GMDb '
const ROBBERT_TUERLINGS = 'BY ROBBERT TUERLINGS'

export default function TitleHeader() {
  const history = useHistory()

  function navigateToHome() {
    history.push('/')
  }

  return (
    <div id="title-container" className="title-container">
      <div>
        <div onClick={navigateToHome} aria-hidden="true">
          <div className="header-title">
            <div className="title-1">{GRONEBACH}</div>
            <div className="title-2">
              {MOVIE_DATABASE}{' '}
              {EMOJI}
            </div>
          </div>
          <div className="mobile-title">{SMALL_TITLE}{EMOJI}</div>
        </div>
        <a
          id="personal_link"
          className="personal_link"
          href="https://github.com/sgnilreutr"
        >
          {ROBBERT_TUERLINGS}
        </a>
      </div>
      <ModeSwitch />
    </div>
  )
}
