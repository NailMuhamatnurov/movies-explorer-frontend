import './Register.css';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm';
import React from 'react';

function Register({ onRegister, infoMessage }){

  return (
    <AuthorizationForm
    type='signup'
    linkTo='signin'
    title='Добро пожаловать!'
    buttonName='Зарегистрироваться'
    subtitle='Уже зарегестрированы?'
    linkName='Войти'
    onSubmit={onRegister}
    infoMessage={infoMessage}
    >
    </AuthorizationForm>
  )
}
  
export default Register;