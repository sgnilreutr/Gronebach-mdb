import React, { useEffect, useState } from 'react'
import DetailHeader from './DetailHeader'
import './MovieDetail.scss'
import { FiStar } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { createApiClient, getMoviePosterUrl, MovieDetail } from '../data/api'
import { MovieTrailer, OpenTrailerButton } from './MovieTrailer'
import db from '../data/firebase'

const api = createApiClient()

const Moviedetail: React.FC<MovieDetail> = () => {
  const { movieID } = useParams<{ movieID: string }>()
  const [movie, setMovie] = useState<any>({})
  const [state, setState] = useState('closed')


  // useEffect(() => {
  //   const setData = async 

  // },[movieID])
  const onClick = (movie: any) => {
    console.log(movie)
    db.collection('movies').add(
      {
        Title: movie.Title,
        Year: movie.Year,
        Rated: movie.Rated,
        Released: movie.Released,
        Runtime: movie.Runtime,
        Genre: movie.Genre,
        Director: movie.Director,
        Writer: movie.Writer,
        Actors: movie.Actors,
        Plot: movie.Plot,
        Language: movie.Language,
        Country: movie.Country,
        Awards: movie.Awards,
        Poster: movie.Poster,
        // Ratings
        Metascore: movie.Metascore,
        imdbRating: movie.imdbRating,
        imdbVotes: movie.imdbVotes,
        imdbID: movie.imdbID,
        Type: movie.Type,
        DVD: movie.DVD != null ? movie.DVD : 'N/A',
        BoxOffice: movie.BoxOffice != null ? movie.BoxOffice : 'N/A',
        Production: movie.Production != null ? movie.Production : 'N/A',
        Website: movie.Website != null ? movie.Website : 'N/A',
      }
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      const movieDetail = await api.getMovieDetail(`${ movieID }`)
      await setMovie(movieDetail || 'No movie loaded.')
      const addData = (movie: any) => {
        db.collection('movies').add(
          {
            Title: movie.Title,
            Year: movie.Year,
            Rated: movie.Rated,
            Released: movie.Released,
            Runtime: movie.Runtime,
            Genre: movie.Genre,
            Director: movie.Director,
            Writer: movie.Writer,
            Actors: movie.Actors,
            Plot: movie.Plot,
            Language: movie.Language,
            Country: movie.Country,
            Awards: movie.Awards,
            Poster: movie.Poster,
            // Ratings
            Metascore: movie.Metascore,
            imdbRating: movie.imdbRating,
            imdbVotes: movie.imdbVotes,
            imdbID: movie.imdbID,
            Type: movie.Type,
            BoxOffice: movie.BoxOffice,
            Production: movie.Production,
            Website: movie.Website,
          }
        )
      }
    }

    fetchData()
  }, [movieID])

  const triggerOpenTrailerState = () => {
    setState('open')
  }

  const renderDetail = (movie: MovieDetail) => {
    return (
      <div className="detail-container">
        <button onClick={() => onClick(movie)}>Click</button>
        <div className="item-title">
          <div className="text-truncate">
            <span>
              {movie.Title} ({movie.Year})
            </span>
          </div>
        </div>
        <div>
          <div>
            <div className="details-inner">
              <img src={getMoviePosterUrl(movie.Poster)} alt={movie.Title} className="img" />
              <div className="text-details">
                {state === 'closed' && (
                  <OpenTrailerButton openTrailer={triggerOpenTrailerState} />)}
                {state === 'open' && <MovieTrailer movieID={movie.imdbID} />}
                <div className="description">{movie.Plot}</div>
                <div className="actors">
                  <span className="detail-header">Acteurs</span>
                  <span>{movie.Actors}</span>
                </div>
                <div className="director">
                  <span className="detail-header">Regisseur</span>
                  <span>{movie.Director}</span>
                </div>
                <div className="genre">
                  <span className="detail-header">Genre</span>
                  <span>{movie.Genre}</span>
                </div>
                <div className="rating">
                  <FiStar />
                  <span style={{ marginLeft: `8px` }}>
                    <b>{movie.imdbRating}</b> / 10
                </span>
                </div>
                <div className="runtime">
                  <span className="detail-header">Runtime</span>
                  <span>{movie.Runtime}</span>
                </div>
              </div>
            </div>
            {/* <div className="moviePlayer">
              <ReactPlayer light={true} url={movieTrailer.videoUrl} />
            </div> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <DetailHeader />
      {movie ? renderDetail(movie) : <h2>Loading...</h2>}
    </div>
  )
}

export default Moviedetail
