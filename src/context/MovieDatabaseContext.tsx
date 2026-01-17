import { type Dispatch, type ReactNode, type SetStateAction, createContext, useEffect, useState } from 'react'

import type { Movie } from '../data/dataTypes'
import { createApiClient } from '../data/api'
import {
  GENERIC_LOADING_STATES,
  type GenericLoadingState,
  type MovieCategoryOptions,
} from '../constants/globalConstants'
import type { CategoryOptions } from '../components/Header/HeaderOptions'

interface MovieDatabaseContextHandelers {
  setMovieDatabaseContextData: Dispatch<SetStateAction<MovieDatabaseContextData>>
}

interface UserInteractions {
  activeCategory: CategoryOptions
  overviewQuery: MovieCategoryOptions | null
  searchTerm: string
}

export type MovieDatabaseData =
  | {
      movieDatabaseLoadingState: GenericLoadingState & 'idle'
      allMovies: null
    }
  | {
      movieDatabaseLoadingState: GenericLoadingState & 'pending'
      allMovies: null
    }
  | {
      movieDatabaseLoadingState: GenericLoadingState & 'error'
      allMovies: null
    }
  | {
      movieDatabaseLoadingState: GenericLoadingState & 'success'
      allMovies: Array<Movie>
    }

type MovieDatabaseContextData = MovieDatabaseData & UserInteractions

type MovieDatabaseContextProps = MovieDatabaseContextData & MovieDatabaseContextHandelers

const defaultState: MovieDatabaseContextData = {
  movieDatabaseLoadingState: 'idle',
  activeCategory: '',
  allMovies: null,
  overviewQuery: null,
  searchTerm: '',
}

export const MovieDatabaseContext = createContext({} as MovieDatabaseContextProps)

interface MovieProviderProps {
  children: ReactNode
}

export function MovieProvider({ children }: MovieProviderProps) {
  const [movieDatabaseContextData, setMovieDatabaseContextData] = useState<MovieDatabaseContextData>(defaultState)

  useEffect(() => {
    const fetchData = async () => {
      setMovieDatabaseContextData((prevState) => ({
        ...prevState,
        movieDatabaseLoadingState: GENERIC_LOADING_STATES.pending,
        allMovies: null,
      }))
      const movies = await createApiClient().getMovies()
      if (movies === null || movies.length === 0) {
        setMovieDatabaseContextData((prevState) => ({
          ...prevState,
          movieDatabaseLoadingState: GENERIC_LOADING_STATES.error,
          allMovies: null,
        }))
        return
      }
      setMovieDatabaseContextData((prevState) => ({
        ...prevState,
        movieDatabaseLoadingState: GENERIC_LOADING_STATES.success,
        allMovies: movies,
      }))
    }
    void fetchData()
  }, [])

  return (
    <MovieDatabaseContext.Provider value={{ ...movieDatabaseContextData, setMovieDatabaseContextData }}>
      {children}
    </MovieDatabaseContext.Provider>
  )
}
