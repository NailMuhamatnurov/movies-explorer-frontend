import './Logo.css';
import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Logo() {
  
  return (
    <Link to='/' className='logo'>
      <img className='logo__pic' src={logo} alt='Лого' />
    </Link> 
  );
};
  
export default Logo;