import './AuthorizationForm.css';
import React from 'react';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../HOCs/useFormValidation';
import TextMessage from '../TextMessage/TextMessage';

function AuthorizationForm({type, buttonName, linkName, linkTo, title, subtitle, onSubmit, textMessage}) {

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
                        pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
                        value={values.name || ''}
                        required
                        onChange={handleChange}
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
                        pattern='^\S+@\S+\.\S+$'
                        onChange={handleChange}
                        value={values.email || ''}
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
                        onChange={handleChange}
                        value={values.password || ''}
                        required
                    />
                    <span id='password-error' className='authorization-form__error'>{errors.password}</span>
                    
                </label>

                <TextMessage {...textMessage} />

                <button className={'authorization-form__submit-button opacity-link'} type='submit' disabled={!isValid}>{buttonName}</button> 
                
                <p className='authorization-form__subtitle'>{subtitle}
                    <Link to={linkTo} className='authorization-form__link opacity-link'>{linkName}</Link>
                </p>
            </form>
        </section>
    );
}

export default AuthorizationForm;