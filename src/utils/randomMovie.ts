import type { Movie } from '../data/dataTypes'

export const randomMovie = (movies: Array<Movie>): Movie | undefined => {
  const randomNumber = Math.floor(Math.random() * (movies.length - 1)) + 1
  return movies.at(randomNumber)
}

export const tenRandomMovies = (movies: Array<Movie>) => {
  if (movies.length <= 10) {
    return [...movies].sort(() => 0.5 - Math.random())
  }

  const pickedIndices = new Set<number>()
  const movieListBuffer: Array<Movie> = []

  while (movieListBuffer.length < 10) {
    const randomNumber = Math.floor(Math.random() * movies.length)
    if (!pickedIndices.has(randomNumber)) {
      const pickedMovie = movies[randomNumber]
      if (pickedMovie) {
        pickedIndices.add(randomNumber)
        movieListBuffer.push(pickedMovie)
      }
    }
  }

  return movieListBuffer
}
