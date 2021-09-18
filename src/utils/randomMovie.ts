import { MovieSearch } from '../data/api'

export const randomMovie = (movies: MovieSearch[]) => {
  const randomNumber = Math.floor(Math.random() * (movies.length - 1)) + 1
  //   movies[randomNumber]
  console.log(movies[randomNumber])
}

//  Make it only loop for 10 times
//  Make it take out the movie from the pool of possibilties once it is taken
export const tenRandomMovies = (movies: MovieSearch[]) => {
  if (movies.length > 10) {
    const movieListBuffer = []
    for (let count = 0; count < 10; count += 1) {
      const randomNumber = Math.floor(Math.random() * (movies.length - 1)) + 1
      movieListBuffer.push(movies[randomNumber])
      // eslint-disable-next-line no-param-reassign
      movies.splice(randomNumber, 1)
    }
    return movieListBuffer
  }
  return movies
}
