import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import './Hero.scss';

import movieAPI from '../../services/movieAPI';

const Hero = () => {

    const imageBase = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' //base for getting images...
    const [heroPosters, setHeroPosters] = useState([]);

    const getPosters = async (page_number=1) => {
        const data = await movieAPI.getMovies('popular', page_number);
        //console.log(data);
        const posters = data.results.map( (movie) => {
            return {path: movie.poster_path, title: movie.title} //for each elements returns an object
        })
        setHeroPosters(posters); //each poster has path to build the url, and the title for the alt text
    }

    useEffect(()=>{getPosters(1)},[]); //do this once the component has loaded.

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        accesibility:true,
        className:'slides'
      }

    return (
        <div className="hero">
            <div className="posters">
                <Slider {...settings}>
                    {heroPosters.map( (movie) => {
                        return <div key={uniqid('movie')}><img src={imageBase + movie.path} className="poster" alt={movie.title}/></div>
                    })}
                </Slider>
            </div>
            <div className="hero_tagline">All the Best Movies</div>
        </div>
    )
}

export default Hero;