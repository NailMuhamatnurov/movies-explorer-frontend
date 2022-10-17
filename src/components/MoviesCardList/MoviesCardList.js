import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({list, saved}) {
  
  return (
    <section className='movies-list page__section-movies'>
      <div className='movies-list__box'>
        {list.map((item) => (
          <MoviesCard
            key={item.movieId}
            movie={item}
            removable={saved}
          />)
        )}
      </div>
      <button className='movies-list__more-button opacity-link' type='button' aria-label='Показать еще'>Ещё</button>
    </section>
  );
}
  
export default MoviesCardList;