import './SavedMovies.css';
import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ list, onDeleteClick, isError }) {

    const [isNotFound, setIsNotFound] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filteredMovies, setFilteredMovies] = React.useState(list);
    const [shortFilms, setShortFilms] = React.useState('off');

    function handleShortFilms(e) {
        setShortFilms(e.target.value);
    };
    
    function filterMovies(movies, searchQuery, shortFilms) {
        const moviesByQuery =  movies.filter((item) => {
          const nameRu = String(item.nameRU).toLowerCase();
          const nameEn = String(item.nameEN).toLowerCase();
          const searchString = searchQuery.toLowerCase().trim();
          return (nameRu.indexOf(searchString) !== -1 || nameEn.indexOf(searchString) !== -1);
        });
      
        if(shortFilms === 'on'){
          return filterShortMovies(moviesByQuery);
        }
        return moviesByQuery;
      };

      
    function filterShortMovies(movies){
        return movies.filter((item) => item.duration < 40);
    };

    function handleSearchSubmit(value) {
        setSearchQuery(value);
        const resultList = filterMovies(list, searchQuery, shortFilms);
        setFilteredMovies(resultList);
    };

    React.useEffect(() => {
        const arr = filterMovies(list, searchQuery, shortFilms);
        setFilteredMovies(arr);
        if (searchQuery) {
            arr.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
        }
    }, [searchQuery, shortFilms, list]);

    return (
        <section className='saved-movies'>
            <SearchForm
                shortFilms={shortFilms}
                onSearchClick={handleSearchSubmit}
                savedMoviesPage={true}
                onCheckbox={handleShortFilms}
            />
            <MoviesCardList
                list={filteredMovies}
                isError={isError}
                onDelete={onDeleteClick}
                savedMoviesPage={true}
                isEmptyList={isNotFound}
            />
        </section>
    );
}

export default SavedMovies;