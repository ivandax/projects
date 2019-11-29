import React from 'react';
//import uniqid from 'uniqid'

import MovieItem from '../MovieItem'    

import './MovieList.scss';

const MovieList = ({movies}) => {

    //console.log(movies)
    return (
        <div className="movieList">
            {movies.map( (movie) => {
                return <MovieItem movie={movie} key={movie.id}/>
            })}
            <hr/>
        </div>
    )
}

export default MovieList;