import React from 'react'
import './MovieList.scss'

import { Movie } from '../data/api'
import { useSelector } from 'react-redux'

import MovieListItem from './MovieListItem'
import { Link } from 'react-router-dom'

interface Props {
  movies: any
}

const selectCategory = (state: any) => state.category

const MovieList: React.FC<Props> = ({ movies }) => {
  const category = useSelector(selectCategory)


  const renderMovies = (movies: Movie[]) => {
    const filteredMovies =
      movies ? movies.filter((movie) =>
        movie.Type.toLowerCase().includes(category.toLowerCase())
      ) : []

    console.log(filteredMovies)

    return (
      <div className="scroller">
        <div className="button-left">
          {/* <button onClick={slideLeft}>{"<"}</button> */}
        </div>
        <div className="button-right" style={{ marginBottom: '2rem' }}>
          {/* <button onClick={slideRight}>{">"}</button> */}
        </div>
        <div className="movie-horizontal-grid">
          <div className="hs hs-scroll">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
                <MovieListItem
                  key={index}
                  movieInfo={{
                    Title: `${ movie.Title }`,
                    Year: `${ movie.Year }`,
                    imdbID: `${ movie.imdbID }`,
                    Type: `${ movie.Type }`,
                    Poster: `${ movie.Poster }`,
                    Runtime: `${ movie.Runtime }`,
                    Genre: `${ movie.Genre }`,
                    Actors: `${ movie.Actors }`,
                    Country: `${ movie.Country }`,
                    imdbRating: `${ movie.imdbRating }`,
                    Director: `${ movie.Director }`,
                  }}
                />
              ))
            ) : (
                <div>
                  <p>Geen items gevonden.</p>
                  <Link to="/missing">Controleer de ontbrekende titels</Link>
                </div>
              )}
          </div>
        </div>
      </div>
    )
  }

  return <div>{movies ? renderMovies(movies) : <h2>Loading...</h2>}</div>
}

export default MovieList
