import axios from 'axios'

import type { Movie } from './dataTypes'

export type ApiClient = {
  getMovies: () => Promise<Array<Movie>> | null
}

export const createApiClient = (): ApiClient => ({
  getMovies: async () => {
    try {
      const response = await axios.get('/all_movies_20230318_11-52-08-filtered.json')
      return response.data
    } catch {
      return null
    }
  },
})

export function getMoviePosterUrl(poster: string): string | undefined {
  if (poster === 'N/A') {
    return undefined
  }
  return poster
}
