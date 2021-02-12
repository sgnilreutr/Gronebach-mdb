import React, { useEffect } from 'react'
import './App.scss'
import MovieOverview from './components/MovieOverview'
import MovieDetail from './components/MovieDetail'
import MissingTitles from './components/MissingTitles'
import PageNotFound from './components/PageNotFound'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Homepage from './components/Homepage'
import Search from './components/Search'
import { createApiClient } from './data/api'

const api = createApiClient()

function App() {
  //Load in all movies and store it in the localstorage
  useEffect(() => {
    const fetchData = async () => {
      const movies = JSON.stringify(await api.getMovies())
      localStorage.setItem('movies', movies || 'No movies loaded')
    }

    fetchData()
  }, [])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const movies = await api.getMovies()
  //     setMovieList(movies || 'No movies loaded.')
  //   }

  //   fetchData()
  // }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact={true} component={Homepage} />
          <Route path="/overview/*" component={MovieOverview} />
          <Route path="/item/:movieID" component={MovieDetail} />
          <Route path="/missing" component={MissingTitles} />
          <Route path="/search" component={Search} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
