import { lazy, Suspense } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { LOADING } from './constants/globalConstants'
import { ROUTES } from './constants/routeConstants'
import { Layout } from './components/Layout'

const Homepage = lazy(() => import('./components/Homepage/Homepage'))
const MovieOverview = lazy(() => import('./components/MovieOverview/MovieOverview'))
const MovieDetail = lazy(() => import('./components/MovieDetail/MovieDetail'))
const MissingTitles = lazy(() => import('./components/MissingTitles/MissingTitles'))
const PageNotFound = lazy(() => import('./components/PageNotFound'))
const Search = lazy(() => import('./components/Search/Search'))
const RandomMovieIntro = lazy(() => import('./components/RandomMovieIntro/randomMovieIntro'))

function Loading() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        width: '100%',
      }}>
      <p>{LOADING}</p>
    </div>
  )
}

export function RoutesHandeler() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={ROUTES.homepage} element={<Homepage />} />
            <Route path={ROUTES.overview} element={<MovieOverview />} />
            <Route path={ROUTES.item} element={<MovieDetail />} />
            <Route path={ROUTES.missing} element={<MissingTitles />} />
            <Route path={ROUTES.search} element={<Search />} />
            <Route path={ROUTES.random} element={<RandomMovieIntro />} />
            <Route path={ROUTES.notFound} element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
