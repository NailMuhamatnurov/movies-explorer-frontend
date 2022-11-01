import React from 'react';
import './Profile.css';
import { useFormValidation } from '../../HOCs/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import TextMessage from '../TextMessage/TextMessage';

function Profile({ onSignOut, onUpdate, textMessage }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isInputActive, setIsInputActive] = React.useState(false);
  const {values, errors, isValid, handleChange, setValues} = useFormValidation();
    
  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(values.name, values.email);
  };

  function handleRedactClick() {
    setIsInputActive(true);
  };

  React.useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [setValues, currentUser]); 

  React.useEffect(() => {
    if (textMessage.isShown && textMessage.code === 200) {
      setIsInputActive(false);
    }
  }, [setIsInputActive, textMessage.isShown, textMessage.code]);

  return (
    <section className='profile'>
      <div className='profile__box'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
        <form className='profile__form' onSubmit={handleSubmit}>
          <label className='profile__label'>Имя
            <input
              className='profile__input'
              name='name'
              value={values.name}
              type='text'
              minLength='2'
              maxLength='30'
              required
              id='name'
              disabled={!isInputActive}
              onChange={handleChange}
            />
            <span id="name-error" className='profile__error'>
            {errors.name ? 'Поле должно быть заполнено' : ''}
            </span>
          </label>
          <label className='profile__label'>E-mail
            <input
              className='profile__input'
              name='email'
              value={values.email}
              type='email'
              minLength='2'
              maxLength='30'
              required
              id='email'
              disabled={!isInputActive}
              onChange={handleChange}
            />
            <span id='email-error' className='profile__error'>
            {errors.email}
            </span>
          </label>

          <TextMessage {...textMessage} />

          {isInputActive ? (
            <button className='profile__button profile__button_type_submit opacity-link' type='submit' disabled={!isValid }>Сохранить</button>
          ):(
            <>
            <button className='profile__button profile__button_type_submit opacity-link' type='submit' onClick={handleRedactClick}>Редактировать</button>
            <button className='profile__button profile__button_type_logout opacity-link' type='button' onClick={onSignOut}>Выйти из аккаунта</button>
        </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Profile;