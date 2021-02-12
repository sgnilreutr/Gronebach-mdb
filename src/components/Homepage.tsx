import React, { useEffect, useState } from 'react'
import './Homepage.scss'
import MovieList from './MovieList'
import Overviewheader from './OverviewHeader'
import { Movie } from '../data/api'
import { FiChevronRight } from 'react-icons/fi'
import { useDispatch } from 'react-redux'

const homepageCategories = [
    {
        name: `Best beoordeeld`,
    },
    {
        name: `Actie films`,
    },
    {
        name: `Romantische items`,
    },
    {
        name: `Comedies`,
    },
    {
        name: `Kijk met de kinderen`,
    },
]

const CATEGORY_CTA_TEXT = 'Bekijk alles'

const Homepage = ({ history }: { history: any }) => {
    const [movieList, setMovieList] = useState<Movie[]>()
    const dispatch = useDispatch()

    const openCategory = (value: string) => {
        dispatch({ type: 'SET_OVERVIEW_QUERY', payload: value })
        history.push({
            pathname: `/overview/${ value }`,
            state: { movie: movieList },
        })
    }

    useEffect(() => {
        const json = localStorage.getItem("movies");
        if (json) {
            const allMovies = JSON.parse(json);
            if (allMovies) {
                setMovieList(allMovies);
            }
        }
    }, []);

    const categoryHomepage = (movieList: any) => {
        //Show Top Rated category homepage
        const filterTopMovies = movieList.filter(
            (movie: any) => movie.imdbRating >= 8.0
        )
        const randomNumber = (Math.floor(Math.random() * 100) + 10)
        const randomRightBorderSlice = randomNumber > filterTopMovies.length ? filterTopMovies.length : randomNumber; console.log(randomRightBorderSlice)
        const randomLeftBorderSlice = randomRightBorderSlice - 10; console.log(randomLeftBorderSlice)

        const partTop = filterTopMovies.slice(randomLeftBorderSlice, randomRightBorderSlice)

        //Show Action category homepage
        const filterActionMovies = movieList.filter((movie: any) =>
            movie.Genre.toLowerCase().includes('action')
        )
        const partAction = filterActionMovies.slice(0, 10)

        //Show Romance category homepage
        const filterRomanceMovies = movieList.filter((movie: any) =>
            movie.Genre.toLowerCase().includes('romance')
        )
        const partRomance = filterRomanceMovies.slice(0, 10)

        //Show Comedy category homepage
        const filterComedyMovies = movieList.filter((movie: any) =>
            movie.Genre.toLowerCase().includes('comedy')
        )
        const partComedy = filterComedyMovies.slice(0, 10)

        //Show Child safe category homepage
        const filterChildMovies = movieList.filter(
            (movie: any) => movie.Rated === 'PG' && 'G'
        )
        const partChild = filterChildMovies.slice(0, 10)

        return (
            <div>
                <div>
                    <div className="category-header">
                        <h2 className="category-header__title">
                            {homepageCategories[0].name}
                        </h2>
                        <div className="category-header__subtitle__nohover">
                            <span className="category-header__subtitle-text">
                                {CATEGORY_CTA_TEXT}
                            </span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={partTop} />
                </div>
                <div>
                    <div
                        onClick={() => openCategory('action')}
                        className="click category-header"
                    >
                        <h2 className="category-header__title">
                            {homepageCategories[1].name}
                        </h2>
                        <FiChevronRight className="category-header__icon" size={18} />
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">
                                {CATEGORY_CTA_TEXT}
                            </span>
                        </div>
                    </div>
                    <MovieList movies={partAction} />
                </div>
                <div>
                    <div
                        onClick={() => openCategory('romance')}
                        className="click category-header"
                    >
                        <h2 className="category-header__title">
                            {homepageCategories[2].name}
                        </h2>
                        <FiChevronRight className="category-header__icon" size={18} />
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">
                                {CATEGORY_CTA_TEXT}
                            </span>
                        </div>
                    </div>
                    <MovieList movies={partRomance} />
                </div>
                <div>
                    <div
                        onClick={() => openCategory('comedy')}
                        className="click category-header"
                    >
                        <h2 className="category-header__title">
                            {homepageCategories[3].name}
                        </h2>
                        <FiChevronRight className="category-header__icon" size={18} />
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">
                                {CATEGORY_CTA_TEXT}
                            </span>
                        </div>
                    </div>
                    <MovieList movies={partComedy} />
                </div>
                <div>
                    <div
                        onClick={() => openCategory('children')}
                        className="click category-header"
                    >
                        <h2 className="category-header__title">
                            {homepageCategories[4].name}
                        </h2>
                        <FiChevronRight className="category-header__icon" size={18} />
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">
                                {CATEGORY_CTA_TEXT}
                            </span>
                        </div>
                    </div>
                    <MovieList movies={partChild} />
                </div>
            </div>
        )
    }

    return (
        <div style={{ marginBottom: '6rem' }}>
            <Overviewheader />
            {movieList ? categoryHomepage(movieList) : <h2>Nothing to show</h2>}
        </div>
    )
}

export default Homepage
