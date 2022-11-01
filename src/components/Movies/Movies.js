import './Movies.css';
import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import * as moviesApi from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm';

function Movies({ onLikeClick, savedMoviesList, onDeleteClick }) {
  const forCheckbox = localStorage.getItem('shortFilms') === 'on' ? 'on' : 'off';
  const [isMoviesLoaging, setIsMoviesLoaging] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [shortFilms, setShortFilms] = React.useState(forCheckbox);
  const [isNothingFound, setIsNothingFound] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
  
  function filterShortMovies(movies){
    return movies.filter((item) => item.duration < 40);
  };
   
  function handleCheckFilteredMovies(arr) {
    arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
	}

  function handleSearchSubmit(value) {
    setIsMoviesLoaging(true);
    setSearchQuery(value);
    localStorage.setItem('shortFilms', shortFilms);
    localStorage.setItem('searchQuery', value);
      
    if (!allMovies.length) {
      moviesApi.getMovies()
        .then((res) => {
          setAllMovies(res);
          changeMovies(res);
          handleSetFilteredMovies(res, value, shortFilms);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
        })
        .finally(() => setIsMoviesLoaging(false))
    } else {
      handleSetFilteredMovies(allMovies, value, shortFilms);
      setIsMoviesLoaging(false);
    }
  }

  function filterMovies(movies, searchQuery, shortFilms) {
    const moviesByQuery =  movies.filter((item) => {
      const nameEn = String(item.nameEN).toLowerCase();
      const nameRu = String(item.nameRU).toLowerCase();
      const searchString = searchQuery.toLowerCase().trim();
      return (nameRu.indexOf(searchString) !== -1 || nameEn.indexOf(searchString) !== -1);
    });
  
    if(shortFilms === 'on'){
      return filterShortMovies(moviesByQuery);
    }
    return moviesByQuery;
  };
  
  function changeMovies(movies) {
    movies.forEach(movie => {
      if(!movie.image){
        movie.thumbnail = 'https://g2.dcdn.lt/images/pix/kinas-76443525.jpg'
        movie.image = 'https://g2.dcdn.lt/images/pix/kinas-76443525.jpg';
      } else {
        movie.image = `https://api.nomoreparties.co${movie.image.url}`
        movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
      }
    });
  };
 
  function handleShortFilms(e) {
    setShortFilms(e.target.value);
    localStorage.setItem('shortFilms', e.target.value);
	}

  function handleSetFilteredMovies (movies, query, checkbox) {
    const moviesList = filterMovies(movies, query);
    setFilteredMovies(checkbox === 'on' ? filterShortMovies(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  React.useEffect(() => {
    if (searchQuery) {
      const arr = filterMovies(allMovies, searchQuery, shortFilms);
      setFilteredMovies(arr);
      handleCheckFilteredMovies(arr);
    }
  }, [searchQuery, shortFilms, allMovies])
  
  React.useEffect(() => {
    const arr = JSON.parse(localStorage.getItem('movies'));
    if (arr && !searchQuery) {
      setShortFilms(localStorage.getItem('shortFilms'));
      setFilteredMovies(shortFilms === 'on' ? filterShortMovies(arr) : arr);
      handleCheckFilteredMovies(arr);
    }
  }, [shortFilms, searchQuery])
  
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