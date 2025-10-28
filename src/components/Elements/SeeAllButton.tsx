import { FiGrid } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ALL_CATEGORY_VALUE } from '../../constants/globalConstants'
import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'

const ALL = 'Alles'

export function SeeAllButton() {
  const navigate = useNavigate()
  const { setOverviewQuery } = useContext(MovieDatabaseContext)

  const openCategory = () => {
    setOverviewQuery(ALL_CATEGORY_VALUE)
    navigate(`/overview/${ALL_CATEGORY_VALUE}`)
  }

  return (
    <button onClick={openCategory} type='button' className='search' id='all'>
      <FiGrid size={24} />
      <p className='search-label'>{ALL}</p>
    </button>
  )
}
