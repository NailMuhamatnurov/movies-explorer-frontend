import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Movies from '../Movies/Movies';
import React from 'react';


function SavedMovies({ list, onDeleteClick, isError }) {

    const [isNotFound, setIsNothingFound] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filteredMovies, setFilteredMovies] = React.useState(list);
    const [shortFilms, setShortFilms] = React.useState('off');

    React.useEffect(() => {
        const arr = Movies.filteredMovies(list, searchQuery, shortFilms);
        setFilteredMovies(arr);
        if (searchQuery) {
            arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
        }
    }, [searchQuery, shortFilms, list]);

    function handleSearchSubmit(value) {
        setSearchQuery(value);
        const resultList = Movies.sortMovies(list, searchQuery, shortFilms);
        setFilteredMovies(resultList);
    };

    function handleShortFilms(e) {
        setShortFilms(e.target.value);
    };

    return (
        <section className='saved-movies'>
            <SearchForm
                onSearchClick={handleSearchSubmit}
                onCheckbox={handleShortFilms}
                shortFilms={shortFilms}
                savedMoviesPage={true}
            />
            <MoviesCardList
                list={filteredMovies}
                savedMoviesPage={true}
                onDelete={onDeleteClick}
                isEmptyList={isNotFound}
                isError={isError}
            />
        </section>
    );
}

export default SavedMovies;