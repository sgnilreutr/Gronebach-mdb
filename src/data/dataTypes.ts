type TProduction =
  | 'G'
  | 'GP'
  | 'N/A'
  | 'NC-17'
  | 'Not Rated'
  | 'PG'
  | 'PG-13'
  | 'R'
  | 'TV-14'
  | 'TV-G'
  | 'TV-MA'
  | 'TV-PG'

export type TSource =
  | 'Internet Movie Database'
  | 'Metacritic'
  | 'Rotten Tomatoes'

export interface IRating {
  Source: TSource
  Value: string
}

type TType = 'movies' | 'series'

export interface IMovie {
  Title: string
  Year: string
  Rated: TProduction
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
  Ratings: Array<IRating>
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: TType
  DVD?: string
  BoxOffice?: string
  Production?: TProduction
  Website?: TProduction
  Response: Response
  totalSeasons?: string
}

export interface IMovieTrailer {
  videoUrl: string
}
