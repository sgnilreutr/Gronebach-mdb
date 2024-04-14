import axios from 'axios'

import imageFallback from '../img/placeholder-image.png'
import type { Movie, MovieTrailer } from './dataTypes'

export const options = {
  headers: {
    'x-api-key': import.meta.env.REACT_APP_IMDB_API_KEY!,
  },
}

export type ApiClient = {
  getMovies: () => Promise<Array<Movie>>
  getMovieTrailer: (movieId: string) => Promise<MovieTrailer>
}

export const createApiClient = (): ApiClient => ({
  getMovies: async () => {
    try {
      const response = await axios.get(
        '/all_movies_20230318_11-52-08-filtered.json'
      )
      return response.data
    } catch (err) {
      return null
    }
  },
  getMovieTrailer: async (movieId: string) => {
    try {
      const response = await axios.get(
        `https://imdb-api.com/en/API/YoutubeTrailer/k_8ao1gjen/${movieId}`,
        options
      )
      return response.data
    } catch (err) {
      return null
    }
  },
})

export function getMoviePosterUrl(Poster: string) {
  if (Poster === 'N/A') {
    return imageFallback
  }
  return `${Poster}`
}
