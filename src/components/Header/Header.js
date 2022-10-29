import './Header.css';
import React from 'react';
import Logo from '../Logo/Logo';
import Navigation from "../Navigation/Navigation";

function Header({user}) {
    return (
        <header className={`${ !user ? 'header' : 'header__movies'}`}>
            <Logo />
            <Navigation user={user}/>
        </header>
    );
}

export default Header;