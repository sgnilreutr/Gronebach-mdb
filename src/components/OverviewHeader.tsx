import React from 'react'
import SearchBar from './SearchBar'
import HeaderOptions from './HeaderOptions'
import './OverviewHeader.scss'

export default function Overviewheader() {
    return (
        <div className="overviewheader-container">
            <div className="ml-auto">
            <SearchBar />
            </div>
            <HeaderOptions />
        </div>
    )
}
