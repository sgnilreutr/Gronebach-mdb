import axios from 'axios'

import imageFallback from '../img/placeholder-image.png'
import type { IMovie, IMovieTrailer } from './dataTypes'

export const options = {
  headers: {
    'x-api-key': process.env.REACT_APP_IMDB_API_KEY!,
  },
}

export type ApiClient = {
  getMovies: () => Promise<Array<IMovie>>
  getMovieTrailer: (movieId: string) => Promise<IMovieTrailer>
}

export const createApiClient = (): ApiClient => ({
  getMovies: async () => {
    try {
      const response = await axios.get('/all_movies_20220129_16-09-28.json')
      return response.data
    } catch (err) {
      console.error(err)
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
      console.error(err)
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
