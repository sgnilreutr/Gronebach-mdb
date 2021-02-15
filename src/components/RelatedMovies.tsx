import React, { useEffect, useState } from 'react'
import MovieList from './MovieList'
import { Movie } from '../data/api'

interface Props {
    genre: string;
}

const RelatedMovies = (genre: Props) => {
    const [relatedMovies, setRelatedMovies] = useState<Movie[]>([])

    useEffect(() => {
        //There is no check yet if the genre string does contain a comma
        const query = genre.genre.split(',')
        const json = localStorage.getItem("movies");
        if (json) {
            const allMovies = JSON.parse(json);
            if (allMovies) {
                const filteredMovies = allMovies.filter((movie: any) =>
                    movie.Genre.toLowerCase().includes(query[0].toLowerCase())
                )
                const shuffledMovies = filteredMovies.sort((a: any, b: any) => (a.Year < b.Year) ? 1 : -1)

                const randomNumber = (Math.floor(Math.random() * 100) + 10)
                const randomRightBorderSlice = randomNumber > shuffledMovies.length ? shuffledMovies.length : randomNumber
                const randomLeftBorderSlice = randomRightBorderSlice - 10

                setRelatedMovies(shuffledMovies.slice(randomLeftBorderSlice, randomRightBorderSlice))
            }
        } else {
            console.log('No movies loaded')
        }
    }, [genre.genre]);

    console.log(relatedMovies)
    return (
        <div>
            <MovieList movies={relatedMovies} />
        </div>
    )
}

export default RelatedMovies