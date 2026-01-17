import { Overviewheader } from '../Header/OverviewHeader'
import { MobileMenu } from '../MobileMenu/mobileMenu'
import { HomepageCategory } from './HomepageCategory'
import { MOVIE_CATEGORIES } from '../../constants/globalConstants'
import type { Movie } from '../../data/dataTypes'

export default function Homepage({ allMovies }: { allMovies: Array<Movie> }) {
  return (
    <div>
      <Overviewheader allMovies={allMovies} />
      <div className='flex flex-col gap-5'>
        {MOVIE_CATEGORIES.map(({ name, filter }) => (
          <HomepageCategory categoryFilter={filter} categoryName={name} key={name} movies={allMovies} />
        ))}
      </div>
      <MobileMenu />
    </div>
  )
}
