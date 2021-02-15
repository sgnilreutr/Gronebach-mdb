import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Movie } from '../data/api'
import MovieList from './MovieList'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './Homepage.scss'

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

    function sliceMovies() {
        if (movieList) {
            const filterList = movieList.filter(
                (movie: any) => movie.Genre.toLowerCase().includes(categoryFilter)
            )
            const randomNumber = (Math.floor(Math.random() * 100) + 10)
            const randomEndIndex = randomNumber > filterList.length ? filterList.length : randomNumber
            const randomStartIndex = randomEndIndex - 10
            return filterList.slice(randomStartIndex, randomEndIndex)
        } else {
            console.log('No movies loaded')
        }
    }

    const randomSlice = sliceMovies()

    return (
        <div>
            <div onClick={() => openCategory(categoryFilter)} className="category-header">
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
            <MovieList movies={randomSlice} />
        </div>
    )
}

export default HomepageCategory