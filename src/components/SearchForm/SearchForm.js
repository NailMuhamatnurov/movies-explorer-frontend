import './SearchForm.css';
import React from 'react';

function SearchForm() {

  const [short, setShort] = React.useState(true);
	
	function toggleShortFilms() {
		setShort(checked => !checked);
	}

  return (
    <div className='search-form'>
      <form className='search-form__form page__section-movies'>
        <input className='search-form__input' name={"name"} type='text' placeholder='Фильм' required />
        <button className='search-form__button opacity-link' type='submit'></button>
      </form>
      <div className='search-form__switch-frame'>
        <div className={`search-form__filter opacity-link ${short ? 'search-form__filter_active' : null}`}>
          <input className='search-form__radio search-form__checkbox' name='short' type='checkbox' checked={short} onChange={toggleShortFilms} />
          <span className='search-form__switch'></span>
        </div>
        <p className='search-form__filter-name'>Короткометражки</p>
      </div>
      <div className='search-form__line'></div>
    </div>
  );
}
  
export default SearchForm;