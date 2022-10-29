import './Register.css';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import React from 'react';

function Register(){

  return (
    <AuthorizationForm
      title='Добро пожаловать!'
      actionName='Зарегистрироваться'
      helpText='Уже зарегестрированы?'
      helpAction='signin'
      helpActionName='Войти'
    >
      <label className='authorization-form__label'>Имя
        <input
          className='authorization-form__input'
          id='name'
          name='name'
          type='text'
          minLength='2'
          maxLength='30'
          required
        />
        <span id='name-error' className='authorization-form__error'></span>
      </label>
    </AuthorizationForm>
  )
}
  
export default Register;