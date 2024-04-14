import type { Movie } from '../data/dataTypes'

export const randomMovie = (movies: Array<Movie>) => {
  const randomNumber = Math.floor(Math.random() * (movies.length - 1)) + 1
  return movies[randomNumber]
}

//  It takes out the movie from the pool of possibilties once it is taken
export const tenRandomMovies = (movies: Array<Movie>) => {
  const copyMovies = [...movies]
  if (movies.length <= 10) {
    return movies
  }
  const movieListBuffer: Array<Movie> = []
  for (let count = 0; count < 10; count += 1) {
    const randomNumber = Math.floor(Math.random() * (movies.length - 1)) + 1
    const selectedMovie = copyMovies[randomNumber]
    if (selectedMovie) {
      movieListBuffer.push(selectedMovie)
      copyMovies.splice(randomNumber, 1)
    }
  }
  return movieListBuffer
}
