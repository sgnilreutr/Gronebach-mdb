import { useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import * as global from '../../constants/globalConstants'
import type { IMovie } from '../../data/dataTypes'
import { tenRandomMovies } from '../../utils/randomMovie'
import MovieList from '../MovieOverview/MovieList'

const CATEGORY_CTA_TEXT = 'Bekijk alles'
const selectCategory = (state: any) => state.category

interface IHomepageCategory {
  categoryFilter: string
  categoryName: string
  movieList: Array<IMovie>
}

const HomepageCategory = ({
  categoryFilter,
  categoryName,
  movieList,
}: IHomepageCategory) => {
  const category = useSelector(selectCategory)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredMovies, setFilteredMovies] = useState<Array<IMovie>>([])
  const [loadingState, setLoadingState] = useState<string>('idle')

  const openCategory = (value: string) => {
    dispatch({ type: 'SET_OVERVIEW_QUERY', payload: value })
    navigate(`/overview/${value}`)
  }

  useEffect(() => {
    try {
      if (movieList.length > 0) {
        setLoadingState('loading')
        const moviesFiltered = movieList.filter((movie) =>
          movie.Type.toLowerCase().includes(category.toLowerCase())
        )
        setFilteredMovies(moviesFiltered)
        setLoadingState('loaded')
      } else {
        setLoadingState('error')
      }
    } catch (err) {
      console.error(err)
      setLoadingState('error')
    }
  }, [category, movieList])

  const filteredList = () => {
    if (categoryFilter === 'top' && filteredMovies.length > 0) {
      const filterList = filteredMovies.filter(
        (movie) => parseInt(movie.imdbRating, 10) >= 8.0
      )
      return filterList
    }
    if (categoryFilter === 'kids' && filteredMovies.length > 0) {
      const filterList = filteredMovies.filter(
        (movie) => movie.Rated === 'PG' && 'G'
      )
      return filterList
    }
    const filterList = filteredMovies.filter((movie) =>
      movie.Genre.toLowerCase().includes(categoryFilter)
    )
    return filterList
  }

  const sliceMovies = () => {
    if (filteredMovies.length < 1 || filteredList().length < 1) {
      return []
    }
    const sectionMovieList = filteredList()
    return tenRandomMovies(sectionMovieList)
  }

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
      {loadingState === 'error' && <p>{global.COULD_NOT_LOAD}</p>}
      {loadingState === 'idle' && <p>{global.LOADING}</p>}
      {sliceMovies().length === 0 && loadingState === 'loading' && (
        <p>{global.LOADING}</p>
      )}
      {sliceMovies().length >= 0 && loadingState === 'loaded' && (
        <MovieList movies={sliceMovies()} />
      )}
    </div>
  )
}

export default HomepageCategory
