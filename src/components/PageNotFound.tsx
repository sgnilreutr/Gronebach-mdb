import type { Movie } from '../data/dataTypes'
import { DetailHeader } from './Header/DetailHeader'

const NOT_FOUND = 'Uh, oh! Deze pagina bestaat niet.'

export default function PageNotFound({ allMovies }: { allMovies: Array<Movie> }) {
  return (
    <div>
      <DetailHeader allMovies={allMovies} />
      <h1>{NOT_FOUND}</h1>
    </div>
  )
}
