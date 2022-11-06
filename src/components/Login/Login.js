import './Login.css';
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import React from 'react';

function Login({ onLogin, textMessage }) {

  return (
    <AuthorizationForm
      type='signin'
      title='Рады видеть!'
      linkName='Регистрация'
      linkTo='signup'
      buttonName='Войти'
      subtitle='Ещё не зарегистрированы?'
      onSubmit={onLogin}
      textMessage={textMessage}
    />
  );
};

export default Login;
