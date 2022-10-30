import './InfoMessage.css';
import React from 'react';

function InfoMessage({ isShown, message, code, type }) {

    const OK_CODE = 200;
    const ERROR_CODE = 400;

    const [textMessage, setTextMessage] = React.useState('');

    function getMessage(type) {
        if (type === 'profile') {
            return 'Профиль не обновлен'
        } else if (type === 'register') {
            return 'Пользователь не зарегестрирован'
        } else if (type === 'login') {
            return 'Ошибка логина или пароля'
        }
    };

    React.useEffect(() => {
        switch (code) {
            case OK_CODE:
                setTextMessage('Ок');
                break;
            case ERROR_CODE:
                setTextMessage(getMessage(type));
                break;
            default:
                setTextMessage(message);
        }
    }, [code, message, type]);

    return (
        <div className='message'>
            {isShown && (
                <p className={`message__box ${code === OK_CODE && 'message__box_type_ok'}`}>
                    {textMessage}
                </p>
            )}
        </div>
    );
};

export default InfoMessage;