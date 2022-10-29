import './AboutProject.css';
import React from 'react';

function AboutProject() {

  return (
    <section className='about-project' id='project'>
      <div className='page__section'>
        <h2 className='about-project__title'>О проекте</h2>
        <div className='about-project__line'></div>
        <div className='about-project__about'>
          <div className='about-project__description'>
            <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
            <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, 
            добавление функциональности и финальные доработки.</p>
          </div>
          <div className='about-project__description'>
            <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, 
            которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <ul className='about-project__timing'>
          <li className='about-project__oneweek about-project__timing-cell'>1 неделя</li>
          <li className='about-project__fourweek about-project__timing-cell'>4 недели</li>
          <li className='about-project__timing-name about-project__timing-cell'>Back-end</li>
          <li className='about-project__timing-name about-project__timing-cell'>Front-end</li>
        </ul>
      </div>
  </section>
  );
};
  
export default AboutProject;