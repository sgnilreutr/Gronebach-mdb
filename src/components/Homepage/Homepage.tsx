import React, { useEffect, useState } from 'react'
import './Homepage.scss'
import { FiChevronRight } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import MovieList from '../MovieOverview/MovieList'
import Overviewheader from '../Header/OverviewHeader'
import HomepageCategory from './HomepageCategory'
import { Movie } from '../../data/api'

const HOMEPAGE_CATEGORIES = [
    {
        name: `Best beoordeeld`,
    },
    {
        name: `Vol met actie`,
        filter: 'action',
    },
    {
        name: `Romantische items`,
    },
    {
        name: `Comedy's`,
    },
    {
        name: `Ontdek de mysteries`,
    },
    {
        name: `Misdaad`,
    },
    {
        name: `Kijk met de kinderen`,
    },
]

const CATEGORY_CTA_TEXT = 'Bekijk alles'
const NOTHING_TO_SHOW = 'Nothing to show'

const selectBaseLoaded = (state: any) => state.baseLoaded

const Homepage = ({ history }: { history: any }) => {
    const [movieList, setMovieList] = useState<Movie[]>([])
    const [topCategory, setTopCategory] = useState<Movie[]>([])
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
        try {
            if (json) {
                const allMovies = JSON.parse(json);
                if (allMovies) {
                    setMovieList(allMovies);
                }
            }
        } catch (err) {
            console.error(err)
        }
    }, [baseLoaded]);

    // Show Top Rated category homepage
    useEffect(() => {
        if (movieList) {
            const filterList = movieList.filter(
                (movie: any) => movie.imdbRating >= 8.0
            )
            const randomNumber = (Math.floor(Math.random() * 100) + 10)
            const randomRightBorderSlice = randomNumber > filterList.length ? filterList.length : randomNumber
            const randomLeftBorderSlice = randomRightBorderSlice - 10
            setTopCategory(filterList.slice(randomLeftBorderSlice, randomRightBorderSlice))
        } else {
            console.log('No movies loaded')
        }
    }, [movieList])

    // Show Child safe category homepage
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

    const categoryHomepage = () => (
        <div>
            <div>
                <div className="category-header">
                    <h2 className="category-header__title">
                        {HOMEPAGE_CATEGORIES[0].name}
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
            <HomepageCategory movieList={movieList} categoryName={HOMEPAGE_CATEGORIES[1].name} categoryFilter="action" />
            <HomepageCategory movieList={movieList} categoryName={HOMEPAGE_CATEGORIES[2].name} categoryFilter="romance" />
            <HomepageCategory movieList={movieList} categoryName={HOMEPAGE_CATEGORIES[3].name} categoryFilter="comedy" />
            <HomepageCategory movieList={movieList} categoryName={HOMEPAGE_CATEGORIES[4].name} categoryFilter="mystery" />
            <HomepageCategory movieList={movieList} categoryName={HOMEPAGE_CATEGORIES[5].name} categoryFilter="crime" />
            <div>
                <div aria-hidden="true"
                    onClick={() => openCategory('children')}
                    className="click category-header"
                >
                    <h2 className="category-header__title">
                        {HOMEPAGE_CATEGORIES[6].name}
                    </h2>
                    <FiChevronRight className="category-header__icon" size={18} />
                    <div className="category-header__subtitle">
                        <span className="category-header__subtitle-text">
                            {CATEGORY_CTA_TEXT}
                        </span>
                    </div>
                </div>
                <MovieList movies={kidsCategory} />
            </div>
        </div>
    )

    return (
        <div style={{ marginBottom: '6rem' }}>
            <Overviewheader />
            {movieList ? categoryHomepage() : <h2>{NOTHING_TO_SHOW}</h2>}
        </div>
    )
}

export default Homepage
