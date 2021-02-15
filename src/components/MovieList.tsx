import React, { useRef } from 'react'
import './MovieList.scss'

import { Movie } from '../data/api'
import { useSelector } from 'react-redux'

import MovieListItem from './MovieListItem'
import { Link } from 'react-router-dom'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  movies: any
}

const selectCategory = (state: any) => state.category

const MovieList: React.FC<Props> = ({ movies }) => {
  const category = useSelector(selectCategory)
  const [menuItems, setMenuItems] = React.useState<any>([])
  const [filteredMovies, setFilteredMovies] = React.useState<any>([])
  const isMountedRef = useRef<any>(null);

  React.useEffect(() => {
    const filteredMovies = movies.filter((movie: any) =>
      movie.Type.toLowerCase().includes(category.toLowerCase())
    )
    setFilteredMovies(filteredMovies)
  }, [category, movies])

  const Menu = (filteredMovies: any) =>
    filteredMovies.map((movie: any) => {
      return <MovieListItem
        key={movie.imdbID}
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
    });

  const Arrow = ({ text, className }: { text: any, className: string }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };

  const ArrowLeft = Arrow({ text: <FaChevronLeft size={30} />, className: 'arrow-global arrow-prev' });
  const ArrowRight = Arrow({ text: <FaChevronRight size={30} />, className: 'arrow-global arrow-next' });

  // Create menu from items
  React.useEffect(() => {
    isMountedRef.current = true;
    if (filteredMovies) setMenuItems(Menu(filteredMovies))
    return () => { isMountedRef.current = false; }
  }, [filteredMovies])

  const renderMovies = (movies: Movie[]) => {
    return (
      <div>
        {
          movies.length > 0 ? (
            <ScrollMenu
              data={menuItems}
              arrowLeft={ArrowLeft}
              arrowRight={ArrowRight}
              wheel={false}
            />
          ) : (
              <div>
                <p>Geen items gevonden.</p>
                <Link to="/missing">Controleer de ontbrekende titels</Link>
              </div>
            )}
      </div>
    )
  }

  return <div>{movies ? renderMovies(movies) : <h2>Loading...</h2>}</div>
}

export default MovieList
