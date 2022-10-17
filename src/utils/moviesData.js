import film1 from '../images/film1.jpg';
import film2 from '../images/film2.jpg';
import film3 from '../images/film3.jpg';
import film4 from '../images/film4.jpg';
import film5 from '../images/film5.jpg';
import film6 from '../images/film6.jpg';
import film7 from '../images/film7.jpg';
import film8 from '../images/film8.jpg';
import film9 from '../images/film9.jpg';
import film10 from '../images/film10.jpg';
import film11 from '../images/film11.jpg';
import film12 from '../images/film12.jpg';
import film13 from '../images/film13.jpg';
import film14 from '../images/film14.jpg';
import film15 from '../images/film15.jpg';
import film16 from '../images/film16.jpg';

export const moviesMock = [
  {
    name: '33 слова о дизайне',
    time: 107,
    image: film1,
    saved: 1,
    movieId: 1001,
  },
  {
        name: 'Киноальманах «100 лет дизайна»',
        time: 107,
        image: film2,
        saved: 0,
        movieId: 1002,
    },
    {
        name: 'В погоне за Бенкси',
        time: 107,
        image: film3,
        saved: 0,
        movieId: 1003,
    },
    {
        name: 'Баския: Взрыв реальности',
        time: 107,
        image: film4,
        saved: 0,
        movieId: 1004,
    },
    {
        name: 'Бег это свобода',
        time: 107,
        image: film5,
        saved: 1,
        movieId: 1005,
    },
    {
        name: 'Книготорговцы',
        time: 107,
        image: film6,
        saved: 1,
        movieId: 1006,
    },
    {
        name: 'Когда я думаю о Германии ночью',
        time: 107,
        image: film7,
        saved: 0,
        movieId: 1007,
    },
    {
        name: 'Gimme Danger: История Игги и The Stooges',
        time: 107,
        image: film8,
        saved: 0,
        movieId: 1008,
    },
    {
        name: 'Дженис: Маленькая девочка грустит',
        time: 107,
        image: film9,
        saved: 1,
        movieId: 1009,
    },
    {
        name: 'Соберись перед прыжком',
        time: 107,
        image: film10,
        saved: 0,
        movieId: 1010,
    },
    {
        name: 'Пи Джей Харви: A dog called money',
        time: 107,
        image: film11,
        saved: 0,
        movieId: 1011,
    },
    {
        name: 'По волнам: Искусство звука в кино',
        time: 107,
        image: film12,
        saved: 0,
        movieId: 1012,
    },
    {
        name: 'Рудбой',
        time: 107,
        image: film13,
        saved: 0,
        movieId: 1013,
    },
    {
        name: 'Скейт — кухня',
        time: 107,
        image: film14,
        saved: 0,
        movieId: 1014,
    },
    {
        name: 'Война искусств',
        time: 107,
        image: film15,
        saved: 0,
        movieId: 1015,
    },
    {
        name: 'Зона',
        time: 107,
        image: film16,
        saved: 1,
        movieId: 1016,
    },
];

export const savedMoviesMock = moviesMock.filter((item) => !!item.saved);

export const userMock = { name: 'Наиль', email: 'nailm@yandex.ru' };