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

function getMaxItemsAmountPerRow(width: any) {
  return Math.max(Math.floor(width / ITEM_WIDTH), 1);
}

const MovieList: React.FC<Props> = ({ movies }) => {
  const category = useSelector(selectCategory)
  const height = window.innerHeight;
  const width = 0.85 * window.innerWidth;

  // const ColumnItem = memo(function ColumnItem(movie: MovieDetail) {
  function ColumnItem(movie: any) {
    return (
      <div key={movie.imdbID}>
        <MovieListItem
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
      </div>
    )
  };

  const renderMovies = ({ style, index }: { style: any, index: number }) => {
    const filteredMovies = movies.filter((movie: any) =>
      movie.Type.toLowerCase().includes(category.toLowerCase())
    )

    // const maxItemsPerRow = getMaxItemsAmountPerRow(width); console.log(maxItemsPerRow)
    const maxItemsPerRow = 4; console.log(maxItemsPerRow)
    const moviesIds = generateIndexesForRow(index, maxItemsPerRow, movies.length).map(movieIndex => movies[movieIndex]);

    return (
      <div style={style}>
        {moviesIds.map((movie: any, index: any) => (
          <ColumnItem key={movie.imdbID} movie={movie} />
        ))}
      </div>
    )
  }

  return (
    <>
      {/* <div>{movies ? renderMovies(movies) : <h2>Loading...</h2>}</div> */}
      <List
        // height={height}
        height={400}
        itemCount={movies.length}
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