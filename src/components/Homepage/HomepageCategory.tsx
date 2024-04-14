import { useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import * as global from '../../constants/globalConstants'
import type { IMovie } from '../../data/dataTypes'
import { selectCategory, setOverviewQuery } from '../../store/appSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import filteredList from '../../utils/filteredMovieList'
import { tenRandomMovies } from '../../utils/randomMovie'
import MovieList from '../MovieOverview/MovieList'

const CATEGORY_CTA_TEXT = 'Bekijk alles'

interface IHomepageCategory {
  categoryFilter: string
  categoryName: string
  movies: Array<IMovie>
}

const HomepageCategory = ({
  categoryFilter,
  categoryName,
  movies,
}: IHomepageCategory) => {
  const category = useAppSelector(selectCategory)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [filteredMovies, setFilteredMovies] = useState<Array<IMovie>>([])
  const [loadingState, setLoadingState] = useState<string>('idle')

  const openCategory = (value: string) => {
    dispatch(setOverviewQuery(value))
    navigate(`/overview/${value}`)
  }

  useEffect(() => {
    if (!movies || movies.length === 0 || typeof category !== 'string') {
      setLoadingState('error')
      return
    }

    setLoadingState('loading')
    if (Array.isArray(movies)) {
      const moviesFiltered = movies.filter(({ Type }) =>
        Type.toLowerCase().includes(category.toLowerCase())
      )

      setFilteredMovies(moviesFiltered)
      setLoadingState('loaded')
    }
  }, [category, movies])

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

  const staticSliceMovies = sliceMovies()
  const hasMovies = staticSliceMovies.length > 0

  return (
    <div>
      <div
        onClick={() => openCategory(categoryFilter)}
        className="category-header"
        aria-hidden="true"
      >
        <h2 className="category-header__title">{categoryName}</h2>
        <FiChevronRight className="category-header__icon" size={18} />
        <div className="category-header__subtitle">
          <span className="category-header__subtitle-text">
            {CATEGORY_CTA_TEXT}
          </span>
        </div>
      </div>
      {loadingState === 'idle' && <p>{global.LOADING}</p>}
      {loadingState === 'error' && <p>{global.COULD_NOT_LOAD}</p>}
      {!hasMovies && loadingState === 'loading' && <p>{global.LOADING}</p>}
      {hasMovies && loadingState === 'loaded' && (
        <MovieList movies={staticSliceMovies} />
      )}
    </div>
  )
}

export default HomepageCategory
