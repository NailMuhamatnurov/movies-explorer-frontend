import './MoviesCard.css';
import React from 'react';

function MoviesCard({ card, onLike, onDelete, liked, savedPage }) {

  function handleDeleteClick() {
    onDelete(card);
  };

  function handleLikeClick() {
    onLike(card);
  };

  function getTimeFromMin(mins) {
    const hours = Math.trunc(mins/60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  };

  return (
    <div className='movie'>
      <img className='movie__pic' src={`${card.image}`} alt='Фильм'/>
      <div className='movie__frame'>
        <div className='movie__info'>
          <a className='movie__title' href={card.trailer || card.trailerLink} target='_blank' rel='noreferrer'>{card.nameRU}</a>
          <button
            className={`movie__button opacity-link 
            ${savedPage ? 'movie__delete-button' : 'movie__save-button'}
            ${liked && !savedPage ? 'movie__save-button_active' : null}`}
            type='button'
            aria-label='Сохранить'
            onClick={savedPage || liked ? handleDeleteClick : handleLikeClick}
          />
        </div>
        <div className='movie__line'></div>
        <p className='movie__time'>{getTimeFromMin(card.duration)}</p>
      </div>
    </div>
  );
}
  
export default MoviesCard;