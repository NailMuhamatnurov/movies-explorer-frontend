import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile({user: {email, name}}) {

  return (
    <section className='profile'>
      <div className='profile__box'>
        <h2 className='profile__title'>{`Привет, ${name}!`}</h2>
        <form className='profile__form'>
          <label className='profile__label'>Имя
            <input
              defaultValue={name}
              type='text'
              className='profile__input'
              name='name'
              minLength='2'
              maxLength='30'
              required
              id='name'
            />
            <span id="name-error" className='profile__error'></span>
          </label>
          <label className='profile__label'>E-mail
            <input
              defaultValue={email}
              type='email'
              className='profile__input'
              name='email'
              minLength='2'
              maxLength='30'
              required
              id='email'
            />
            <span id='email-error' className='profile__error'></span>
          </label>
            <button className='profile__button profile__button_type_submit opacity-link' type='submit'>Редактировать</button>
            <button className='profile__button profile__button_type_logout' type='button'><Link className='profile__link opacity-link' to='/'>Выйти из аккаунта</Link></button>
        </form>
      </div>
    </section>
  );
}

export default Profile;