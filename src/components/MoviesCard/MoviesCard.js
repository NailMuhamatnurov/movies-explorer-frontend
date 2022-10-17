import './MoviesCard.css';
import React from 'react';

function MoviesCard({movie: {image, name, time, saved}, removable}) {

  const getDurationLabel = (mins) => {
    const hours = Math.trunc(mins/60);
    const minutes = mins%60;
    return `${hours}ч ${minutes}м`;
  };

  return (
    <div className='movie'>
      <img className='movie__pic' src={image} alt='Фильм'/>
      <div className='movie__frame'>
        <div className='movie__info'>
          <h2 className='movie__title'>{name}</h2>
          <button
            className={`movie__button opacity-link 
            ${removable && saved ? 'movie__delete-button' : null}
            ${!removable && saved ? 'movie__save-button_active' : null} 
            ${!saved ? 'movie__save-button' : null}`}
            type='button'
            aria-label='Сохранить в избранное'
          />
        </div>
        <div className='movie__line'></div>
        <p className='movie__time'>{getDurationLabel(time)}</p>
      </div>
    </div>
  );
}
  
export default MoviesCard;