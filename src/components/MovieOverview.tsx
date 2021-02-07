import React, { useEffect, useState } from 'react'
import './MovieOverview.scss'

import { createApiClient, Movie } from '../data/api'

import MovieListItem from './MovieListItem'
import { Link, useLocation } from 'react-router-dom'
// import Overviewheader from './OverviewHeader'
import DetailHeader from './DetailHeader'


interface Props {
    movies: any
}

const api = createApiClient()

const MovieOverview: React.FC<Props> = () => {
    const [movieList, setMovieList] = useState<Movie[]>()

    useEffect(() => {
        const fetchData = async () => {
            const movies = await api.getMovies()
            setMovieList(movies)
        }

        fetchData()
    }, [])

    const location = useLocation()
    let partLoc = location.pathname.split('/')

    const renderMovies = (movieList: Movie[]) => {
        const filteredMovies = movieList.filter((movie) =>
            partLoc[2] !== 'children' ? (movie.Genre.toLowerCase()).includes(`${ partLoc[2] }`) : (movie.Rated === 'PG' && 'G')
        )

        return (
            <div>
                <h1>Alle {partLoc[2]} films</h1>
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
            {movieList ? renderMovies(movieList) : <h2>Loading...</h2>}
        </div>
    )
}

export default MovieOverview
