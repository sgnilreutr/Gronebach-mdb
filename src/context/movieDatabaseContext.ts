import React from 'react'
import { Movie } from '../data/api'

interface IMovieContext {
  movies: Movie[]
}

const defaultState: IMovieContext = Object.freeze({
  movies: [],
})

const MovieDatabaseContext: any = React.createContext(defaultState)

export const MovieProvider = MovieDatabaseContext.Provider

export default MovieDatabaseContext
