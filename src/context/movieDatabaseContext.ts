import React from 'react'
import { IMovie } from '../data/api'

interface IMovieContext {
  movies: IMovie[]
}

const defaultState: IMovieContext = Object.freeze({
  movies: [],
})

const MovieDatabaseContext: any = React.createContext(defaultState)

export const MovieProvider = MovieDatabaseContext.Provider

export default MovieDatabaseContext
