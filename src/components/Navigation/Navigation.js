import './Navigation.css';
import {Link, NavLink} from 'react-router-dom';
import React, {useState} from 'react';

function Navigation({user}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(isOpen => !isOpen);
    }

    return (
        <nav className={`navigation ${isMenuOpen ? 'navigation_open' : ''}`}>
            {!user ? <>
                <Link to='/signup' className='navigation__link opacity-link'>Регистрация</Link>
                <Link to='/signin' className='navigation__link navigation__link_type_signin opacity-link'>Войти</Link>
            </> : <>
                <button
                    className={`navigation__button opacity-link ${isMenuOpen ? 'navigation__button_type_close' : 'navigation__button_type_burger'} `}
                    onClick={toggleMenu}>
                </button>

                <div className={`navigation__box ${isMenuOpen ? 'navigation__box_open' : ''}`}>
                    <NavLink exact to='/' activeClassName='navigation__movies_active' className='navigation__movies opacity-link'
                             onClick={toggleMenu}>
                        Главная
                    </NavLink>
                    <NavLink to='/movies' activeClassName='navigation__movies_active navigation__movies_section' className='navigation__movies opacity-link'
                             onClick={toggleMenu}>
                        Фильмы
                    </NavLink>
                    <NavLink to='/saved-movies' activeClassName='navigation__movies_active'
                             className='navigation__movies opacity-link'
                             onClick={toggleMenu}>
                        Сохраненные фильмы
                    </NavLink>
                    <Link to='/profile' className='navigation__link navigation__link_type_profile opacity-link'
                          onClick={toggleMenu}>
                        Аккаунт
                        <div className='navigation__link_type_profile-icon'>
                            <div className='accaunt-icon'></div>
                        </div>
                    </Link>
                </div>
            </>}
        </nav>
    );
}

export default Navigation;