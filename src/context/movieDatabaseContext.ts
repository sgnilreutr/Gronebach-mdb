import { createContext } from 'react'

import type { IMovie } from '../data/dataTypes'

export interface IMovieContext {
  movies: Array<IMovie>
}

export const defaultState: IMovieContext = Object.freeze({
  movies: [],
})

const MovieDatabaseContext = createContext(defaultState)

export const MovieProvider = MovieDatabaseContext.Provider

export default MovieDatabaseContext
