import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Movie } from '../../data/api'
import MovieList from '../MovieOverview/MovieList'
import { tenRandomMovies } from '../../utils/randomMovie'
import * as global from '../../constants/globalConstants'


const CATEGORY_CTA_TEXT = 'Bekijk alles'

const HomepageCategory = ({ movieList, categoryName, categoryFilter }: { movieList: Movie[], categoryName: string, categoryFilter: string }) => {
    const dispatch = useDispatch()
    const history = useHistory();

    const openCategory = (value: string) => {
        dispatch({ type: 'SET_OVERVIEW_QUERY', payload: value })
        history.push({
            pathname: `/overview/${ value }`
        })
    }

    const filteredList = () => {
        if (categoryFilter === 'top') {
            const filterList = movieList.filter(
                (movie: any) => movie.imdbRating >= 8.0
            )
            return filterList
        }
        if (categoryFilter === 'kids') {
            const filterList = movieList.filter(
                (movie: any) => movie.Rated === 'PG' && 'G'
            )
            return filterList
        }
        const filterList = movieList.filter(
            (movie: any) => movie.Genre.toLowerCase().includes(categoryFilter)
        )
        return filterList
    }

    const sliceMovies = () => {
        if (movieList.length > 0 && filteredList().length > 0) {
            const filteredMovies = filteredList()
            return tenRandomMovies(filteredMovies)
        }
        return []
    }

    return (
        <div>
            <div onClick={() => openCategory(categoryFilter)} className="category-header" aria-hidden="true">
                <h2 className="category-header__title">
                    {categoryName}
                </h2>
                <FiChevronRight className="category-header__icon" size={18} />
                <div className="category-header__subtitle">
                    <span className="category-header__subtitle-text">
                        {CATEGORY_CTA_TEXT}
                    </span>
                </div>
            </div>
            {sliceMovies().length === 0 && <p>{global.LOADING}</p>}
            {sliceMovies().length > 0 && <MovieList movies={sliceMovies()} />}
        </div>
    )
}

export default HomepageCategory