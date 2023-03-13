import { useContext } from 'react'

import './Homepage.scss'
import * as global from '../../constants/globalConstants'
import MovieDatabaseContext from '../../context/movieDatabaseContext'
import Overviewheader from '../Header/OverviewHeader'
import MobileMenu from '../MobileMenu/mobileMenu'
import HomepageCategory from './HomepageCategory'

const NOTHING_TO_SHOW = 'Nothing to show'

const Homepage = () => {
  const allMovieList = useContext(MovieDatabaseContext) as any

  const categoryHomepage = () => (
    <div>
      {global.MOVIE_CATEGORIES.map((item) => {
        const { name, filter } = item
        return (
          <HomepageCategory
            movieList={allMovieList}
            categoryName={name}
            categoryFilter={filter}
            key={name}
          />
        )
      })}
    </div>
  )

  return (
    <div>
      <Overviewheader />
      {allMovieList ? categoryHomepage() : <h2>{NOTHING_TO_SHOW}</h2>}
      <MobileMenu />
    </div>
  )
}

export default Homepage
