import React, { useEffect, useState } from 'react'
import './MovieOverview.scss'

import { Movie } from '../data/api'
// import { useSelector } from 'react-redux'

import MovieListItem from './MovieListItem'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
// import Overviewheader from './OverviewHeader'
import DetailHeader from './DetailHeader'


interface Props {
    movies: any
}

// const selectSearchTerm = (state: any) => state.searchTerm

const MovieOverview: React.FC<Props> = () => {
    // const searchTerm = useSelector(selectSearchTerm)
    const [movies, setMovies] = useState<Movie[]>()

    //Fetch data from RTDb in Firebase
    useEffect(() => {
        const movieRef = firebase.database().ref("/")
        movieRef.on("value", (snapshot) => {
            const movies = snapshot.val()
            const movieList = []
            for (let id in movies) {
                movieList.push(movies[id])
            }
            setMovies(movieList || 'No movies loaded.')
        })
    }, [])

    const renderMovies = (movies: Movie[]) => {
        const filteredMovies = movies.filter((movie) =>
            (movie.Genre.toLowerCase()).includes('action')
        )

        console.log(filteredMovies)
        //Send search term from overview to this component to trigger a filtering.

        return (
            <div>
                <h1>Alle actie films</h1>
                <div className="movie-grid">
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                            <div key={movie.imdbID}>
                                <MovieListItem
                                    movieInfo={{
                                        Title: `${ movie.Title }`,
                                        Year: `${ movie.Year }`,
                                        imdbID: `${ movie.imdbID }`,
                                        Type: `${ movie.Type }`,
                                        Poster: `${ movie.Poster }`,
                                        Runtime: `${ movie.Runtime }`,
                                        Genre: `${ movie.Genre }`,
                                        Actors: `${ movie.Actors }`,
                                        Country: `${ movie.Country }`,
                                        imdbRating: `${ movie.imdbRating }`,
                                        Director: `${ movie.Director }`
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                            <div>
                                <p>Geen items gevonden.</p>
                                <Link to="/missing">Controleer de ontbrekende titels</Link>
                            </div>
                        )}
                </div>
            </div>
        )
    }

    return (
        <div>
            <DetailHeader />
            {movies ? renderMovies(movies) : <h2>Loading...</h2>}
        </div>
    )
}

export default MovieOverview
