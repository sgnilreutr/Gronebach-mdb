import React, { useContext, useEffect, useState } from 'react'
import MovieList from '../MovieOverview/MovieList'
import { IMovie, IMovieSearch } from '../../data/api'
import { tenRandomMovies } from '../../utils/randomMovie'
import MovieDatabaseContext from '../../context/movieDatabaseContext'

interface Props {
  genre: string
  activeMovie: string
}

const RelatedMovies = ({ genre, activeMovie }: Props) => {
  const allMovieList = useContext(MovieDatabaseContext) as IMovieSearch[]
  const [relatedMovies, setRelatedMovies] = useState<IMovie[]>([])

  useEffect(() => {
    // There is no check yet if the genre string does contain a comma
    const query = genre.split(',')
    try {
      if (allMovieList.length > 0) {
        const filteredMovies = allMovieList
          .filter((movies) => movies.imdbID !== activeMovie)
          .filter((movie) =>
            movie.Genre.toLowerCase().includes(query[0].toLowerCase())
          )
        setRelatedMovies(tenRandomMovies(filteredMovies))
      }
    } catch (error) {
      console.error(error, 'No movies loaded')
    }
  }, [genre, allMovieList])

  return (
    <div>
      {relatedMovies.length > 0 && <MovieList movies={relatedMovies} />}
    </div>
  )
}

export default RelatedMovies
