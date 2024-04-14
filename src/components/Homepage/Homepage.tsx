import { useContext } from 'react'

import './Homepage.scss'
import * as global from '../../constants/globalConstants'
import { MovieDatabaseContext } from '../../context/movieDatabaseContext'
import type { MovieContext } from '../../context/movieDatabaseContext'
import { Overviewheader } from '../Header/OverviewHeader'
import { MobileMenu } from '../MobileMenu/mobileMenu'
import { HomepageCategory } from './HomepageCategory'

const NOTHING_TO_SHOW = 'Nothing to show'

interface CategoryHomepageProps {
  movies: MovieContext['movies']
}

const CategoryHomepage = ({ movies }: CategoryHomepageProps) => (
  <div>
    {global.MOVIE_CATEGORIES.map(({ name, filter }) => (
      <HomepageCategory
        categoryFilter={filter}
        categoryName={name}
        key={name}
        movies={movies}
      />
    ))}
  </div>
)

export default function Homepage() {
  const { movies } = useContext(MovieDatabaseContext)

  return (
    <div>
      <Overviewheader />
      {movies ? (
        <CategoryHomepage movies={movies} />
      ) : (
        <h2>{NOTHING_TO_SHOW}</h2>
      )}
      <MobileMenu />
    </div>
  )
}
