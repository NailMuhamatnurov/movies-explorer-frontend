import './AuthorizationForm.css';

import Logo from '../Logo/Logo';
import {Link} from 'react-router-dom';
import React from 'react';

function AuthorizationForm({title, children, helpAction, actionName, helpText, helpActionName}) {
    return (
        <section className='authorization-form'>
            <Logo/>
            <h2 className='authorization-form__title page__section-authorization'>{title}</h2>
            <form className='authorization-form__form page__section-authorization'>
                {children}
                <label className='authorization-form__label'>E-mail
                    <input
                        className='authorization-form__input'
                        id='email'
                        name='email'
                        type='email'
                        minLength='2'
                        maxLength='30'
                        required
                    />
                    <span id='email-error' className='authorization-form__error'></span>
                </label>
                <label className='authorization-form__label'>Пароль
                    <input
                        className='authorization-form__input'
                        id='password'
                        name='password'
                        type='password'
                        minLength='4'
                        maxLength='20'
                        required
                    />
                    <span id='password-error' className='authorization-form__error'>Что-то пошло не так...</span>
                </label>

                <button className={'authorization-form__submit-button opacity-link'} type='submit'>{actionName}</button>
                <p className='authorization-form__subtitle'>{helpText}
                    <Link to={helpAction} className='authorization-form__link opacity-link'>{helpActionName}</Link>
                </p>
            </form>
        </section>
    );
}

export default AuthorizationForm;