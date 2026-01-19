import type { Movie } from '../../data/dataTypes'
import { tenRandomMovies } from '../../utils/randomMovie'
import { MovieList } from '../MovieOverview/MovieList'

interface RelatedMoviesProps {
  activeMovie: string
  genre: string
  allMovies: Array<Movie>
}

function getRelatedMovies(activeMovie: string, genre: string, allMovies: Array<Movie>): Movie[] {
  const regex = /,/
  const hasComma = regex.test(genre)

  const query = hasComma ? genre.split(',') : genre
  const [firstListedGenre] = query

  if (firstListedGenre === undefined) {
    return []
  } else {
    const filteredMovies = allMovies.filter(
      ({ imdbID, Genre }) => imdbID !== activeMovie && Genre.toLowerCase().includes(firstListedGenre.toLowerCase())
    )
    return tenRandomMovies(filteredMovies)
  }
}

export function RelatedMovies({ genre, activeMovie, allMovies }: RelatedMoviesProps) {
  const relatedMovies = getRelatedMovies(activeMovie, genre, allMovies)
  return <MovieList movies={relatedMovies} />
}
