import React, { useEffect, useState } from 'react'
import './Homepage.scss'
import { useSelector } from 'react-redux'
import Overviewheader from '../Header/OverviewHeader'
import HomepageCategory from './HomepageCategory'
import { Movie } from '../../data/api'
import fetchData from '../../data/fetchData'
import * as global from '../../constants/globalConstants'

const NOTHING_TO_SHOW = 'Nothing to show'

const selectBaseLoaded = (state: any) => state.baseLoaded

const Homepage = () => {
    const [movieList, setMovieList] = useState<Movie[]>([])
    const baseLoaded = useSelector(selectBaseLoaded)

    useEffect(() => {
        if (movieList.length === 0 && baseLoaded) {
            fetchData().then((value) => setMovieList(value))
        }
    }, [baseLoaded, movieList])

    const categoryHomepage = () => (
        <div>
            {global.MOVIE_CATEGORIES.map((item) => {
                const { name, filter } = item
                return <HomepageCategory movieList={movieList} categoryName={name} categoryFilter={filter} key={name} />
            })}
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
