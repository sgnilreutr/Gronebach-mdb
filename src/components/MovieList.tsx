import React from 'react'
import './MovieList.scss'

import { Movie } from '../data/api'
import { useSelector } from 'react-redux'

import MovieListItem from './MovieListItem'
import { Link } from 'react-router-dom'
import ScrollMenu from 'react-horizontal-scrolling-menu';

interface Props {
  movies: any
}

const list = [
  { name: 'item1' },
  { name: 'item2' },
  { name: 'item3' },
  { name: 'item4' },
  { name: 'item5' },
  { name: 'item6' },
  { name: 'item7' },
  { name: 'item8' },
  { name: 'item9' },
  { name: 'item10' },
  { name: 'item11' },
  { name: 'item12' },
  { name: 'item13' },
  { name: 'item14' },
  { name: 'item15' },
  { name: 'item16' },
  { name: 'item17' },
  { name: 'item18' }
];



// const selected = 'item1';

const selectCategory = (state: any) => state.category

const MovieList: React.FC<Props> = ({ movies }) => {
  const category = useSelector(selectCategory)
  const [selected, setSelected] = React.useState<any>({ selected: 1 })
  const [menuItems, setMenuItems] = React.useState<any>()

  // One item component
  // selected prop will be passed
  const MenuItem = ({ text, selected }: { text: any, selected: any }) => {
    return <div
      className={`menu-item ${ selected ? 'active' : '' }`}
    >{text}</div>;
  };

  // All items component
  // Important! add unique key
  const Menu = (movies: any) =>
    movies.map((movie: any) => {

      console.log(movie)

      // return <MenuItem text={movie.Title} key={movie.imdbID} selected={selected} />;
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

  const Arrow = ({ text, className }: { text: string, className: string }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };

  const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
  const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

  const onSelect = (key: any) => {
    setSelected({ selected: key });
  }
  // Create menu from items
  React.useEffect(() => {
    setMenuItems(Menu(movies))

  }, [movies])





  const renderMovies = (movies: Movie[]) => {
    const filteredMovies =
      movies ? movies.filter((movie) =>
        movie.Type.toLowerCase().includes(category.toLowerCase())
      ) : []

    // console.log(filteredMovies)


    return (
      <div className="scroller">
        <div className="button-left">
          {/* <button onClick={slideLeft}>{"<"}</button> */}
        </div>
        <div className="button-right" style={{ marginBottom: '2rem' }}>
          {/* <button onClick={slideRight}>{">"}</button> */}
        </div>
        <ScrollMenu
          data={menuItems}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          onSelect={() => onSelect}
          wheel={false}
        />
        <div className="movie-horizontal-grid">
          <div className="hs hs-scroll">
            {
              filteredMovies.length > 0 ? (
                // filteredMovies.map((movie, index) => (
                //   <MovieListItem
                //     key={index}
                //     movieInfo={{
                //       Title: `${ movie.Title }`,
                //       Year: `${ movie.Year }`,
                //       imdbID: `${ movie.imdbID }`,
                //       Type: `${ movie.Type }`,
                //       Poster: `${ movie.Poster }`,
                //       Runtime: `${ movie.Runtime }`,
                //       Genre: `${ movie.Genre }`,
                //       Actors: `${ movie.Actors }`,
                //       Country: `${ movie.Country }`,
                //       imdbRating: `${ movie.imdbRating }`,
                //       Director: `${ movie.Director }`,
                //     }}
                //   />
                // )
                <p>Test</p>

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
