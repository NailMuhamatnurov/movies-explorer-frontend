import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';
import * as moviesApi from '../../utils/MoviesApi';

function Movies({ onLikeClick, savedMoviesList, onDeleteClick }) {
  const forCheckbox = localStorage.getItem('shortFilms') === 'on' ? 'on' : 'off';
  const [isMoviesLoaging, setIsMoviesLoaging] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [shortFilms, setShortFilms] = React.useState(forCheckbox);
  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
    
  React.useEffect(() => {
    const arr = JSON.parse(localStorage.getItem('movies'));
    if (arr && !searchQuery) {
      setShortFilms(localStorage.getItem('shortFilms'));
      setFilteredMovies(shortFilms === 'on' ? filterShortMovies(arr) : arr);
      handleCheckFilteredMovies(arr);
    }
  }, [shortFilms, searchQuery])

  
  React.useEffect(() => {
    if (searchQuery) {
      const arr = filterMovies(allMovies, searchQuery, shortFilms);
      setFilteredMovies(arr);
      handleCheckFilteredMovies(arr);
    }
  }, [searchQuery, shortFilms, allMovies])


  function filterShortMovies(movies){
    return movies.filter((item) => item.duration < 40);
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
  
  function handleCheckFilteredMovies(arr) {
    arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
	}

  function handleSearchSubmit(value) {
    setIsMoviesLoaging(true);
    setSearchQuery(value);
    localStorage.setItem('searchQuery', value);
    localStorage.setItem('shortFilms', shortFilms);
    
    if (!allMovies.length) {
      moviesApi.getMovies()
        .then((data) => {
          setAllMovies(data);
          handleSetFilteredMovies(data, value, shortFilms);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        })
        .finally(() => setIsMoviesLoaging(false))
    } else {
      handleSetFilteredMovies(allMovies, value, shortFilms);
      setIsMoviesLoaging(false);
    }
  }
 
  function handleShortFilms(e) {
    setShortFilms(e.target.value);
    localStorage.setItem('shortFilms', e.target.value);
	}

  function handleSetFilteredMovies (movies, query, checkbox) {
    const moviesList = filterMovies(movies, query);
    setFilteredMovies(checkbox === 'on' ? filterShortMovies(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  return (
    <section className='movies'>
      <SearchForm shortFilms={shortFilms} onSearchClick={handleSearchSubmit} onCheckbox={handleShortFilms} />
      <MoviesCardList
        isLoading={isMoviesLoaging}
        isEmptyList={isNothingFound}
        onLike={onLikeClick}
        savedMovies={savedMoviesList}
        list={filteredMovies}
        isError={isError}
        onDelete={onDeleteClick}
      />
    </section>
  );
}

export default Movies;