import './Login.css';
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import React from 'react';

function Login(){

  return (
    <AuthorizationForm
      title='Рады видеть!'
      actionName='Войти'
      helpAction='signup'
      helpActionName='Регистрация'
      helpText='Ещё не зарегистрированы?'
    />
  )
}
 
export default Login;