import './Portfolio.css';
import arrow from '../../images/arrows.svg';
import React from 'react';

function Portfolio() {

  return (
    <section className='portfolio'>
      <div className='page__section'>
        <h3 className='portfolio__title'>Портфолио</h3>
        <ul className='portfolio__projects'>
          <li className='portfolio__project'>
            <a className='portfolio__site opacity-link' href='https://github.com/NailMuhamatnurov/how-to-learn' target='_blank' rel='noopener noreferrer'>Статичный сайт</a>
            <a className='portfolio__link opacity-link' href='https://github.com/NailMuhamatnurov/how-to-learn' target='_blank' rel='noopener noreferrer'>
              <img className='portfolio__pic' src={arrow} alt='Ссылка на проект со статичным сайтом'/>
            </a>
          </li>
          <li className='portfolio__project'>
            <a className='portfolio__site opacity-link' href='https://github.com/NailMuhamatnurov/russian-travel' target='_blank' rel='noopener noreferrer'>Адаптивный сайт</a>
            <a className='portfolio__link opacity-link' href='https://github.com/NailMuhamatnurov/russian-travel' target='_blank' rel='noopener noreferrer'>
              <img className='portfolio__pic' src={arrow} alt='Ссылка на проект с адаптивным сайтом'/>
            </a>
          </li>
          <li className='portfolio__project'>
            <a className='portfolio__site opacity-link' href='https://github.com/NailMuhamatnurov/react-mesto-api-full' target='_blank' rel='noopener noreferrer'>Одностраничное приложение</a>
            <a className='portfolio__link opacity-link' href='https://github.com/NailMuhamatnurov/react-mesto-api-full' target='_blank' rel='noopener noreferrer'>
              <img className='portfolio__pic' src={arrow} alt='Ссылка на проект с одностраничным приложением'/>
            </a>
          </li>
        </ul>
    </div>
    </section>
  );
};
  
export default Portfolio;