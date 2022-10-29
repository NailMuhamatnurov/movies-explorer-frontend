import './AuthorizationForm.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import React from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import InfoMessage from '../InfoMessage/InfoMessage';

function AuthorizationForm({type, buttonName, linkName, linkTo, title, subtitle, onSubmit, infoMessage}) {

    const {values, errors, isValid, handleChange} = useFormValidation();

    function handleSubmit(e) {
      e.preventDefault();
      type === 'signup'
        ? onSubmit(values.name, values.email, values.password)
        : onSubmit(values.email, values.password);
    };

    return (
        <section className='authorization-form'>
            <Logo/>
            <h2 className='authorization-form__title page__section-authorization'>{title}</h2>
            <form className='authorization-form__form page__section-authorization' onSubmit={handleSubmit}>
               {type === 'signup' && (
                <label className='authorization-form__label'>Имя
                    <input
                        className='authorization-form__input'
                        id='name'
                        name='name'
                        type='text'
                        minLength='2'
                        maxLength='30'
                        value={values.name}
                        onChange={handleChange}
                        required
                    />
                    <span id='name-error' className='authorization-form__error'>{errors.name ? `Поле должно быть заполнено` : ''}</span>
                </label>
               )}

                <label className='authorization-form__label'>E-mail
                    <input 
                        className='authorization-form__input'
                        id='email'
                        name='email'
                        type='email'
                        minLength='2'
                        maxLength='30'
                        value={values.email || ''}
                        onChange={handleChange}
                        required
                    />
                    <span id='email-error' className='authorization-form__error'>{errors.email || ''}</span>
                    
                </label>
                <label className='authorization-form__label'>Пароль
                    <input
                        className='authorization-form__input'
                        id='password'
                        name='password'
                        type='password'
                        minLength='4'
                        maxLength='20'
                        value={values.password || ''}
                        onChange={handleChange}
                        required
                    />
                    <span id='password-error' className='authorization-form__error'>{errors.password || ''}</span>
                    
                </label>

                <InfoMessage {...infoMessage} />

                <button className={'authorization-form__submit-button opacity-link'} type='submit' disabled={!isValid}>{buttonName}</button> 
                
                <p className='authorization-form__subtitle'>{subtitle}
                    <Link to={linkTo} className='authorization-form__link opacity-link'>{linkName}</Link>
                </p>
            </form>
        </section>
    );
}

export default AuthorizationForm;