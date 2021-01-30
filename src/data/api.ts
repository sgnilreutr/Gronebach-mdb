import axios from 'axios'

// Simple fix, will have to recheck
// export type SearchParams = {
//     Query?: string
// }

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
    Poster: string
}

export const options = {
      headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
      },
}
    
export type ApiClient = {
    getMovies: () => Promise<Movie[]>;
    getMovieDetail: (movieId: string) => Promise<MovieDetail>;
}

export const createApiClient = (): ApiClient => {
    return {
        getMovies: () => {
            return axios.get('all_movies_20210124_19-44-53.json')
                .then((res) => res.data)
                .catch((err) => console.log(err))
        },
        getMovieDetail: (movieId: string) => {
            return axios.get(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${movieId}&r=json`, options)
                .then((res) => res.data)
                .catch((err) => console.log(err))
        }
    }
}