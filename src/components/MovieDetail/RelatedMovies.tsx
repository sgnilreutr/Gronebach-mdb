import React, { useEffect, useState } from 'react'
import MovieList from '../MovieOverview/MovieList'
import { Movie } from '../../data/api'

interface Props {
    genre: string;
}

const RelatedMovies = ({ genre }: Props) => {
    const [relatedMovies, setRelatedMovies] = useState<Movie[]>([])

    useEffect(() => {
        // There is no check yet if the genre string does contain a comma
        const query = genre.split(',')
        const json = localStorage.getItem("movies");
        try {
            if (json) {
                const allMovies = JSON.parse(json);
                if (allMovies) {
                    const filteredMovies = allMovies.filter((movie: any) =>
                        movie.Genre.toLowerCase().includes(query[0].toLowerCase())
                    )
                    const shuffledMovies = filteredMovies.sort((a: any, b: any) => (a.Year < b.Year) ? 1 : -1)

                    const randomNumber = (Math.floor(Math.random() * 100) + 10)
                    const randomEndIndex = randomNumber > shuffledMovies.length ? shuffledMovies.length : randomNumber
                    const randomStartIndex = randomEndIndex - 10

                    setRelatedMovies(shuffledMovies.slice(randomStartIndex, randomEndIndex))
                }
            }
        } catch (error) {
            console.error(error, 'No movies loaded')
        }
    }, [genre]);

    return (
        <div>
            <MovieList movies={relatedMovies} />
        </div>
    )
}

export default RelatedMovies