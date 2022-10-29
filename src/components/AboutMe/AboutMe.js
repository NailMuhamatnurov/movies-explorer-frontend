import './AboutMe.css';
import photo from '../../images/iam.png';
import React from 'react';

function AboutMe() {

  return (
    <section className='student' id='student'>
      <h2 className='about-project__title page__section about-me__std'>Студент</h2>
      <div className='about-project__line about-me__line page__section'></div>
      <article className='about-me page__section'>
        <div className='about-me__info-frame'>
          <div className='about-me__main-info'>
            <h2 className='about-me__title'>Наиль</h2>
            <h3 className='about-me__subtitle'>Фронтенд-разработчик, 35 лет</h3>
            <p className='about-me__text'>Я живу в городе Челябинск, окончил 
              «Южно-Уральский Государственный Университет» по специальности «Физическая электроника». 
              Работаю инженером-электроником в приборостроительной компании. 
              У меня есть жена и двое детей. Я люблю учиться и решать интересные и сложные задачи, 
              поэтому принял решение всерьез заняться программированием. 
              В данный момент прохожу курсы Яндекс.Практикум по направлению «Веб-разработка».
            </p>
          </div>
          <a className='about-me__link opacity-link' href='https://github.com/NailMuhamatnurov' target='_blank' rel='noopener noreferrer'>Github</a>
        </div>
        <div className='about-me__frame'>
          <img className='about-me__photo' src={photo} alt='Фото' />
        </div>
      </article>
    </section>
  );
};
  
export default AboutMe;