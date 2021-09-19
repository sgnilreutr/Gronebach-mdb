import React from 'react'
import HeaderOptions from './HeaderOptions'
import './OverviewHeader.scss'
import TitleHeader from './TitleHeader'
import Searchbutton from '../Elements/SearchButton'
import RandomButton from '../Elements/RandomButton'

export default function Overviewheader() {
  return (
    <div>
      <TitleHeader />
      <div className="overviewheader-container">
        <div className="hide_on_mobile">
          <HeaderOptions />
        </div>
        <div className="placeholder" />
        <RandomButton />
        <Searchbutton />
      </div>
    </div>
  )
}
