export enum EProduction {
  G = 'G',
  Gp = 'GP',
  NA = 'N/A',
  Nc17 = 'NC-17',
  NotRated = 'Not Rated',
  PG = 'PG',
  PG13 = 'PG-13',
  R = 'R',
  Tv14 = 'TV-14',
  TvG = 'TV-G',
  TvMa = 'TV-MA',
  TvPG = 'TV-PG',
}

export enum ESource {
  InternetMovieDatabase = 'Internet Movie Database',
  Metacritic = 'Metacritic',
  RottenTomatoes = 'Rotten Tomatoes',
}

export interface IRating {
  Source: ESource
  Value: string
}

export enum EResponse {
  True = 'True',
}

export enum EType {
  Movie = 'movie',
  Series = 'series',
}

export interface IMovie {
  Title: string
  Year: string
  Rated: EProduction
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
  Type: EType
  DVD?: string
  BoxOffice?: string
  Production?: EProduction
  Website?: EProduction
  Response: Response
  totalSeasons?: string
}

export interface IMovieTrailer {
  videoUrl: string
}
