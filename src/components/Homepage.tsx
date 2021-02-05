import React, { useEffect, useState } from 'react'
import './Homepage.scss'
import MovieList from './MovieList'
import Overviewheader from './OverviewHeader'
import firebase from '../data/firebase'
import { Movie } from '../data/api'
import { FiChevronRight } from 'react-icons/fi'

const Homepage = ({ history }: { history: any }) => {
    const [movieList, setMovieList] = useState<Movie[]>()

    //Fetch data from RTDb in Firebase
    useEffect(() => {
        const movieRef = firebase.database().ref("/")
        movieRef.on("value", (snapshot) => {
            const movies = snapshot.val()
            const movieList = []
            for (let id in movies) {
                movieList.push(movies[id])
            }
            setMovieList(movieList || 'No movies loaded.')
        })
    }, [])

    // const openOverviewPage = (part: any) => {
    //     history.push('/overview/action')
    // }

    const categoryHomepage = (movieList: any) => {

        //Show Top Rated category homepage
        const filterTopMovies = movieList.filter((movie: any) =>
            (movie.imdbRating >= 8.5))
        const partTop = filterTopMovies.slice(0, 10)

        //Show Action category homepage
        const filterActionMovies = movieList.filter((movie: any) =>
            (movie.Genre.toLowerCase()).includes('action'))
        const partAction = filterActionMovies.slice(0, 10)

        //Show Romance category homepage
        const filterRomanceMovies = movieList.filter((movie: any) =>
            (movie.Genre.toLowerCase()).includes('romance'))
        const partRomance = filterRomanceMovies.slice(0, 10)

        //Show Comedy category homepage
        const filterComedyMovies = movieList.filter((movie: any) =>
            (movie.Genre.toLowerCase()).includes('comedy'))
        const partComedy = filterComedyMovies.slice(0, 10)

        //Show Child safe category homepage
        const filterChildMovies = movieList.filter((movie: any) =>
            (movie.Rated === 'PG' && 'G'))
        const partChild = filterChildMovies.slice(0, 10)

        return (
            <div>
                <div>
                    {/* <div onClick={() => openOverviewPage(part)} className="category-header"> */}
                    <div className="category-header">
                        <h2 className="category-header__title">Best beoordeeld</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">Bekijk alles</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={partTop} />
                </div>
                <div>
                    <div className="category-header">
                        <h2 className="category-header__title">Actie films</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">Bekijk alles</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={partAction} />
                </div>
                <div>
                    <div className="category-header">
                        <h2 className="category-header__title">Romantische items</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">Bekijk alles</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={partRomance} />
                </div>
                <div>
                    <div className="category-header">
                        <h2 className="category-header__title">Comedies</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">Bekijk alles</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={partComedy} />
                </div>
                <div>
                    <div className="category-header">
                        <h2 className="category-header__title">Kijk met de kinderen</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">Bekijk alles</span>
                            <FiChevronRight className="category-header__icon" size={18} />
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