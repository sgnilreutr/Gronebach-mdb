import React from 'react'
import SearchBar from './SearchBar'
import HeaderOptions from './HeaderOptions'
import './OverviewHeader.scss'
import { useHistory } from 'react-router-dom'
import TitleHeader from './TitleHeader'

export default function Overviewheader() {
    const history = useHistory()

    function navigateToHome() {
        history.push('/')
    }

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
