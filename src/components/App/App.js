import {Route, Switch} from 'react-router-dom';

import Register from '../Register/Register';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import React from 'react';

import './App.css';

import {moviesMock, savedMoviesMock, userMock} from '../../utils/moviesData';

function App() {

    return (
        <div className='app'>
            <Switch>
                <Route path='/' exact>
                    <Header />
                    <Main/>
                    <Footer/>
                </Route>

                <Route path='/movies'>
                    <Header user={userMock}/>
                    <Movies movies={moviesMock}/>
                    <Footer/>
                </Route>

                <Route path='/saved-movies'>
                    <Header user={userMock}/>
                    <SavedMovies movies={savedMoviesMock}/>
                    <Footer/>
                </Route>

                <Route path='/profile'>
                    <Header user={userMock}/>
                    <Profile user={userMock}/>
                </Route>

                <Route path='/signup'>
                    <Register/>
                </Route>

                <Route path='/signin'>
                    <Login/>
                </Route>

                <Route path="*">
                    <PageNotFound/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;