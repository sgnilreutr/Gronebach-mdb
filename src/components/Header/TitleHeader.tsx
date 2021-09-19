import React from 'react'
import { useHistory } from 'react-router-dom'
import './TitleHeader.scss'
import ModeSwitch from '../Elements/ModeSwitch/modeSwitch'

const GRONEBACH = 'Grönebach'
const MOVIE_DATABASE = 'Movie Database'
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
              <span role="img" aria-label="popcorn">
                🍿
              </span>
            </div>
          </div>
        </div>
        <a
          id="personal_link"
          className="personal_link"
          // style={{ color: '#232323', fontSize: '0.7rem', opacity: '0.7', textDecoration: 'none' }}
          href="https://github.com/sgnilreutr"
        >
          {ROBBERT_TUERLINGS}
        </a>
      </div>
      <ModeSwitch />
    </div>
  )
}
