import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

function SavedMovies({movies}) {
    return (
        <section className='saved-movies'>
            <SearchForm/>
            <MoviesCardList list={movies} saved/>
        </section>
    );
}

export default SavedMovies;