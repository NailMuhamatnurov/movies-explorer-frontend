import './App.css';
import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
    const history = useHistory();
    const SUCCESSFUL_CODE = 200;
    const [currentUser, setCurrentUser] = React.useState({});
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [infoMessage, setInfoMessage] = React.useState({ isShown: false, message: '', code: SUCCESSFUL_CODE });
    const [isLoaging, setIsLoaging] = React.useState(true);
    const [isError, setIsError] = React.useState(false);


    function handleClickResetInfoMessage() {
        if (infoMessage.isShown) {
            setInfoMessage({ ...infoMessage, isShown: false, message: '', type: '', code: SUCCESSFUL_CODE });
        }
    };

    function handleSignin(email, password) {
        setIsLoaging(true);
        mainApi.signin(email, password)
            .then(res => {
                setLoggedIn(true);
                console.log('ТАКОЙ ТОКЕН ПОЛУЧИЛИ ' + res.token);
                window.localStorage.setItem('token', res.token);
                history.push('/movies');
            })
            .catch(({ message, statusCode }) => {
                setInfoMessage({
                    ...infoMessage,
                    isShown: true,
                    message,
                    code: statusCode,
                    type: 'login',
                });
            })
            .finally(() => setIsLoaging(false))
    };

    function handleSignOut() {
        mainApi.signout()
            .then(res => {
                setCurrentUser({});
                localStorage.clear();
                setLoggedIn(false);
                history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    };

    function handleUpdateUser(name, email) {
        mainApi.updateUserProfile(name, email)
            .then(data => {
                setCurrentUser(data);
                setInfoMessage({
                    ...infoMessage,
                    isShown: true,
                    type: 'profile',
                });
            })
            .catch(({ message, statusCode }) => {
                setInfoMessage({
                    ...infoMessage,
                    isShown: true,
                    message,
                    code: statusCode,
                    type: 'profile',
                });
            })
    };

    function handleSignup(name, email, password) {
        mainApi.signup(name, email, password)
            .then(data => {
                if (data) {
                    console.log(data);
                    handleSignin(data.email, password);
                }
            })
            .catch(({ message, statusCode }) => {
                setInfoMessage({
                    ...infoMessage,
                    isShown: true,
                    message,
                    code: statusCode,
                    type: 'register',
                });
            })
    };

    function handleDeleteMovie(movie) {
        mainApi.deleteMovie(movie._id)
            .then(() => {
                const newMoviesList = savedMovies.filter((m) => m._id === movie._id ? false : true);
                setSavedMovies(newMoviesList);
            })
            .catch(err => console.log(err))
    }

    function handleSaveMovie(movie) {
        mainApi.saveNewMovie(movie)
            .then(newCard => {
                setSavedMovies([newCard, ...savedMovies]);
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        if (loggedIn) {
            mainApi.getUsersMovies()
                .then((res) => {
                    setSavedMovies(res);
                    setIsError(false);
                })
                .catch(err => {
                    setIsError(true);
                    console.log(err);
                })
        }
    }, [loggedIn]);

    React.useEffect(() => {
        setIsLoaging(true);
        mainApi.getUserData()
            .then(res => {
                setLoggedIn(true);
                setCurrentUser(res);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setIsLoaging(false))
    }, [loggedIn]);

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className='app' onClick={infoMessage.isShown ? handleClickResetInfoMessage : null}>
                {isLoaging ? (
                    <Preloader />
                ) : (
                    <>
                        <Header loggedIn={loggedIn} />

                        <Switch>
                            <ProtectedRoute
                                exact path='/movies'
                                loggedIn={loggedIn}
                                component={Movies}
                                savedMoviesList={savedMovies}
                                onLikeClick={handleSaveMovie}
                                onDeleteClick={handleDeleteMovie}
                            />

                            <ProtectedRoute
                                exact path='/saved-movies'
                                loggedIn={loggedIn}
                                component={SavedMovies}
                                list={savedMovies}
                                onDeleteClick={handleDeleteMovie}
                                isError={isError}
                            />

                            <ProtectedRoute
                                exact path='/profile'
                                loggedIn={loggedIn}
                                component={Profile}
                                onSignOut={handleSignOut}
                                onUpdate={handleUpdateUser}
                                infoMessage={infoMessage}
                            />

                            <Route path='/' exact>
                                <Main />
                            </Route>

                            <Route path='/signup'>
                                {loggedIn ? <Redirect to='/movies' /> : <Register onRegister={handleSignup} infoMessage={infoMessage} />}
                            </Route>

                            <Route path='/signin'>
                                {loggedIn ? <Redirect to='/movies' /> : <Login onLogin={handleSignin} infoMessage={infoMessage} />}
                            </Route>

                            <Route path="*">
                                <PageNotFound />
                            </Route>

                        </Switch>

                        <Footer />
                    </>
                )}
            </div>

        </CurrentUserContext.Provider>
    );
};

export default App;
