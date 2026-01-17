import { Link } from 'react-router-dom'

import type { Movie } from '../../data/dataTypes'
import { MovieListItem } from './MovieListItem'
import { NO_ITEMS, LINK_MISSING_TITLE, LOADING } from '../../constants/globalConstants'
import { ScrollMenu } from './ScrollMenu'

interface MovieListProps {
  movies: Array<Movie>
}

export function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return <h2>{LOADING}</h2>
  } else if (movies.length < 1) {
    return (
      <div>
        <p>{NO_ITEMS}</p>
        <Link to='/missing'>{LINK_MISSING_TITLE}</Link>
      </div>
    )
  } else {
    return (
      <ScrollMenu>
        {movies.map(({ Title, imdbID, Poster }) => (
          <MovieListItem
            key={imdbID}
            movieInfo={{
              Title,
              imdbID,
              Poster,
            }}
          />
        ))}
      </ScrollMenu>
    )
  }
}
