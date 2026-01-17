import { FiGrid } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ALL_CATEGORY_VALUE } from '../../constants/globalConstants'
import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'

const ALL = 'Alles'

export function SeeAllButton() {
  const { setMovieDatabaseContextData } = useContext(MovieDatabaseContext)

  return (
    <Link
      to={{ pathname: `/overview/${ALL_CATEGORY_VALUE}` }}
      onClick={() => setMovieDatabaseContextData((prevState) => ({ ...prevState, overviewQuery: ALL_CATEGORY_VALUE }))}
      className='cursor-pointer'>
      <button className='flex flex-row gap-2 md:mx-0 ml-2 mr-4' type='button'>
        <FiGrid size={24} />
        <p className='hidden md:block'>{ALL}</p>
      </button>
    </Link>
  )
}
