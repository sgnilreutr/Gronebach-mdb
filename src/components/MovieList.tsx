import React, { memo } from 'react'
import './MovieList.scss'

import { Movie, MovieDetail } from '../data/api'
import { useSelector } from 'react-redux'

import MovieListItem from './MovieListItem'
import { Link } from 'react-router-dom'

import { FixedSizeList as List } from 'react-window';

interface Props {
  movies: any
}

const selectCategory = (state: any) => state.category

const ITEM_WIDTH = 400;

function generateIndexesForRow(rowIndex: any, maxItemsPerRow: any, itemsAmount: any) {
  const result = [];
  const startIndex = rowIndex * maxItemsPerRow;

  for (let i = startIndex; i < Math.min(startIndex + maxItemsPerRow, itemsAmount); i++) {
    result.push(i);
  }

  return result;
}
// function generateIndexesForRow(rowIndex: any, itemsAmount: any) {
//   const result = [];
//   const startIndex = rowIndex;

//   for (let i = startIndex; i < Math.min(startIndex, itemsAmount); i++) {
//     result.push(i);
//   }

//   return result;
// }

function getMaxItemsAmountPerRow(width: any) {
  return Math.max(Math.floor(width / ITEM_WIDTH), 1);
}

const MovieList: React.FC<Props> = ({ movies }) => {
  const category = useSelector(selectCategory)

  // const ColumnItem = memo(function ColumnItem(movie: MovieDetail) {
  function ColumnItem(movie: any) {
    // console.log(movie.movie.Poster)
    console.log(movie)
    return (
      <div key={movie.imdbID}>
        <MovieListItem
          // key={movie.imdbID}
          movieInfo={{
            Title: `${ movie.movie.Title }`,
            Year: `${ movie.movie.Year }`,
            imdbID: `${ movie.movie.imdbID }`,
            Type: `${ movie.movie.Type }`,
            Poster: `${ movie.movie.Poster }`,
            Runtime: `${ movie.movie.Runtime }`,
            Genre: `${ movie.movie.Genre }`,
            Actors: `${ movie.movie.Actors }`,
            Country: `${ movie.movie.Country }`,
            imdbRating: `${ movie.movie.imdbRating }`,
            Director: `${ movie.movie.Director }`,
          }}
        />
        {/* <p>hey</p> */}
      </div>
    )
  };
  const height = window.innerHeight;

  const renderMovies = ({ style, index }: { style: any, index: number }) => {
    const width = 0.85 * window.innerWidth;
    const filteredMovies = movies.filter((movie: any) =>
      movie.Type.toLowerCase().includes(category.toLowerCase())
    )

    // console.log('hey', filteredMovies.map((movie: any, index: any) => (movie[index])))

    const maxItemsPerRow = getMaxItemsAmountPerRow(width);
    const moviesIds = generateIndexesForRow(index, maxItemsPerRow, movies.length).map(movieIndex => movies[movieIndex]);
    // console.log(moviesIds)
    // const Ids = movies.length.map(movieIndex => movies[movieIndex])
    // const moviesIds = generateIndexesForRow(index, movies.length).map(movieIndex => movies[movieIndex]);

    return (
      <div style={style}>
        {movies.map((movie: any, index: any) => (
          // {moviesIds.map((movie: any, index: any) => (
          <ColumnItem key={movie.imdbID} movie={movie} />
        ))}
      </div>
    )
  }

  return (
    <>
      {/* <div>{movies ? renderMovies(movies) : <h2>Loading...</h2>}</div> */}
      <List
        height={height}
        // height={800}
        itemCount={1}
        itemSize={278}
        layout="horizontal"
        width={1000}
      >
        {renderMovies}

      </List>
    </>
  )
}


export default MovieList