import React, { useEffect, useState } from 'react'
import './Homepage.scss'
import MovieList from './MovieList'
import Overviewheader from './OverviewHeader'
import firebase from '../data/firebase'
import { Movie } from '../data/api'
import { FiChevronRight } from 'react-icons/fi'

interface Props {

}

const Homepage = (props: Props) => {
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

    const categoryHomepage = (movieList: any) => {

        const filterTopMovies = movieList.filter((movie: any) =>
            (movie.imdbRating >= 8.5))

        const part = filterTopMovies.slice(0, 10)

        const filterActionMovies = movieList.filter((movie: any) =>
            (movie.Genre.toLowerCase()).includes('action'))

        const part1 = filterActionMovies.slice(0, 10)

        const filterRomanceMovies = movieList.filter((movie: any) =>
            (movie.Genre.toLowerCase()).includes('romance'))
        const part2 = filterRomanceMovies.slice(0, 10)

        const filterComedyMovies = movieList.filter((movie: any) =>
            (movie.Genre.toLowerCase()).includes('comedy'))
        const part3 = filterComedyMovies.slice(0, 10)

        console.log(part)

        return (
            <div>
                <div>
                    <div className="category-header">
                        <h2 className="category-header__title">Best beoordeeld</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">Bekijk alles</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={part} />
                </div>
                <div>
                    <div className="category-header">
                        <h2 className="category-header__title">Actie films</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">Bekijk alles</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={part1} />
                </div>
                <div>
                    <div className="category-header">
                        <h2 className="category-header__title">Romantische items</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">Bekijk alles</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={part2} />
                </div>
                <div>
                    <div className="category-header">
                        <h2 className="category-header__title">Comedies</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">Bekijk alles</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={part3} />
                </div>
            </div>
        )
    }

    return (
        <div>
            <Overviewheader />
            {movieList ? categoryHomepage(movieList) : <h2>Nothing to show</h2>}
        </div>
    )
}

export default Homepage