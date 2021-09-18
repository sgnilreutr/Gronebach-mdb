import { MovieSearch } from '../data/api'

export const randomMovie = (movies: MovieSearch[]) => {
  const randomNumber = Math.floor(Math.random() * (movies.length - 1)) + 1
  //   movies[randomNumber]
  console.log(movies[randomNumber])
}

//  Make it only loop for 10 times
//  Make it take out the movie from the pool of possibilties once it is taken
export const tenRandomMovies = (movies: MovieSearch[]) => {
  const movieProp = movies
  if (movieProp.length > 10) {
    const movieListBuffer = []
    for (let count = 0; count < 10; count += 1) {
      const randomNumber = Math.floor(Math.random() * (movies.length - 1)) + 1
      movieListBuffer.push(movieProp[randomNumber])
      movieProp.splice(randomNumber, 1)
    }
    return movieListBuffer
  }
  return movies
}
