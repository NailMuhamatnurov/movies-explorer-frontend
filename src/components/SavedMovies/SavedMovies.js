import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';


function SavedMovies({ list, onDeleteClick, isError }) {

    const [isNotFound, setIsNothingFound] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filteredMovies, setFilteredMovies] = React.useState(list);
    const [shortFilms, setShortFilms] = React.useState('off');

    React.useEffect(() => {
        const arr = filterMovies(list, searchQuery, shortFilms);
        setFilteredMovies(arr);
        if (searchQuery) {
            arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
        }
    }, [searchQuery, shortFilms, list]);

    function handleSearchSubmit(value) {
        setSearchQuery(value);
        const resultList = filterMovies(list, searchQuery, shortFilms);
        setFilteredMovies(resultList);
    };

    function handleShortFilms(e) {
        setShortFilms(e.target.value);
    };
    
    function filterMovies(movies, searchQuery, shortFilms) {
        const moviesByQuery =  movies.filter((item) => {
          const strRu = String(item.nameRU).toLowerCase();
          const strEn = String(item.nameEN).toLowerCase();
          const searchStr = searchQuery.toLowerCase().trim();
          return (strRu.indexOf(searchStr) !== -1 || strEn.indexOf(searchStr) !== -1);
        });
      
        if(shortFilms === 'on'){
          return filterShortMovies(moviesByQuery);
        }
        return moviesByQuery;
      };

      
    function filterShortMovies(movies){
        return movies.filter((item) => item.duration < 40);
    };

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