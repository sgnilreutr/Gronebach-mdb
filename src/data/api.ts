import axios from 'axios'
import imageFallback from '../img/placeholder-image.png'

export interface IRatings {
  Source: string
  Value: string
}

export interface IMovieDetail {
  imdbID: string
  Title: string
  Year: number
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  imdbRating: string
  Ratings?: IRatings
}

export interface IMovie {
  Title: string
  Year?: string
  imdbID: string
  Type: string
  Poster: string
  Runtime?: string
  Genre: string
  Actors?: string
  Country?: string
  imdbRating?: string
  Director?: string
  Rated?: string
}

export interface IMovieSearch {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Runtime: string
  Genre: string
  Actors: string
  Country: string
  imdbRating: string
  Director: string
  Rated?: string
}

export interface IMovieTrailer {
  videoUrl: string
}

export const options = {
  headers: {
    'x-api-key': process.env.REACT_APP_IMDB_API_KEY!,
  },
}

export type ApiClient = {
  getMovies: () => Promise<IMovie[]>
  getMovieTrailer: (movieId: string) => Promise<IMovieTrailer>
}

export const createApiClient = (): ApiClient => ({
  getMovies: async () => {
    try {
      const response = await axios.get('/all_movies_20220120_08-40-36.json')
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
