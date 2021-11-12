import React, { lazy, Suspense, useEffect, useState } from 'react'
import './App.scss'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { createApiClient, Movie } from './data/api'
import { MovieProvider } from './context/movieDatabaseContext'
import * as global from './constants/globalConstants'

const Homepage = lazy(() => import('./components/Homepage/Homepage'))
const MovieOverview = lazy(() => import('./components/MovieOverview/MovieOverview'))
const MovieDetail = lazy(() => import('./components/MovieDetail/MovieDetail'))
const MissingTitles = lazy(() => import('./components/MissingTitles/MissingTitles'))
const PageNotFound = lazy(() => import('./components/PageNotFound'))
const Search = lazy(() => import('./components/Search/Search'))
const RandomMovieIntro = lazy(() => import('./components/RandomMovieIntro/randomMovieIntro'))

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

const App = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([])

  const setLocalStorage = async () => {
    const movies = await createApiClient().getMovies()
    if (movies.length > 0) {
      const moviesLocalstorage = JSON.stringify(movies)
      localStorage.setItem('movies', moviesLocalstorage)
      setAllMovies(movies)
    }
  }

  const fetchData = async () => {
    try {
      const json = localStorage.getItem('movies')
      if (json) {
        const allMoviesLocalstorage = await JSON.parse(json)
        if (allMoviesLocalstorage && allMoviesLocalstorage.length === global.NUMBER_OF_FILES) {
          setAllMovies(allMoviesLocalstorage)
        } else {
          setLocalStorage()
        }
      } else {
        setLocalStorage()
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Load in all movies and store it in the localstorage
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <MovieProvider value={allMovies}>
      <Router>
        <div className="App" id="App">
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/overview/*" component={MovieOverview} />
              <Route path="/item/:movieID" component={MovieDetail} />
              <Route path="/missing" component={MissingTitles} />
              <Route path="/search" component={Search} />
              <Route path="/random/:movieID" component={RandomMovieIntro} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </MovieProvider>
  )
}

export default App
