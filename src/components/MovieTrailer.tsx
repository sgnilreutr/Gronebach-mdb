import React from 'react'
import ReactPlayer from 'react-player'
import { MdLocalMovies } from "react-icons/md";
import './MovieTrailer.scss'

export const OpenTrailerButton = (props: any) => {
    return <div className="trailer-button" onClick={props.openTrailer}><MdLocalMovies />Bekijk Trailer</div>
}

export const MovieTrailer = ({ trailerUrl }: { trailerUrl: any }) => {
    const itemHeight = (window.innerWidth <= 414) ? 193 : 376
    const itemWidth = (window.innerWidth <= 414) ? 343 : 640

    return (
        <div>
            <div className="movie-player">
                <ReactPlayer
                    // light={true}
                    url={trailerUrl}
                    style={{ borderRadius: '6px' }}
                    height={itemHeight}
                    width={itemWidth}
                />
            </div>
        </div>
    )
}
