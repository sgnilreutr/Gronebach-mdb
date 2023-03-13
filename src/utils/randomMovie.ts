import type { IMovie } from '../data/dataTypes'

export const randomMovie = (movies: Array<IMovie>) => {
  const randomNumber = Math.floor(Math.random() * (movies.length - 1)) + 1
  return movies[randomNumber]
}

//  It takes out the movie from the pool of possibilties once it is taken
export const tenRandomMovies = (movies: Array<IMovie>) => {
  const movieProp = movies
  if (movieProp.length > 10) {
    const movieListBuffer: Array<IMovie> = []
    for (let count = 0; count < 10; count += 1) {
      const randomNumber = Math.floor(Math.random() * (movies.length - 1)) + 1
      const selectedMovie = movieProp[randomNumber]
      if (selectedMovie) {
        movieListBuffer.push(selectedMovie)
        movieProp.splice(randomNumber, 1)
      }
    }
    return movieListBuffer
  }
  return movies
}
