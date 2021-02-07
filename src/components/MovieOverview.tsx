import React, { useEffect, useState } from 'react'
import './MovieOverview.scss'

import { Movie } from '../data/api'
// import { useSelector } from 'react-redux'

import MovieListItem from './MovieListItem'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
// import Overviewheader from './OverviewHeader'
import DetailHeader from './DetailHeader'
import { useLocation } from "react-router-dom";


interface Props {
    movies: any
}

// const selectSearchTerm = (state: any) => state.searchTerm

const MovieOverview: React.FC<Props> = () => {
    // const searchTerm = useSelector(selectSearchTerm)
    const [movies, setMovies] = useState<Movie[]>()

    // const location = useLocation(); console.log(location);

    const query = 'Angelina Jolie'

    //Fetch data from RTDb in Firebase
    // useEffect(() => {
    //     const movieRef = firebase.database().ref("0/Movies")
    //     movieRef.orderByChild("Genre").equalTo("Action").once("value", (snapshot) => {
    //         const movies = snapshot.val()
    //         const childKey = snapshot.child("Movies/Title").key
    //         console.log(childKey)
    //         console.log(movies)
    //         setMovies(movies)
    //         // const movieList = []
    //         // for (let id in movies) {
    //         //     movieList.push(movies[id])
    //         // }
    //         // setMovies(movieList || 'No movies loaded.')
    //     })
    // }, [])

    // useEffect(() => {
    //     db.collection("movies")
    //         .orderBy("Title", "desc")
    //         .onSnapshot((snapshot) => 
    //             setMovies(snapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 data: doc.data(),
    //     }))))
    // },[])

    // console.log(movies)

    const renderMovies = (movies: Movie[]) => {
        const filteredMovies = movies
        // const filteredMovies = movies.filter((movie) =>
        //     (movie.Genre.toLowerCase()).includes('action')
        // )

        // console.log(filteredMovies)
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
