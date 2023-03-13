import { useContext } from 'react'

import './Homepage.scss'
import * as global from '../../constants/globalConstants'
import MovieDatabaseContext from '../../context/movieDatabaseContext'
import Overviewheader from '../Header/OverviewHeader'
import MobileMenu from '../MobileMenu/mobileMenu'
import HomepageCategory from './HomepageCategory'

const NOTHING_TO_SHOW = 'Nothing to show'

const Homepage = () => {
  const { movies } = useContext(MovieDatabaseContext)

  const categoryHomepage = () => (
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

  return (
    <div>
      <Overviewheader />
      {movies ? categoryHomepage() : <h2>{NOTHING_TO_SHOW}</h2>}
      <MobileMenu />
    </div>
  )
}

export default Homepage
