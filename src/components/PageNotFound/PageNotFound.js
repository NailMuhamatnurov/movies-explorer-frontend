import './PageNotFound.css';
import { Link, useHistory } from "react-router-dom";
import React from 'react';

function PageNotFound() {

  const history = useHistory();

  function handleClick() {
    history.goBack();
  };

  return (
    <section className='pagenotfound'>
      <div className='pagenotfound__frame'>
        <h2 className='pagenotfound__title'>404</h2>
        <p className='pagenotfound__subtitle'>Страница не найдена</p>
      </div>
      <Link onClick={handleClick} className='pagenotfound__link opacity-link'>Назад</Link>
    </section>
  );
};
  
export default PageNotFound;