import { useContext, useEffect, useState } from 'react'

import MovieDatabaseContext from '../../context/movieDatabaseContext'
import type { IMovie } from '../../data/dataTypes'
import { tenRandomMovies } from '../../utils/randomMovie'
import MovieList from '../MovieOverview/MovieList'

interface IRelatedMovies {
  genre: string
  activeMovie: string
}

const regex = /,/

const RelatedMovies = ({ genre, activeMovie }: IRelatedMovies) => {
  const { movies } = useContext(MovieDatabaseContext)
  const [relatedMovies, setRelatedMovies] = useState<Array<IMovie>>([])

  useEffect(() => {
    try {
      const hasComma = regex.test(genre)

      const query = hasComma ? genre.split(',') : genre

      const [firstListedGenre] = query

      if (!firstListedGenre) {
        return
      }

      if (movies.length > 0) {
        const filteredMovies = movies.filter(
          ({ imdbID, Genre }) =>
            imdbID !== activeMovie &&
            Genre.toLowerCase().includes(firstListedGenre.toLowerCase())
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
