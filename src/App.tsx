import React, { useEffect, useState } from 'react'
import './App.scss'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { createApiClient, Movie } from './data/api'
import MovieOverview from './components/MovieOverview/MovieOverview'
import MovieDetail from './components/MovieDetail/MovieDetail'
import MissingTitles from './components/MissingTitles/MissingTitles'
import PageNotFound from './components/PageNotFound'
import Homepage from './components/Homepage/Homepage'
import Search from './components/Search/Search'
import { MovieProvider } from './context/movieDatabaseContext'

const App = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([])

  const fetchData = async () => {
    try {
      const json = localStorage.getItem('movies')
      if (json) {
        const allMoviesLocalstorage = JSON.parse(json)
        if (allMoviesLocalstorage && allMoviesLocalstorage.length > 0) {
          setAllMovies(allMoviesLocalstorage)
        }
      } else {
        const movies = await createApiClient().getMovies()
        if (movies.length > 0) {
          const moviesLocalstorage = JSON.stringify(movies)
          localStorage.setItem('movies', moviesLocalstorage)
          setAllMovies(movies)
        }
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
        <div className="App">
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/overview/*" component={MovieOverview} />
            <Route path="/item/:movieID" component={MovieDetail} />
            <Route path="/missing" component={MissingTitles} />
            <Route path="/search" component={Search} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </MovieProvider>
  )
}

export default App
