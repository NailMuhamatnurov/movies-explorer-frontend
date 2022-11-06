import './Register.css';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import React from 'react';

function Register({ onRegister, textMessage }){

  return (
    <AuthorizationForm
    type='signup'
    linkTo='signin'
    title='Добро пожаловать!'
    buttonName='Зарегистрироваться'
    subtitle='Уже зарегестрированы?'
    linkName='Войти'
    onSubmit={onRegister}
    textMessage={textMessage}
    >
    </AuthorizationForm>
  )
}
  
export default Register;