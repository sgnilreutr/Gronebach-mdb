import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Movie } from '../data/api'
import MovieListContainer from './MovieListContainer'
import MovieList from './MovieList'


const CATEGORY_CTA_TEXT = 'Bekijk alles'

const HomepageCategory = ({ movieList, categoryName, categoryFilter }: { movieList: Movie[], categoryName: string, categoryFilter: string }) => {

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
            <div className="category-header">
                <h2 className="category-header__title">
                    {categoryName}
                </h2>
                <div className="category-header__subtitle__nohover">
                    <span className="category-header__subtitle-text">
                        {CATEGORY_CTA_TEXT}
                    </span>
                    <FiChevronRight className="category-header__icon" size={18} />
                </div>
            </div>
            <MovieListContainer movies={randomSlice} />
            {/* <MovieList movies={randomSlice} /> */}
        </div>
    )
}

export default HomepageCategory