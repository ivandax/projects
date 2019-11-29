import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import MovieList from '../../components/MovieList'
//import Pagination from '../../components/Pagination';

import movieAPI from '../../services/movieAPI';
import LocalStorage from '../../services/LocalStorage';

import './Favorites.scss';

const Favorites = () => {

    const getFavorites = (key) => {
        const favorites = LocalStorage.getFavorites(key);
        if(favorites){
            const parsed = favorites.split(",");
            //console.log(parsed);
            return [...parsed];
        }
    }

    const [movies, setMovies] = useState([]);

    const getMovie = async (id) => {
        const data = await movieAPI.getSingleMovie(id);
        const info = {
            title: data.title,
            path: data.poster_path,
            id: data.id
        }
        return info;
    }

    const getMoviesByIds = async (array) => {
        const data = await Promise.all(array.map( (id) => {
            return getMovie(id);
        }));
        //console.log(data);
        setMovies(data);
    }


    useEffect( () => {
        const list = getFavorites("movies");
        if(list){
            getMoviesByIds(list);
        }
    }, [])

    return (
        <div>
            <Header />
            { movies.length>0 ? 
            <MovieList movies={movies}/>
            : 
            <h3 className="favorites_message">You haven't selected any favorites yet. Go to Home to browse :)</h3>
            }
        </div>
    )
}


export default Favorites;