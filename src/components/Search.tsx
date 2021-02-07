import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import './Search.scss'
import { createApiClient, Movie } from '../data/api'
import { Link } from 'react-router-dom'
import MovieListItem from './MovieListItem'
import { useSelector } from 'react-redux'
import CloseButton from './CloseButton'


const api = createApiClient()
const selectSearchTerm = (state: any) => state.searchTerm

export default function Search() {
    const searchTerm = useSelector(selectSearchTerm)
    const [movieList, setMovieList] = useState<Movie[]>()

    useEffect(() => {
        const fetchData = async () => {
            const movies = await api.getMovies()
            setMovieList(movies || 'No movies loaded.')
        }

        fetchData()
    }, [])

    const renderSearchMovies = (movieList: Movie[]) => {
        const filteredMovies = movieList.filter((movie) =>
            (
                movie.Title.toLowerCase() +
                movie.Year +
                movie.Type.toLowerCase() +
                movie.Runtime.toLowerCase() +
                movie.Genre.toLowerCase() +
                movie.Director.toLowerCase() +
                movie.Actors.toLowerCase() +
                movie.Country.toLowerCase() +
                movie.imdbRating
            ).includes(
                searchTerm.toLowerCase()
            )
        )

        return (
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
        )
    }


    return (
        <div>
            <div className="search-options">
                <SearchBar />
                <CloseButton />
            </div>
            {movieList ? (searchTerm ? renderSearchMovies(movieList) : <h2 className="search-page-placeholder">Start met zoeken</h2>) : <h2>Loading...</h2>}
        </div>
    )
}