import React, { useEffect } from 'react'
import './App.scss'
import { useDispatch } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { createApiClient } from './data/api'
import MovieOverview from './components/MovieOverview/MovieOverview'
import MovieDetail from './components/MovieDetail/MovieDetail'
import MissingTitles from './components/MissingTitles/MissingTitles'
import PageNotFound from './components/PageNotFound'
import Homepage from './components/Homepage/Homepage'
import Search from './components/Search/Search'

const api = createApiClient()

function App() {
  const dispatch = useDispatch()

  // Load in all movies and store it in the localstorage
  useEffect(() => {
    const fetchData = async () => {
      const movies = JSON.stringify(await api.getMovies())
      localStorage.setItem('movies', movies || 'No movies loaded')
      dispatch({ type: 'SET_BASE_LOADED', payload: true })
    }

    fetchData()
  }, [dispatch])

  return (
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
  )
}

export default App
