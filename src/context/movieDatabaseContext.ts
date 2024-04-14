import { createContext } from 'react'

import type { Movie } from '../data/dataTypes'

export interface MovieContext {
  movies: Array<Movie>
}

export const defaultState: MovieContext = Object.freeze({
  movies: [],
})

export const MovieDatabaseContext = createContext(defaultState)

export const MovieProvider = MovieDatabaseContext.Provider
