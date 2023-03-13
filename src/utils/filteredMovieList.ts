import type { IMovie } from '../data/dataTypes'

interface IFilteredList {
  activeFilter: string | undefined
  movies: Array<IMovie>
}

export default function filteredList({ activeFilter, movies }: IFilteredList) {
  switch (activeFilter) {
    case 'kids':
      return movies.filter(({ Rated }) => Rated === 'PG' && 'G')
    case 'top':
      return movies.filter(({ imdbRating }) => parseInt(imdbRating, 10) >= 8.0)
    case 'all':
      return movies
    default:
      return movies.filter(({ Genre }) =>
        Genre.toLowerCase().includes(`${activeFilter}`)
      )
  }
}
