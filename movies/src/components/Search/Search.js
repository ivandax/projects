import React, { useState } from 'react';

import './Search.scss';

const Search = ({onSearch}) => {
    
    const [search, setSearch] = useState('');

    const searchMovie = (event) => {
        event.preventDefault();
        onSearch(search);
    }

    const onInputChange = (event) => {
        const {value} = event.target;
        //console.log(value)
        setSearch(value);
    }


    return (
        <form className="search" onSubmit={searchMovie}>
            <input type="text" placeholder="Search for a movie" value={search} onChange={onInputChange}/>
            <button type="submit">Search</button>
        </form>
    )
}

export default Search