import './Footer.css';
import React from 'react';

function Footer() {

    return (
        <footer className='footer'>
            <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className='footer__line'></div>
            <div className='footer__info'>
                <p className='footer__copyright'> &copy; 2022</p>
                <div className='footer__links'>
                    <a className='footer__link opacity-link' href='https://praktikum.yandex.ru' rel='noopener noreferrer' target='_blank'>Яндекс.Практикум</a>
                    <a className='footer__link opacity-link' href='https://github.com/NailMuhamatnurov'  rel='noopener noreferrer' target='_blank'>Github</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;