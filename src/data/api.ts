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
    Ratings?: Ratings
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
    Director: string
}

export type MovieTrailer = {
    videoUrl: string
}

export const options = {
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST
      }
}

export const requestOptions = {
    headers :{
        'x-api-key': process.env.REACT_APP_IMDB_API_KEY
    }
}
    
export type ApiClient = {
    getMovies: () => Promise<Movie[]>;
    getMovieDetail: (movieId: string) => Promise<MovieDetail>;
    getMovieTrailer: (movieId: string) => Promise<MovieTrailer>
}

export const createApiClient = (): ApiClient => {
    return {
        getMovies: () => {
            // return axios.get('all_movies_20210202_21-17-10.json')
            return axios.get('movie-json.json')
                .then((res) => res.data)
                .catch((err) => console.log(err))
        },
        getMovieDetail: (movieId: string) => {
            return axios.get(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${movieId}&r=json`, options)
                .then((res) => res.data)
                .catch((err) => console.log(err))
        },
        getMovieTrailer: (movieId: string) => {
            return axios.get(`https://imdb-api.com/en/API/YoutubeTrailer/k_8ao1gjen/${movieId}`, requestOptions)
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