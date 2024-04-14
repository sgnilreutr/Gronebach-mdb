import { lazy, Suspense } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import * as global from './constants/globalConstants'

const Homepage = lazy(() => import('./components/Homepage/Homepage'))
const MovieOverview = lazy(
  () => import('./components/MovieOverview/MovieOverview')
)
const MovieDetail = lazy(() => import('./components/MovieDetail/MovieDetail'))
const MissingTitles = lazy(
  () => import('./components/MissingTitles/MissingTitles')
)
const PageNotFound = lazy(() => import('./components/PageNotFound'))
const Search = lazy(() => import('./components/Search/Search'))
const RandomMovieIntro = lazy(
  () => import('./components/RandomMovieIntro/randomMovieIntro')
)

function Loading() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <p>{global.LOADING}</p>
    </div>
  )
}

export function RoutesHandeler() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/overview/*" element={<MovieOverview />} />
          <Route path="/item/:movieID" element={<MovieDetail />} />
          <Route path="/missing" element={<MissingTitles />} />
          <Route path="/search" element={<Search />} />
          <Route path="/random/:movieID" element={<RandomMovieIntro />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
