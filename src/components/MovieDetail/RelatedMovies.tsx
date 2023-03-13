import { useContext, useEffect, useState } from 'react'

import MovieDatabaseContext from '../../context/movieDatabaseContext'
import type { IMovie } from '../../data/dataTypes'
import { tenRandomMovies } from '../../utils/randomMovie'
import MovieList from '../MovieOverview/MovieList'

interface IRelatedMovies {
  genre: string
  activeMovie: string
}

const RelatedMovies = ({ genre, activeMovie }: IRelatedMovies) => {
  const { movies } = useContext(MovieDatabaseContext)
  const [relatedMovies, setRelatedMovies] = useState<Array<IMovie>>([])

  useEffect(() => {
    try {
      // There is no check yet if the genre string does contain a comma
      const query = genre.split(',')
      const [firstListedGenre] = query
      if (!firstListedGenre) {
        return
      }
      if (movies.length > 0) {
        const filteredMovies = movies.filter(
          (movie) =>
            movie.imdbID !== activeMovie &&
            movie.Genre.toLowerCase().includes(firstListedGenre.toLowerCase())
        )
        setRelatedMovies(tenRandomMovies(filteredMovies))
      }
    } catch (error) {
      console.error(error, 'No movies loaded')
    }
  }, [genre, movies])

  return (
    <div>
      {relatedMovies.length > 0 && <MovieList movies={relatedMovies} />}
    </div>
  )
}

export default RelatedMovies
