import axios from 'axios'
import imageFallback from '../img/placeholder-image.png';

export type Ratings = {
    Source: string,
    Value: string
}

export type MovieDetail = {
    imdbID: string,
    Title: string,
    Year: number,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Poster: string,
    imdbRating: string,
    Ratings?: Ratings,
    Type?: string
}

export type Movie = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string,
    Runtime: string,
    Genre: string,
    Actors: string,
    Country: string,
    imdbRating: string,
    Director: string,
    Rated?: string,
}

export type MovieTrailer = {
    videoUrl: string
}

export const options = {
    headers :{
        'x-api-key': process.env.REACT_APP_IMDB_API_KEY
    }
}
    
export type ApiClient = {
    getMovies: () => Promise<Movie[]>;
    getMovieTrailer: (movieId: string) => Promise<MovieTrailer>
}

export const createApiClient = (): ApiClient => {
    return {
        getMovies: () => {
            return axios.get('/all_movies_20210202_21-17-10.json')
                .then((res) => res.data)
                .catch((err) => console.log(err))
        },
        getMovieTrailer: (movieId: string) => {
            return axios.get(`https://imdb-api.com/en/API/YoutubeTrailer/k_8ao1gjen/${movieId}`, options)
                .then((res) => res.data)
                .catch((err) => console.log(err))
        }
    }
}

export function getMoviePosterUrl(Poster:string) {
  if (Poster === "N/A") {
    return imageFallback;
  }

  return `${Poster}`;
}