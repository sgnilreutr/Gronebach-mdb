import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { MdLocalMovies } from "react-icons/md";
import './MovieTrailer.scss'
import { createApiClient } from '../data/api';

export const OpenTrailerButton = (props: any) => {
    return <div className="trailer-button" onClick={props.openTrailer}><MdLocalMovies />Bekijk Trailer</div>
}

const api = createApiClient()

export const MovieTrailer = ({ movieID }: { movieID: any }) => {
    const [movieTrailer, setMovieTrailer] = useState<any>({})

    useEffect(() => {
        const fetchData = async () => {
            const movieTrailer = await api.getMovieTrailer(`${ movieID }`)
            setMovieTrailer(movieTrailer || 'No movie trailer')
        }

        fetchData()
    }, [movieID])


    const itemHeight = (window.innerWidth <= 414) ? 193 : 376
    const itemWidth = (window.innerWidth <= 414) ? 343 : 640

    console.log(movieTrailer)

    return (
        <div>
            <div className="movie-player">
                <ReactPlayer
                    url={movieTrailer.videoUrl}
                    style={{ borderRadius: '6px' }}
                    height={itemHeight}
                    width={itemWidth}
                />
            </div>
        </div>
    )
}
