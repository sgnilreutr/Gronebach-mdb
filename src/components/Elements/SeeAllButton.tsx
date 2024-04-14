import { FiGrid } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import * as global from '../../constants/globalConstants'
import { setOverviewQuery } from '../../store/appSlice'
import { useAppDispatch } from '../../store/hooks'

const ALL = 'Alles'

export function SeeAllButton() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const openCategory = () => {
    dispatch(setOverviewQuery(global.ALL_CATEGORY_VALUE))
    navigate(`/overview/${global.ALL_CATEGORY_VALUE}`)
  }

  return (
    <button onClick={openCategory} type="button" className="search" id="all">
      <FiGrid size={24} />
      <p className="search-label">{ALL}</p>
    </button>
  )
}
