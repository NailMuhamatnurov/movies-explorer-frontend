import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from '../../HOCs/useFormValidation';
import InfoMessage from '../InfoMessage/InfoMessage';


function Profile({ onSignOut, onUpdate, infoMessage }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [isInputActive, setIsInputActive] = React.useState(false);
  const {values, errors, isValid, handleChange, setValues, setIsValid} = useFormValidation();
    
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
    if (infoMessage.isShown && infoMessage.code === 200) {
      setIsInputActive(false);
    }
  }, [setIsInputActive, infoMessage.isShown, infoMessage.code]);

  return (
    <section className='profile'>
      <div className='profile__box'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
        <form className='profile__form' onSubmit={handleSubmit}>
          <label className='profile__label'>Имя
            <input
              value={values.name || ''}
              type='text'
              onChange={handleChange}
              className='profile__input'
              name='name'
              minLength='2'
              maxLength='30'
              required
              id='name'
              disabled={!isInputActive}
            />
            <span id="name-error" className='profile__error'>
            {errors.name ? 'Поле должно быть заполнено' : ''}
            </span>
          </label>
          <label className='profile__label'>E-mail
            <input
              value={values.email || ''}
              onChange={handleChange}
              type='email'
              className='profile__input'
              name='email'
              minLength='2'
              maxLength='30'
              required
              id='email'
              disabled={!isInputActive}
            />
            <span id='email-error' className='profile__error'>
            {errors.email || ''}
            </span>
          </label>

          <InfoMessage {...infoMessage} />

          {isInputActive ? (
            <button className='profile__button profile__button_type_submit opacity-link' type='submit' disabled={!isValid }>Сохранить</button>
          ):(
            <>
            <button className='profile__button profile__button_type_submit opacity-link' type='submit' onClick={handleRedactClick}>Редактировать</button>
            <button className='profile__button profile__button_type_logout' type='button' onClick={onSignOut}>Выйти из аккаунта</button>
        </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Profile;