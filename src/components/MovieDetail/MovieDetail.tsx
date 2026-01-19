import { useEffect, useRef } from 'react'
import { FiStar } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import imageFallback from '../../img/placeholder-image.png'
import { getMoviePosterUrl } from '../../data/api'
import type { Movie } from '../../data/dataTypes'
import { DetailHeader } from '../Header/DetailHeader'
// import { MovieTrailerComponent, OpenTrailerButton } from './MovieTrailer'
import { RelatedMovies } from './RelatedMovies'
import { REPORT_LINK, RATING, ACTORS, DIRECTOR, GENRE, RUNTIME, RELATED_MOVIES } from './MovieDetailConstants'
import { COULD_NOT_LOAD } from '../../constants/globalConstants'

interface RenderDetailProps {
  movie: Movie
  movieID: string
  allMovies: Array<Movie>
}

const RenderDetail = ({ movie, movieID, allMovies }: RenderDetailProps) => {
  const movieTitleRef = useRef<HTMLHeadingElement | null>(null)
  const { imdbID, Title, Year, Poster, Plot, Actors, Director, Genre, imdbRating, Runtime } = movie
  const posterUrl = getMoviePosterUrl(Poster)

  useEffect(() => {
    if (movieID && movieTitleRef.current) {
      movieTitleRef.current.scrollIntoView()
    }
  }, [movieID])

  return (
    <div className='max-md:mx-4 max-md:mb-4' key={imdbID}>
      <div className='w-full text-3xl max-md:text-base font-bold leading-[1.21] text-left mb-12'>
        <div className='text-truncate'>
          <h1 ref={movieTitleRef}>
            {Title} ({Year})
          </h1>
        </div>
      </div>
      <div>
        <div>
          <div className='flex flex-col items-center w-full md:flex-row md:items-start md:w-auto'>
            <div className='flex rounded-[6px] flex-col items-center mb-4 w-48 md:mr-16 md:mb-0 md:h-auto md:w-[30%] md:min-w-[300px] md:max-w-[450px]'>
              {posterUrl === undefined ? (
                <img src={imageFallback} alt={Title} className='rounded' />
              ) : (
                <img src={posterUrl} alt={Title} className='rounded' />
              )}
              <a
                href={`mailto:suns.shakes4d@icloud.com?subject=GMDB melding - ${Title}&body=${Title} (${imdbID}) is incorrect - aub een andere uploaden.`}
                className='mt-4'>
                <small className='text-orange-400 dark:text-orange-700'>{REPORT_LINK}</small>
              </a>
            </div>
            <div className='w-full md:flex md:flex-col md:justify-evenly md:max-w-[35rem] gap-3'>
              {/* {!trailerActive && (
                <OpenTrailerButton openTrailer={triggerOpenTrailerState} />
              )}
              {trailerActive && <MovieTrailerComponent movieID={imdbID} />} */}
              <div className='flex items-center'>
                <FiStar />
                <span style={{ marginLeft: `8px` }}>
                  <b>{imdbRating}</b> {RATING}
                </span>
              </div>
              <div className='flex my-4 md:my-0'>{Plot}</div>
              <div className='flex flex-col'>
                <span className='font-semibold text-left text-neutral-500'>{ACTORS}</span>
                <span>{Actors}</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-semibold text-left text-neutral-500'>{DIRECTOR}</span>
                <span>{Director}</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-semibold text-left text-neutral-500'>{GENRE}</span>
                <span>{Genre}</span>
              </div>
              <div className='flex flex-col'>
                <span className='font-semibold text-left text-neutral-500'>{RUNTIME}</span>
                <span>{Runtime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='md:mt-16 mt-4 flex flex-col gap-3 animate-slow-reveal'>
        <h2>{RELATED_MOVIES}</h2>
        <RelatedMovies allMovies={allMovies} genre={Genre} activeMovie={movieID} />
      </div>
    </div>
  )
}

function MovieDetailWrapper({ children, allMovies }: { children?: React.JSX.Element; allMovies: Array<Movie> }) {
  return (
    <div className='relative'>
      <DetailHeader allMovies={allMovies} />
      {children}
    </div>
  )
}

function getMovieDetails(allMovies: Array<Movie>, movieID: string | undefined): Movie | undefined {
  if (movieID === undefined) {
    return undefined
  }
  return allMovies.find(({ imdbID }) => imdbID.toLowerCase().includes(`${movieID}`))
}

export default function MovieDetail({ allMovies }: { allMovies: Array<Movie> }) {
  const { movieID } = useParams()
  const movie = getMovieDetails(allMovies, movieID)

  if (movie === undefined || movieID === undefined) {
    return (
      <MovieDetailWrapper allMovies={allMovies}>
        <h2>{COULD_NOT_LOAD}</h2>
      </MovieDetailWrapper>
    )
  } else {
    return (
      <MovieDetailWrapper allMovies={allMovies}>
        <RenderDetail movie={movie} movieID={movieID} allMovies={allMovies} />
      </MovieDetailWrapper>
    )
  }
}
