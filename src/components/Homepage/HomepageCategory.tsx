import { useContext, useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import type { Movie } from '../../data/dataTypes'
import { filteredList } from '../../utils/filteredMovieList'
import { tenRandomMovies } from '../../utils/randomMovie'
import { MovieList } from '../MovieOverview/MovieList'
import {
  COULD_NOT_LOAD,
  GENERIC_LOADING_STATES,
  type GenericLoadingState,
  LOADING,
  type MovieCategoryOptions,
} from '../../constants/globalConstants'
import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'

const CATEGORY_CTA_TEXT = 'Bekijk alles'

interface HomepageCategoryProps {
  categoryFilter: MovieCategoryOptions
  categoryName: string
  movies: Array<Movie>
}

export function HomepageCategory({ categoryFilter, categoryName, movies }: HomepageCategoryProps) {
  const navigate = useNavigate()
  const [filteredMovies, setFilteredMovies] = useState<Array<Movie>>([])
  const [loadingState, setLoadingState] = useState<GenericLoadingState>(GENERIC_LOADING_STATES.idle)
  const { activeCategory, setOverviewQuery } = useContext(MovieDatabaseContext)

  const openCategory = (value: MovieCategoryOptions) => {
    setOverviewQuery(value)
    navigate(`/overview/${value}`)
  }

  useEffect(() => {
    if (!movies || movies.length === 0 || typeof activeCategory !== 'string') {
      setLoadingState(GENERIC_LOADING_STATES.error)
      return
    }

    setLoadingState(GENERIC_LOADING_STATES.loading)
    if (Array.isArray(movies)) {
      const moviesFiltered = movies.filter(({ Type }) => Type.toLowerCase().includes(activeCategory.toLowerCase()))

      setFilteredMovies(moviesFiltered)
      setLoadingState(GENERIC_LOADING_STATES.loaded)
    }
  }, [activeCategory, movies])

  const sliceMovies = () => {
    const sectionMovieList = filteredList({
      activeFilter: categoryFilter,
      movies,
    })
    if (filteredMovies.length < 1 || sectionMovieList.length < 1) {
      return []
    }
    return tenRandomMovies(sectionMovieList)
  }

  const renderContent = () => {
    switch (loadingState) {
      case GENERIC_LOADING_STATES.idle:
        return <p>{LOADING}</p>
      case GENERIC_LOADING_STATES.error:
        return <p>{COULD_NOT_LOAD}</p>
      case GENERIC_LOADING_STATES.loading:
        return <p>{LOADING}</p>
      case GENERIC_LOADING_STATES.loaded:
        return <MovieList movies={sliceMovies()} />
      default:
        return <p>{COULD_NOT_LOAD}</p>
    }
  }

  return (
    <div>
      <div onClick={() => openCategory(categoryFilter)} className='category-header' aria-hidden='true'>
        <h2 className='category-header__title'>{categoryName}</h2>
        <FiChevronRight className='category-header__icon' size={18} />
        <div className='category-header__subtitle'>
          <span className='category-header__subtitle-text'>{CATEGORY_CTA_TEXT}</span>
        </div>
      </div>
      {renderContent()}
    </div>
  )
}
