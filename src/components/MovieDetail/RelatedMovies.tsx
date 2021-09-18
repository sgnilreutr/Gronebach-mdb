import React, { useEffect, useState } from 'react'
import MovieList from '../MovieOverview/MovieList'
import { Movie } from '../../data/api'
import { tenRandomMovies } from '../../utils/randomMovie'

interface Props {
    genre: string;
    activeMovie: string;
}

const RelatedMovies = ({ genre, activeMovie }: Props) => {
    const [relatedMovies, setRelatedMovies] = useState<Movie[]>([])

    useEffect(() => {
        // There is no check yet if the genre string does contain a comma
        const query = genre.split(',')
        const json = localStorage.getItem("movies");
        try {
            if (json) {
                const allMovies = JSON.parse(json);
                if (allMovies) {
                    const filteredMovies = allMovies.filter((movies: any) => movies.imdbID !== activeMovie).filter((movie: any) =>
                        movie.Genre.toLowerCase().includes(query[0].toLowerCase())
                    )
                    setRelatedMovies(tenRandomMovies(filteredMovies))
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