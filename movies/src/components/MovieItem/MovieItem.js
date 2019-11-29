import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LocalStorage from '../../services/LocalStorage';

import './MovieItem.scss';

const MovieItem = ({movie}) => {

    const imageBase = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'

    const [amFavorite, setAmFavorite] = useState(false);

    const getFavorites = (key) => {
        return LocalStorage.getFavorites(key);
    } 

    const addMyselfToFavorites = (id) => {
        const favorites = getFavorites("movies");
        if(favorites){
            const parsed = favorites.split(",");
            if(!parsed.includes(id.toString())){
                const new_favorites = [...parsed];
                new_favorites[new_favorites.length] = id;
                LocalStorage.setFavorite("movies", new_favorites);
            }else{
                console.log("included")
            }
        } else{
            const new_favorites = [id];
            LocalStorage.setFavorite("movies", new_favorites);
        }
    }

    const removeMyselfFromFavorites = (id) => {
        const favorites = getFavorites("movies");
        const parsed = favorites.split(",");
        const new_favorites = [...parsed];
        new_favorites.splice(new_favorites.indexOf(id.toString()),1);
        LocalStorage.setFavorite("movies", new_favorites);
    }

    const amIfavorite = (id) => { //initial check if was already favorite.
        const favorites = getFavorites("movies");
        if(favorites){
            if(favorites.includes(movie.id.toString())){
                setAmFavorite(true);
            }
        }
    }

    useEffect( () => { //initially gets and sets the favorites...
        amIfavorite(movie.id);
    }, [])

    const handleFav = () => { //to handle the toggle of fav button
        if(!amFavorite){
            setAmFavorite(true);
            addMyselfToFavorites(movie.id);
        } else{
            setAmFavorite(false);
            removeMyselfFromFavorites(movie.id);
        }
    }

    return (
        <div className={`movieItem ${amFavorite ? 'fav' : ''}`}>
            <Link to={`/movie/${movie.id}`}><h3>{movie.title}</h3></Link>
            <img src={imageBase+movie.path} alt={movie.title} />
            <button onClick={handleFav}>Fav</button>
        </div>
    )
}

export default MovieItem;