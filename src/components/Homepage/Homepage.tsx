import React, { useContext } from 'react'
import './Homepage.scss'
import Overviewheader from '../Header/OverviewHeader'
import HomepageCategory from './HomepageCategory'
// import { Movie } from '../../data/api'
import * as global from '../../constants/globalConstants'
import MovieDatabaseContext from '../../context/movieDatabaseContext'

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
    <div style={{ marginBottom: '6rem' }}>
      <Overviewheader />
      {allMovieList ? categoryHomepage() : <h2>{NOTHING_TO_SHOW}</h2>}
    </div>
  )
}

export default Homepage
