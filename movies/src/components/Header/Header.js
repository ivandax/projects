import React from 'react';
import {NavLink} from 'react-router-dom';

import './Header.scss';

const Header = () => {
    return (
        <div className="header">
            <h2>Uber Movies</h2>
            <NavLink to={'/Home'} activeClassName="selected">Home</NavLink>
            <NavLink to={'/Favorites'} activeClassName="selected">Favorites</NavLink>
        </div>
    )
}

export default Header;