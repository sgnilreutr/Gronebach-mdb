import { useContext } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import type { Movie } from '../../data/dataTypes'
import { filteredList } from '../../utils/filteredMovieList'
import { tenRandomMovies } from '../../utils/randomMovie'
import { MovieList } from '../MovieOverview/MovieList'
import type { MovieCategoryOptions } from '../../constants/globalConstants'
import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'

interface HomepageCategoryProps {
  categoryFilter: MovieCategoryOptions
  categoryName: string
  movies: Array<Movie>
}

export function HomepageCategory({ categoryFilter, categoryName, movies }: HomepageCategoryProps) {
  const navigate = useNavigate()
  const { activeCategory, setMovieDatabaseContextData } = useContext(MovieDatabaseContext)

  const openCategory = (value: MovieCategoryOptions) => {
    setMovieDatabaseContextData((prevState) => ({ ...prevState, overviewQuery: value }))
    navigate(`/overview/${value}`)
  }

  const sliceMovies = () => {
    const moviesFiltered = movies.filter(({ Type }) => Type.toLowerCase().includes(activeCategory.toLowerCase()))
    const sectionMovieList = filteredList({
      activeFilter: categoryFilter,
      movies,
    })
    if (moviesFiltered.length < 1 || sectionMovieList.length < 1) {
      return []
    }
    return tenRandomMovies(sectionMovieList)
  }

  return (
    <div className='flex flex-col gap-3'>
      <button
        onClick={() => openCategory(categoryFilter)}
        className='flex items-center mt-[2.5] cursor-pointer max-w-content'
        type='button'>
        <h2 className='ml-2 md:ml-0 md:text-2xl group'>{categoryName}</h2>
        <FiChevronRight className='opacity-50' size={18} />
      </button>
      <MovieList movies={sliceMovies()} />
    </div>
  )
}
