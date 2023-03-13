import { FiGrid } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import * as global from '../../constants/globalConstants'

const ALL = 'Alles'

const SeeAllButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const openCategory = () => {
    dispatch({ type: 'SET_OVERVIEW_QUERY', payload: global.ALL_CATEGORY_VALUE })
    navigate(`/overview/${global.ALL_CATEGORY_VALUE}`)
  }

  return (
    <button onClick={openCategory} type="button" className="search" id="all">
      <FiGrid size={24} />
      <p className="search-label">{ALL}</p>
    </button>
  )
}

export default SeeAllButton
