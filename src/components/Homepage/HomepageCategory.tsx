import React, { useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MovieSearch } from '../../data/api'
import MovieList from '../MovieOverview/MovieList'
import { tenRandomMovies } from '../../utils/randomMovie'
import * as global from '../../constants/globalConstants'

const CATEGORY_CTA_TEXT = 'Bekijk alles'
const selectCategory = (state: any) => state.category

const HomepageCategory = ({
  movieList,
  categoryName,
  categoryFilter,
}: {
  movieList: MovieSearch[]
  categoryName: string
  categoryFilter: string
}) => {
  const category = useSelector(selectCategory)
  const dispatch = useDispatch()
  const history = useHistory()
  const [filteredMovies, setFilteredMovies] = useState<MovieSearch[]>([])
  const [loadingState, setLoadingState] = useState<string>('idle')

  const openCategory = (value: string) => {
    dispatch({ type: 'SET_OVERVIEW_QUERY', payload: value })
    history.push({
      pathname: `/overview/${ value }`,
    })
  }

  useEffect(() => {
    try {
      if (movieList.length > 0) {
        setLoadingState('loading')
        const moviesFiltered = movieList.filter((movie) =>
          movie.Type.toLowerCase().includes(category.toLowerCase())
        )
        setFilteredMovies(moviesFiltered)
      }
      setLoadingState('loaded')
    } catch (err) {
      console.error(err)
      setLoadingState('error')
    }
  }, [category, movieList])

  const filteredList = () => {
    if (categoryFilter === 'top' && filteredMovies.length > 0) {
      const filterList = filteredMovies.filter((movie) => parseInt(movie.imdbRating, 10) >= 8.0)
      return filterList
    }
    if (categoryFilter === 'kids' && filteredMovies.length > 0) {
      const filterList = filteredMovies.filter((movie) => movie.Rated === 'PG' && 'G')
      return filterList
    }
    const filterList = filteredMovies.filter((movie) =>
      movie.Genre.toLowerCase().includes(categoryFilter)
    )
    return filterList
  }

  const sliceMovies = () => {
    if (filteredMovies.length > 0 && filteredList().length > 0) {
      const sectionMovieList = filteredList()
      return tenRandomMovies(sectionMovieList)
    }
    return []
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
          <span className="category-header__subtitle-text">{CATEGORY_CTA_TEXT}</span>
        </div>
      </div>
      {loadingState === 'error' && <p>{global.COULD_NOT_LOAD}</p>}
      {loadingState === 'idle' && <p>{global.LOADING}</p>}
      {sliceMovies().length === 0 && loadingState === 'loading' && <p>{global.LOADING}</p>}
      {sliceMovies().length >= 0 && loadingState === 'loaded' && <MovieList movies={sliceMovies()} />}
    </div>
  )
}

export default HomepageCategory
