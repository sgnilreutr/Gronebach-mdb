import React from 'react'
import SearchBar from './SearchBar'
import HeaderOptions from './HeaderOptions'
import './OverviewHeader.scss'
import TitleHeader from './TitleHeader'

export default function Overviewheader() {

    return (
        <div>
            <TitleHeader />
            <div className="overviewheader-container">
                <div className="ml-auto">
                    <SearchBar />
                </div>
                <HeaderOptions />
            </div>
        </div>
    )
}
