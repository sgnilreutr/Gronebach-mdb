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

const Loading = () => (
  <div
    style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <p>{global.LOADING}</p>
  </div>
)

const RoutesHandeler = () => (
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

export default RoutesHandeler
