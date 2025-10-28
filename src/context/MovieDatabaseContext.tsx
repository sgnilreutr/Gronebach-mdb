import { type Dispatch, type ReactNode, type SetStateAction, createContext, useEffect, useMemo, useState } from 'react'

import type { Movie } from '../data/dataTypes'
import { createApiClient } from '../data/api'
import type { MovieCategoryOptions } from '../constants/globalConstants'
import type { CategoryOptions } from '../components/Header/HeaderOptions'

interface MovieDatabaseContextHandelers {
  setActiveCategory: Dispatch<SetStateAction<CategoryOptions>>
  setAllMovies: Dispatch<SetStateAction<Array<Movie>>>
  setOverviewQuery: Dispatch<SetStateAction<MovieCategoryOptions | null>>
  setSearchTerm: Dispatch<SetStateAction<string>>
}

// TODO: Narrow down the category type
interface MovieDatabaseContextData {
  activeCategory: CategoryOptions
  allMovies: Array<Movie>
  overviewQuery: MovieCategoryOptions | null
  searchTerm: string
}

export type MovieDatabaseContextProps = MovieDatabaseContextData & MovieDatabaseContextHandelers

export const defaultState: MovieDatabaseContextData = {
  activeCategory: '',
  allMovies: [],
  overviewQuery: null,
  searchTerm: '',
}

export const MovieDatabaseContext = createContext({} as MovieDatabaseContextProps)

interface MovieProviderProps {
  children: ReactNode
}

export function MovieProvider({ children }: MovieProviderProps) {
  const [allMovies, setAllMovies] = useState<MovieDatabaseContextProps['allMovies']>(defaultState.allMovies)
  const [activeCategory, setActiveCategory] = useState<MovieDatabaseContextProps['activeCategory']>(
    defaultState.activeCategory
  )
  const [overviewQuery, setOverviewQuery] = useState<MovieDatabaseContextProps['overviewQuery']>(
    defaultState.overviewQuery
  )
  const [searchTerm, setSearchTerm] = useState<MovieDatabaseContextProps['searchTerm']>(defaultState.searchTerm)

  useEffect(() => {
    const fetchData = async () => {
      const movies = await createApiClient().getMovies()
      if (!movies.length) {
        return
      }
      setAllMovies(movies)
    }
    fetchData()
  }, [])

  const contextValue = useMemo(
    () => ({
      activeCategory,
      allMovies,
      overviewQuery,
      searchTerm,
      setActiveCategory,
      setAllMovies,
      setOverviewQuery,
      setSearchTerm,
    }),
    [activeCategory, allMovies, overviewQuery, searchTerm]
  )

  return <MovieDatabaseContext.Provider value={contextValue}>{children}</MovieDatabaseContext.Provider>
}
