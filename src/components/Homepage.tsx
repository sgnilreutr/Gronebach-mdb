import React, { useEffect, useState } from 'react'
import './Homepage.scss'
import MovieList from './MovieList'
import Overviewheader from './OverviewHeader'
import { Movie } from '../data/api'
import { FiChevronRight } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'

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

const selectBaseLoaded = (state: any) => state.baseLoaded

const Homepage = ({ history }: { history: any }) => {
    const [movieList, setMovieList] = useState<Movie[]>([])
    const [topCategory, setTopCategory] = useState<Movie[]>([])
    const [actionCategory, setActionCategory] = useState<Movie[]>([])
    const [romanceCategory, setRomanceCategory] = useState<Movie[]>([])
    const [comedyCategory, setComedyCategory] = useState<Movie[]>([])
    const [kidsCategory, setKidsCategory] = useState<Movie[]>([])
    const dispatch = useDispatch()

    const baseLoaded = useSelector(selectBaseLoaded)

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
    }, [baseLoaded]);

    //Show Top Rated category homepage
    useEffect(() => {
        if (movieList) {
            const filterList = movieList.filter(
                (movie: any) => movie.imdbRating >= 8.0
            )
            const randomNumber = (Math.floor(Math.random() * 100) + 10)
            const randomRightBorderSlice = randomNumber > filterList.length ? filterList.length : randomNumber
            const randomLeftBorderSlice = randomRightBorderSlice - 10
            // setTopCategory(filterList.slice(randomLeftBorderSlice, randomRightBorderSlice))
            setTopCategory(filterList.slice(0, 4))
        } else {
            console.log('No movies loaded')
        }
    }, [movieList])

    //Show Action category homepage
    useEffect(() => {
        if (movieList) {
            const filterList = movieList.filter(
                (movie: any) => movie.Genre.toLowerCase().includes('action')
            )
            const randomNumber = (Math.floor(Math.random() * 100) + 10)
            const randomRightBorderSlice = randomNumber > filterList.length ? filterList.length : randomNumber
            const randomLeftBorderSlice = randomRightBorderSlice - 10
            setActionCategory(filterList.slice(randomLeftBorderSlice, randomRightBorderSlice))
        } else {
            console.log('No movies loaded')
        }
    }, [movieList])

    //Show Romance category homepage
    useEffect(() => {
        if (movieList) {
            const filterList = movieList.filter(
                (movie: any) => movie.Genre.toLowerCase().includes('romance')
            )
            const randomNumber = (Math.floor(Math.random() * 100) + 10)
            const randomRightBorderSlice = randomNumber > filterList.length ? filterList.length : randomNumber
            const randomLeftBorderSlice = randomRightBorderSlice - 10
            setRomanceCategory(filterList.slice(randomLeftBorderSlice, randomRightBorderSlice))
        } else {
            console.log('No movies loaded')
        }
    }, [movieList])

    //Show Comedy category homepage
    useEffect(() => {
        if (movieList) {
            const filterList = movieList.filter(
                (movie: any) => movie.Genre.toLowerCase().includes('comedy')
            )
            const randomNumber = (Math.floor(Math.random() * 100) + 10)
            const randomRightBorderSlice = randomNumber > filterList.length ? filterList.length : randomNumber
            const randomLeftBorderSlice = randomRightBorderSlice - 10
            setComedyCategory(filterList.slice(randomLeftBorderSlice, randomRightBorderSlice))
        } else {
            console.log('No movies loaded')
        }
    }, [movieList])

    //Show Child safe category homepage
    useEffect(() => {
        if (movieList) {
            const filterList = movieList.filter(
                (movie: any) => movie.Rated === 'PG' && 'G'
            )
            const randomNumber = (Math.floor(Math.random() * 100) + 10)
            const randomRightBorderSlice = randomNumber > filterList.length ? filterList.length : randomNumber
            const randomLeftBorderSlice = randomRightBorderSlice - 10
            setKidsCategory(filterList.slice(randomLeftBorderSlice, randomRightBorderSlice))
        } else {
            console.log('No movies loaded')
        }
    }, [movieList])

    const categoryHomepage = (movieList: any) => {
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
                    <MovieList movies={topCategory} />
                </div>
                {/* <div>
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
                    <MovieList movies={actionCategory} />
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
                    <MovieList movies={romanceCategory} />
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
                    <MovieList movies={comedyCategory} />
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
                    <MovieList movies={kidsCategory} />
                </div> */}
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
