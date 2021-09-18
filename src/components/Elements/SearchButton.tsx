import React from 'react'
import './SearchButton.scss'
import { FiSearch } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

const SEARCH = 'Zoeken'

export default function Searchbutton() {
  const history = useHistory()
  const openSearch = () => {
    history.push(`/search`)
  }

  return (
    <button className="search" onClick={openSearch} type="button">
      <FiSearch size={24} />
      <p className="search-label">{SEARCH}</p>
    </button>
  )
}
