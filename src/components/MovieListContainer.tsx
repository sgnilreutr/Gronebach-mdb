import React from 'react'
// import { useSelector } from 'react-redux'
// import { Movie } from '../data/api'
import MovieList from './MovieList'
// import MovieListItem from './MovieListItem'

// const selectCategory = (state: any) => state.category

const MovieListContainer = ({ movies }: { movies: any }) => {
    // const category = useSelector(selectCategory)
    // const [filteredMovies, setFilteredMovies] = useState<any>()


    // useEffect(() => {
    //     setFilteredMovies(movies.filter((movie: any) =>
    //         movie.Type.toLowerCase().includes(category.toLowerCase())
    //     ))
    // }, [category, movies])


    console.log(movies)
    return (
        <div className="scroller-container">
            <MovieList movies={movies} />
        </div>
    )
}

export default MovieListContainer