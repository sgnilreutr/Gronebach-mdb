import axios from 'axios'
import imageFallback from '../img/placeholder-image.png'

export type Ratings = {
  Source: string
  Value: string
}

export type MovieDetail = {
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
  Ratings?: Ratings
}

export type Movie = {
  Title: string
  Year?: string
  imdbID: string
  Type?: string
  Poster: string
  Runtime?: string
  Genre: string
  Actors?: string
  Country?: string
  imdbRating?: string
  Director?: string
  Rated?: string
}

export type MovieSearch = {
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

export type MovieTrailer = {
  videoUrl: string
}

export const options = {
  headers: {
    'x-api-key': process.env.REACT_APP_IMDB_API_KEY,
  },
}

export type ApiClient = {
  getMovies: () => Promise<Movie[]>
  getMovieTrailer: (movieId: string) => Promise<MovieTrailer>
}

export const createApiClient = (): ApiClient => ({
  getMovies: async () => {
    try {
      const response = await axios.get('/all_movies_20210202_21-17-10.json')
      return response.data
    } catch (err) {
      return console.error(err)
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
      return console.error(err)
    }
  },
})

export function getMoviePosterUrl(Poster: string) {
  if (Poster === 'N/A') {
    return imageFallback
  }

  return `${Poster}`
}
