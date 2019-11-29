import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import movieAPI from '../../services/movieAPI';

import './Details.scss';

const Details = ({match}) => {

    const img = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2'

    const [movie, setMovie] = useState(null);

    const getMovie = async (id) => {
        const data = await movieAPI.getSingleMovie(id);
        const info = {
            title: data.title,
            path: data.poster_path,
            budget: data.budget,
            release: data.release_date,
            popularity: data.popularity,
            overview: data.overview 
        }
        setMovie(info);
        console.log(info)

    }

    useEffect( () =>{
        getMovie(match.params.id);
    }, []);

    return (
        <div className="Details">
            <Header />
            {movie ?
            <div className="content">
                <div className="detailsMain">
                    <h1>{movie.title}</h1>
                    <img src={img+movie.path} alt={movie.title}/>
                </div>
                <div className="detailsContent">
                    <hr/>
                    <h3>More about the movie:</h3>
                    <div><span>Budget:</span> {movie.budget}</div>
                    <div><span>Popularity:</span> {movie.popularity}</div>
                    <div><span>Released On:</span> {movie.release}</div>
                    <p><span>Overview:</span> {movie.overview}</p>
                </div>
            </div>
            
            : <div>Loading...</div>
            }
        </div>
    )
}

export default Details;