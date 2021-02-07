import React from 'react'
import SearchBar from './SearchBar'
import HeaderOptions from './HeaderOptions'
import './OverviewHeader.scss'
import TitleHeader from './TitleHeader'
// import { FiSearch } from 'react-icons/fi'
// import { useHistory } from 'react-router-dom'
import Searchbutton from './SearchButton'

export default function Overviewheader() {

    return (
        <div>
            <TitleHeader />
            <div className="overviewheader-container">
                <Searchbutton />
                <HeaderOptions />
            </div>
        </div>
    )
}
