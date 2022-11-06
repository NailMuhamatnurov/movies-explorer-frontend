import './Navigation.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ loggedIn }) {

    const [isClicked, setIsClicked] = useState(false);
  
    function handleMenuClose() {
      setIsClicked(false)
    };

    function handleMenuOpen() {
        setIsClicked(true)
    };
  
 
    return (
        <nav className={`navigation ${isClicked ? 'navigation_open' : ''}`}>
            {!loggedIn ? (
        <>
                <Link to='/signup' className='navigation__link opacity-link'>Регистрация</Link>
                <Link to='/signin' className='navigation__link navigation__link_type_signin opacity-link'>Войти</Link>
            </> ):( <>
                <button
                    className={`navigation__button opacity-link  ${isClicked ? 'navigation__button_type_close' : 'navigation__button_type_burger'} `}
                    onClick={isClicked ? handleMenuClose : handleMenuOpen}>
                </button>

                <div className={`navigation__box ${isClicked ? 'navigation__box_open' : ''}`}>
                    <NavLink exact to='/' activeClassName='navigation__movies_active' className='navigation__movies opacity-link'
                             onClick={handleMenuClose}>
                        Главная
                    </NavLink>
                    <NavLink to='/movies' activeClassName='navigation__movies_active' className='navigation__movies navigation__movies_section opacity-link'
                             onClick={handleMenuClose}>
                        Фильмы
                    </NavLink>
                    <NavLink to='/saved-movies' activeClassName='navigation__movies_active ' 
                             className='navigation__movies opacity-link'
                             onClick={handleMenuClose}>
                        Сохраненные фильмы
                    </NavLink>
                    <Link to='/profile' className='navigation__link navigation__link_type_profile opacity-link'
                          onClick={handleMenuClose}>
                        Аккаунт
                        <div className='navigation__link_type_profile-icon'>
                            <div className='accaunt-icon'></div>
                        </div>
                    </Link>
                </div>
            </>
            )}
        </nav>
    );
}

export default Navigation;