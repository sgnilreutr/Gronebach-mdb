import React from 'react'
import HeaderOptions from './HeaderOptions'
import './OverviewHeader.scss'
import TitleHeader from './TitleHeader'
import Searchbutton from './SearchButton'

export default function Overviewheader() {
  return (
    <div>
      <TitleHeader />
      <div className="overviewheader-container">
        <HeaderOptions />
        <Searchbutton />
      </div>
    </div>
  )
}
