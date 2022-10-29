import './Main.css';
import React from 'react';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import Techs from '../Techs/Techs';

function Main() {
  
  return (
    <main className='content'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
    </main>
  );
};
  
export default Main;