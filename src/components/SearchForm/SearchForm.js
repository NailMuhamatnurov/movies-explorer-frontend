import './SearchForm.css';
import React from 'react';
import { useFormValidation } from '../../HOCs/useFormValidation';


function SearchForm({ onSearchClick, savedMoviesPage, shortFilms, onCheckbox }) {

  const {values, errors, isValid, setValues, handleChange, setIsValid} = useFormValidation();
  
  React.useEffect(() => {
    if (!savedMoviesPage) {
      const input = localStorage.getItem('searchQuery');
      if (input) {
        setValues({query : input});
        setIsValid(true);
      }
    }
  }, [savedMoviesPage, setValues, setIsValid]);

  function handleSubmit(e) {
    e.preventDefault();
    onSearchClick(values.query);
  };

  return (
    <div className='search-form'>
      <form className='search-form__form page__section-movies' onSubmit={handleSubmit}>
        <input className='search-form__input' name='query' type='text' value={values.query || ''}
          onChange={handleChange} placeholder='Фильм' required />
          <span id='email-error' className='search-form__error'>
          {errors.query ? 'Нужно ввести поисковый запрос' : ''}
        </span>
        <button className='search-form__button opacity-link' type='submit' disabled={!isValid}></button>
      </form>
       <div className='search-form__switch-frame'> 
        <div className={`opacity-link search-form__filter ${shortFilms === 'on' ? 'search-form__filter_active' : null}`}>
          <input className='search-form__radio search-form__checkbox' name='short' type='checkbox' value='off'
              checked={shortFilms === 'off' ? true : false}
              onChange={onCheckbox} />
          <input className='search-form__radio search-form__checkbox' name='short' type='checkbox'  value='on'
              checked={shortFilms === 'on' ? true : false}
              onChange={onCheckbox} />    
          <span className='search-form__switch'></span>
        </div>
        <p className='search-form__filter-name'>Короткометражки</p>
      </div>
      <div className='search-form__line'></div>
    </div>
  );
}
  
export default SearchForm;