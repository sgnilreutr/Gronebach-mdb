import React, { useEffect, useRef, useState } from 'react'
import './MovieList.scss'

import { Movie } from '../data/api'
import { useSelector } from 'react-redux'

import MovieListItem from './MovieListItem'
import { Link } from 'react-router-dom'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import styled from 'styled-components'
// import Slider from 'react-slick'

interface Props {
  movies: any
}

const selectCategory = (state: any) => state.category

const MovieList: React.FC<Props> = ({ movies }) => {
  const category = useSelector(selectCategory)
  const [menuItems, setMenuItems] = useState<any>([])
  const [filteredMovies, setFilteredMovies] = useState<any>([])
  const isMountedRef = useRef<any>(null);

  useEffect(() => {
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

  const Arrow = ({ icon, className }: { icon: {}, className: string }) => {
    return (
      <div
        className={className}
      >{icon}</div>
    );
  };

  const ArrowLeft = Arrow({ icon: <FaChevronLeft size={30} />, className: 'arrow-global arrow-prev' });
  const ArrowRight = Arrow({ icon: <FaChevronRight size={30} />, className: 'arrow-global arrow-next' });

  // Create menu from items
  useEffect(() => {
    isMountedRef.current = true;
    if (filteredMovies) setMenuItems(Menu(filteredMovies))
    return () => { isMountedRef.current = false; }
  }, [filteredMovies])

  const renderMovies = (filteredMovies: Movie[]) => {
    return (
      <div>
        {filteredMovies.length > 0 ? (
          window.innerWidth >= 416 ? (
            <ScrollMenu
              data={menuItems}
              arrowLeft={ArrowLeft}
              arrowRight={ArrowRight}
              wheel={false}
            />) : (
              <div className="movie-horizontal-grid">
                <div className="hs hs-scroll">
                  {filteredMovies.map((movie) => (
                    <MovieListItem
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
                  ))}
                </div>
              </div>
            )) : (
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
