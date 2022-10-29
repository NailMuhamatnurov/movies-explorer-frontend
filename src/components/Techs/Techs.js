import './Techs.css';
import React from 'react';

function Techs() {

  return (
    <section className='techs ' id='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <div className='techs__line page__section'></div>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='techs__list'>
        <li className='techs__items'>HTML</li>
        <li className='techs__items'>CSS</li>
        <li className='techs__items'>JS</li>
        <li className='techs__items'>React</li>
        <li className='techs__items'>Git</li>
        <li className='techs__items'>Express.js</li>
        <li className='techs__items'>mongoDB</li>
      </ul>
    </section>
  );
};
  
export default Techs;