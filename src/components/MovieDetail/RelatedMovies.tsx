import { useEffect, useState } from 'react'
import type { Movie } from '../../data/dataTypes'
import { tenRandomMovies } from '../../utils/randomMovie'
import { MovieList } from '../MovieOverview/MovieList'

interface RelatedMoviesProps {
  activeMovie: string
  genre: string
  allMovies: Array<Movie>
}

const regex = /,/

export function RelatedMovies({ genre, activeMovie, allMovies }: RelatedMoviesProps) {
  const [relatedMovies, setRelatedMovies] = useState<Array<Movie>>([])

  useEffect(() => {
    const hasComma = regex.test(genre)
    const query = hasComma ? genre.split(',') : genre
    const [firstListedGenre] = query

    if (!firstListedGenre) {
      return
    }
    const filteredMovies = allMovies.filter(
      ({ imdbID, Genre }) => imdbID !== activeMovie && Genre.toLowerCase().includes(firstListedGenre.toLowerCase())
    )
    setRelatedMovies(tenRandomMovies(filteredMovies))
  }, [genre, allMovies, activeMovie])

  return <div>{relatedMovies.length > 0 && <MovieList movies={relatedMovies} />}</div>
}
