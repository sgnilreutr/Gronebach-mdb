import { lazy, Suspense } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { COULD_NOT_LOAD, LOADING } from './constants/globalConstants'
import { ROUTES } from './constants/routeConstants'
import { Layout } from './components/Layout'
import { useContext } from 'react'
import { MovieDatabaseContext } from './context/MovieDatabaseContext'

const Homepage = lazy(() => import('./components/Homepage/Homepage'))
const MovieOverview = lazy(() => import('./components/MovieOverview/MovieOverview'))
const MovieDetail = lazy(() => import('./components/MovieDetail/MovieDetail'))
const MissingTitles = lazy(() => import('./components/MissingTitles/MissingTitles'))
const PageNotFound = lazy(() => import('./components/PageNotFound'))
const Search = lazy(() => import('./components/Search/Search'))
const RandomMovieIntro = lazy(() => import('./components/RandomMovieIntro/randomMovieIntro'))

function PendingLoadingState() {
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

function ErrorLoadingState() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        width: '100%',
      }}>
      <p>{COULD_NOT_LOAD}</p>
    </div>
  )
}

export function RoutesHandeler() {
  const { allMovies, movieDatabaseLoadingState } = useContext(MovieDatabaseContext)

  if (movieDatabaseLoadingState === 'idle' || movieDatabaseLoadingState === 'pending') {
    return <PendingLoadingState />
  } else if (movieDatabaseLoadingState === 'error') {
    return <ErrorLoadingState />
  } else {
    return (
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PendingLoadingState />}>
            <Routes>
              <Route path={ROUTES.homepage} element={<Homepage allMovies={allMovies} />} />
              <Route path={ROUTES.overview} element={<MovieOverview allMovies={allMovies} />} />
              <Route path={ROUTES.item} element={<MovieDetail allMovies={allMovies} />} />
              <Route path={ROUTES.missing} element={<MissingTitles allMovies={allMovies} />} />
              <Route path={ROUTES.search} element={<Search allMovies={allMovies} />} />
              <Route path={ROUTES.random} element={<RandomMovieIntro />} />
              <Route path={ROUTES.notFound} element={<PageNotFound allMovies={allMovies} />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    )
  }
}
