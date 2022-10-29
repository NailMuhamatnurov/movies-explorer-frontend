import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useWindowWidth } from '../../hooks/useWindowWidth';

function MoviesCardList({ isLoading, list, isEmptyList, onDelete, isError, savedMoviesPage, onLike, savedMovies, }) {

  const screenWidth = useWindowWidth();
  const [isMount, setIsMount] = React.useState(true);
  const [showList, setShowList] = React.useState([]);
  const [cardsShowParams, setCardsShowParams] = React.useState({ sum: 0, more: 0 });
  
  function getSavedMovieCard(arr, id) {
    return arr.find((item) => {
      return item.movieId === id;
    });
  };

  function handleClickMoreMovies() {
    const start = showList.length;
    const end = start + cardsShowParams.more;
    const residual = list.length - start;

    if (residual > 0) {
      const newCards = list.slice(start, end);
      setShowList([...showList, ...newCards]);
    }
  };

  function getSavedMoviesPage() {
    return list.map((item) => (
      <MoviesCard
        key={item._id}
        card={item}
        savedPage={savedMoviesPage}
        onDelete={onDelete}
      />
    ))
  };

  React.useEffect(() => {
    if (list.length && !savedMoviesPage) {
      const res = list.filter((item, index) => index < cardsShowParams.sum);
      setShowList(res);
    }
  }, [list, savedMoviesPage, cardsShowParams.sum]);

  React.useEffect(() => {
    if (screenWidth > 1331) {
      setCardsShowParams({ sum: 8, more: 4 });
    } else if (screenWidth <= 1331 && screenWidth > 1027) {
      setCardsShowParams({ sum: 12, more: 3 });
    } else if (screenWidth <= 1027 && screenWidth > 629) {
      setCardsShowParams({ sum: 8, more: 2 });
    } else if (screenWidth <= 629) {
      setCardsShowParams({ sum: 5, more: 2 });
    }
    return () => setIsMount(false);
  }, [screenWidth, isMount]);
  
  function getInitialMoviesPage() {
    return showList.map((item) => {
      const likedMovieCard = getSavedMovieCard(savedMovies, item.id);
      const likedMovieId = likedMovieCard ? likedMovieCard._id : null;
    return (
        <MoviesCard
          key={item.id}
          liked={likedMovieCard ? true : false}
          card={{ ...item, _id: likedMovieId }}
          onDelete={onDelete}
          onLike={onLike}
        />)
    })
  };

  return (
    <section className='movies-list page__section-movies'>
      {isLoading ? (
        <Preloader />
      ) : (
        isEmptyList || isError ? (
          <p className={`movies-list__message ${isError && 'movies-list__message_type_err'}`}>
            {isError ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : 'Ничего не найдено'}
          </p>
        ) : (
          <>
            <div className='movies-list__box'>
              {savedMoviesPage ? getSavedMoviesPage() : getInitialMoviesPage()}
            </div>
            <button className={`movies-list__more-button opacity-link ${(showList.length === list.length || savedMoviesPage || isEmptyList) &&
              'movies-list__more-button_hidden'}`} type='button' onClick={handleClickMoreMovies} aria-label='Показать еще'>Ещё
            </button>
          </>
        )
      )}
    </section>
  );
}

export default MoviesCardList;