import React from 'react'
import './DetailHeader.scss'
import TitleHeader from './TitleHeader'
import Searchbutton from '../Elements/SearchButton'
import RandomButton from '../Elements/RandomButton'
import BackButton from '../Elements/BackButton'

export default function Backtooverview() {
  return (
    <div>
      <TitleHeader />
      <div className="buttons-container">
        <BackButton />
        <RandomButton />
        <Searchbutton />
      </div>
    </div>
  )
}
