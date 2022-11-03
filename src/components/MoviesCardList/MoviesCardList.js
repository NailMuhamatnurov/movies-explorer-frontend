import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useWindowWidth } from '../../HOCs/useWindowWidth';

function MoviesCardList({ isLoading, list, isEmptyList, onDelete, isError, savedMoviesPage, onLike, savedMovies, }) {

  const screenWidth = useWindowWidth();
  const [isMount, setIsMount] = React.useState(true);
  const [showList, setShowList] = React.useState([]);
  const [cardsView, setCardsView] = React.useState({ sum: 0, more: 0 });
  
  function getSavedMovieCard(arr, id) {
    return arr.find((item) => {
      return item.movieId === id;
    });
  };

  function handleClickMoreMovies() {
    const start = showList.length;
    const end = start + cardsView.more;
    const residual = list.length - start;

    if (residual > 0) {
      const newCards = list.slice(start, end);
      setShowList([...showList, ...newCards]);
    }
  };

  function getSavedMoviesPage() {
    return list.map((item) => (
      <MoviesCard key={item._id} savedPage={savedMoviesPage} onDelete={onDelete} card={item}/>
    ))
  };

  React.useEffect(() => {
    if (list.length && !savedMoviesPage) {
      const res = list.filter((item, index) => index < cardsView.sum);
      setShowList(res);
    }
  }, [list, savedMoviesPage, cardsView.sum]);

  React.useEffect(() => {
    if (screenWidth > 1333) {
      setCardsView({ sum: 16, more: 4 });
    } else if (screenWidth <= 1333 && screenWidth > 1024) {
      setCardsView({ sum: 16, more: 3 });
    } else if (screenWidth <= 1024 && screenWidth > 632) {
      setCardsView({ sum: 8, more: 2 });
    } else if (screenWidth <= 632) {
      setCardsView({ sum: 5, more: 2 });
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
          liked={!likedMovieCard ? false : true}
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
              {!savedMoviesPage ? getInitialMoviesPage() : getSavedMoviesPage()}
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