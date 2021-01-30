import React from 'react'
import './App.scss'
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'
import PageNotFound from './components/PageNotFound'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact={true} component={MovieList} />
          <Route path="/item/:movieID" component={MovieDetail} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
