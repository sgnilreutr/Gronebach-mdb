import React, { useEffect, useState } from 'react'
import './App.scss'
import { createApiClient, IMovie } from './data/api'
import { MovieProvider } from './context/movieDatabaseContext'
import * as global from './constants/globalConstants'
import Routes from './routes'

const App = () => {
  const [allMovies, setAllMovies] = useState<IMovie[]>([])

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
        if (
          allMoviesLocalstorage &&
          allMoviesLocalstorage.length === global.NUMBER_OF_FILES
        ) {
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
      <div className="App" id="App">
        <Routes />
      </div>
    </MovieProvider>
  )
}

export default App
