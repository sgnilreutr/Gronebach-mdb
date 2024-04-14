import { useEffect, useState } from 'react'

import './App.scss'
import * as global from './constants/globalConstants'
import {
  defaultState,
  IMovieContext,
  MovieProvider,
} from './context/movieDatabaseContext'
import { createApiClient } from './data/api'
import Routes from './routes'

const App = () => {
  const [allMovies, setAllMovies] = useState<IMovieContext>(defaultState)

  // Load in all movies and store it in the localstorage
  useEffect(() => {
    const setLocalStorage = async () => {
      const movies = await createApiClient().getMovies()
      if (movies.length > 0) {
        const moviesLocalstorage = JSON.stringify(movies)
        localStorage.setItem('movies', moviesLocalstorage)
        setAllMovies({ movies })
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
