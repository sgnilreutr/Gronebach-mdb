import { useContext } from 'react'

import './Homepage.scss'
import { MovieDatabaseContext } from '../../context/MovieDatabaseContext'
import { Overviewheader } from '../Header/OverviewHeader'
import { MobileMenu } from '../MobileMenu/mobileMenu'
import { HomepageCategory } from './HomepageCategory'
import { MOVIE_CATEGORIES } from '../../constants/globalConstants'

const NOTHING_TO_SHOW = 'Nothing to show'

export default function Homepage() {
  const { allMovies } = useContext(MovieDatabaseContext)

  return (
    <div>
      <Overviewheader />
      {allMovies ? (
        <div>
          {MOVIE_CATEGORIES.map(({ name, filter }) => (
            <HomepageCategory
              categoryFilter={filter}
              categoryName={name}
              key={name}
              movies={allMovies}
            />
          ))}
        </div>
      ) : (
        <h2>{NOTHING_TO_SHOW}</h2>
      )}
      <MobileMenu />
    </div>
  )
}
