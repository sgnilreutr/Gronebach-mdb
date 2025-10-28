import { useContext, useEffect, useState } from 'react'

import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'
import type { Movie } from '../../data/dataTypes'
import { tenRandomMovies } from '../../utils/randomMovie'
import { MovieList } from '../MovieOverview/MovieList'

interface RelatedMoviesProps {
  activeMovie: string
  genre: string
}

const regex = /,/

export function RelatedMovies({ genre, activeMovie }: RelatedMoviesProps) {
  const { allMovies } = useContext(MovieDatabaseContext)
  const [relatedMovies, setRelatedMovies] = useState<Array<Movie>>([])

  useEffect(() => {
    try {
      const hasComma = regex.test(genre)

      const query = hasComma ? genre.split(',') : genre

      const [firstListedGenre] = query

      if (!firstListedGenre) {
        return
      }

      if (allMovies.length > 0) {
        const filteredMovies = allMovies.filter(
          ({ imdbID, Genre }) => imdbID !== activeMovie && Genre.toLowerCase().includes(firstListedGenre.toLowerCase())
        )
        setRelatedMovies(tenRandomMovies(filteredMovies))
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, 'No movies loaded')
    }
  }, [genre, allMovies])

  return <div>{relatedMovies.length > 0 && <MovieList movies={relatedMovies} />}</div>
}
