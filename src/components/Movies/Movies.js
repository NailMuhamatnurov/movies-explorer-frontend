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
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [fullMovieList, setFullMovieList] = React.useState([]);
  
  function filterShortMovies(movies){
    return movies.filter((item) => item.duration < 40);
  };
   
  function handleCheckFilteredMovies(arr) {
    arr.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
	}

  function handleSearchSubmit(value) {
    setIsMoviesLoaging(true);
    setSearchQuery(value);
    localStorage.setItem('searchQuery', value);
    localStorage.setItem('shortFilms', shortFilms);
          
    if (!fullMovieList.length) {
      moviesApi.getMovies()
        .then((res) => {
          setFullMovieList(res);
          relinkImages(res);
          handleSetFilteredMovies(res, value, shortFilms);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
        })
        .finally(() => setIsMoviesLoaging(false))
    } else {
      handleSetFilteredMovies(fullMovieList, value, shortFilms);
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
  
  function relinkImages(movies) {
    movies.forEach(movie => {
      if(!movie.image){
        movie.thumbnail = 'https://phonoteka.org/uploads/posts/2021-04/1619602660_3-phonoteka_org-p-kinematograf-fon-3.jpg';
        movie.image = 'https://phonoteka.org/uploads/posts/2021-04/1619602660_3-phonoteka_org-p-kinematograf-fon-3.jpg';
      } else {
        movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
        movie.image = `https://api.nomoreparties.co${movie.image.url}`;
        
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
    const base = JSON.parse(localStorage.getItem('movies'));
    if (base && !searchQuery) {
      setShortFilms(localStorage.getItem('shortFilms'));
      setFilteredMovies(shortFilms === 'on' ? filterShortMovies(base) : base);
      handleCheckFilteredMovies(base);
    }
  }, [shortFilms, searchQuery])
    
  React.useEffect(() => {
    if (searchQuery) {
      const base = filterMovies(fullMovieList, searchQuery, shortFilms);
      setFilteredMovies(base);
      handleCheckFilteredMovies(base);
    }
  }, [searchQuery, shortFilms, fullMovieList])

  return (
    <section className='movies'>
      <SearchForm shortFilms={shortFilms} onSearchClick={handleSearchSubmit} onCheckbox={handleShortFilms} />
      <MoviesCardList
        isLoading={isMoviesLoaging}
        isEmptyList={isNotFound}
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