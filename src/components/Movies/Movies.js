import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

function Movies({movies}) {

  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList list={movies}/>
    </section>
  );
}
  
export default Movies;