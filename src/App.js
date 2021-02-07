import React from 'react'
import './App.scss'
// import MovieList from './components/MovieList'
import MovieOverview from './components/MovieOverview'
import MovieDetail from './components/MovieDetail'
import MissingTitles from './components/MissingTitles'
import PageNotFound from './components/PageNotFound'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Homepage from './components/Homepage'
import Search from './components/Search'

function App() {
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
