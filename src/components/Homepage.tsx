import React, { useEffect, useState } from 'react'
import './Homepage.scss'
import MovieList from './MovieList'
import Overviewheader from './OverviewHeader'
import firebase from '../data/firebase'
import { Movie } from '../data/api'
import { FiChevronRight } from 'react-icons/fi'
import { createApiClient } from '../data/api'
import db from '../data/firebase'

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
];

const api = createApiClient()

const CATEGORY_CTA_TEXT = "Bekijk alles"

const Homepage = ({ history }: { history: any }) => {
    const [movieList, setMovieList] = useState<Movie[]>()

    //Fetch data from RTDb in Firebase
    // useEffect(() => {
    //     const movieRef = firebase.database().ref("0/Movies")
    //     movieRef.once("value", (snapshot) => {
    //         const movies = snapshot.val()
    //         const movieList = []
    //         for (let id in movies) {
    //             movieList.push(movies[id])
    //         }
    //         setMovieList(movieList || 'No movies loaded.')
    //     })
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            const movies = await api.getMovies()
            setMovieList(movies || 'No movies loaded.')
        }

        fetchData()
    }, [])

    const onClick = (movieList: any) => {
        console.log(movieList)
        movieList.forEach((movie: any) => {
            db.collection('movies').add(
                {
                    Title: movie.Title,
                    Year: movie.Year,
                    Rated: movie.Rated,
                    Released: movie.Released,
                    Runtime: movie.Runtime,
                    Genre: movie.Genre,
                    Director: movie.Director,
                    Writer: movie.Writer,
                    Actors: movie.Actors,
                    Cast: movie.Cast,
                    Plot: movie.Plot,
                    Language: movie.Language,
                    Country: movie.Country,
                    Awards: movie.Awards,
                    Poster: movie.Poster,
                    // Ratings
                    Metascore: movie.Metascore,
                    imdbRating: movie.imdbRating,
                    imdbVotes: movie.imdbVotes,
                    imdbID: movie.imdbID,
                    Type: movie.Type,
                    DVD: movie.DVD != null ? movie.DVD : 'N/A',
                    BoxOffice: movie.BoxOffice != null ? movie.BoxOffice : 'N/A',
                    Production: movie.Production != null ? movie.Production : 'N/A',
                    Website: movie.Website != null ? movie.Website : 'N/A',
                }
            )
        })
    }

    const openOverviewPage = () => {
        history.push({
            pathname: '/overview/',
            search: 'action',
            // state: { detail: response.data }
            // state: { detail: partTop }
        })
    }

    const categoryHomepage = (movieList: any) => {

        console.log(movieList)

        //Show Top Rated category homepage
        const filterTopMovies = movieList.filter((movie: any) =>
            (movie.imdbRating >= 8.5))
        const partTop = filterTopMovies.slice(0, 10)

        //Show Action category homepage
        // const filterActionMovies = movieList.filter((movie: any) =>
        //     (movie.Genre.toLowerCase()).includes('action'))
        // const partAction = filterActionMovies.slice(0, 10)

        // //Show Romance category homepage
        // const filterRomanceMovies = movieList.filter((movie: any) =>
        //     (movie.Genre.toLowerCase()).includes('romance'))
        // const partRomance = filterRomanceMovies.slice(0, 10)

        // //Show Comedy category homepage
        // const filterComedyMovies = movieList.filter((movie: any) =>
        //     (movie.Genre.toLowerCase()).includes('comedy'))
        // const partComedy = filterComedyMovies.slice(0, 10)

        // //Show Child safe category homepage
        // const filterChildMovies = movieList.filter((movie: any) =>
        //     (movie.Rated === 'PG' && 'G'))
        // const partChild = filterChildMovies.slice(0, 10)

        return (
            <div>
                <button onClick={() => onClick(movieList)}>Click</button>
                <div>
                    {/* <Link to={`/overview/${}`} className="category-header"> */}
                    <div onClick={() => openOverviewPage()} className="category-header">
                        <h2 className="category-header__title">{homepageCategories[0].name}</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">{CATEGORY_CTA_TEXT}</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    {/* </Link> */}
                    <MovieList movies={partTop} />
                </div>
                {/* <div>
                    <div className="category-header">
                        <h2 className="category-header__title">{homepageCategories[1].name}</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">{CATEGORY_CTA_TEXT}</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={partAction} />
                </div> */}
                {/* <div>
                    <div className="category-header">
                        <h2 className="category-header__title">{homepageCategories[2].name}</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">{CATEGORY_CTA_TEXT}</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={partRomance} />
                </div>
                <div>
                    <div className="category-header">
                        <h2 className="category-header__title">{homepageCategories[3].name}</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">{CATEGORY_CTA_TEXT}</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={partComedy} />
                </div>
                <div>
                    <div className="category-header">
                        <h2 className="category-header__title">{homepageCategories[4].name}</h2>
                        <div className="category-header__subtitle">
                            <span className="category-header__subtitle-text">{CATEGORY_CTA_TEXT}</span>
                            <FiChevronRight className="category-header__icon" size={18} />
                        </div>
                    </div>
                    <MovieList movies={partChild} />
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