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
    const OK_CODE = 200;
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [textMessage, setTextMessage] = React.useState({ isShown: false, message: '', code: OK_CODE });
    const [isLoaging, setIsLoaging] = React.useState(true);
    
    React.useEffect(() => {
        setIsLoaging(true);
        mainApi.getUserData()
            .then(res => {
                setCurrentUser(res);
                setLoggedIn(true);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setIsLoaging(false))
    }, [loggedIn]);
    
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

    function handleResetTextMessage() {
        if (textMessage.isShown) {
            setTextMessage({ ...textMessage, isShown: false, message: '', type: '', code: OK_CODE });
        }
    };

    function handleSignin(email, password) {
        setIsLoaging(true);
        mainApi.signin(email, password)
            .then(res => {
                setLoggedIn(true);
                localStorage.setItem('token', res.token);
                history.push('/movies');
            })
            .catch(({ message, statusCode }) => {
                setTextMessage({
                    ...textMessage,
                    isShown: true,
                    message,
                    code: statusCode,
                    type: 'login',
                });
            })
            .finally(() => setIsLoaging(false))
    };

    function handleUpdateProfile(name, email) {
        mainApi.updateUserProfile(name, email)
            .then(data => {
                setCurrentUser(data);
                setTextMessage({
                    ...textMessage,
                    isShown: true,
                    type: 'profile',
                });
            })
            .catch(({ message, statusCode }) => {
                setTextMessage({
                    ...textMessage,
                    isShown: true,
                    message,
                    code: statusCode,
                    type: 'profile',
                });
            })
    };

    function handleSignup(name, email, password) {
        mainApi.signup(name, email, password)
            .then(res => {
                if (res) {
                    handleSignin(email, password);
                }
            })
            .catch(({ message, statusCode }) => {
                setTextMessage({
                    ...textMessage,
                    isShown: true,
                    message,
                    code: statusCode,
                    type: 'signup',
                });
            })
    };

    function handleDeleteMovie(movie) {
        mainApi.deleteMovie(movie._id)
            .then(() => {
                const newMoviesList = savedMovies.filter((m) => m._id === movie._id ? false : true);
                setSavedMovies(newMoviesList);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleSaveMovie(movie) {
        mainApi.likeMovie(movie)
            .then(likedCard => {
                setSavedMovies([likedCard, ...savedMovies]);
            })
            .catch(err => {
                console.log(err);
            })
    }

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
    
    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className='app' onClick={textMessage.isShown ? handleResetTextMessage : null}>
                {isLoaging ? (
                    <Preloader />
                ) : (
                    <>
                        <Header loggedIn={loggedIn} />

                        <Switch>
                            <ProtectedRoute
                                exact path='/movies'
                                component={Movies}
                                loggedIn={loggedIn}
                                onLikeClick={handleSaveMovie}
                                onDeleteClick={handleDeleteMovie}
                                savedMoviesList={savedMovies}
                            />

                            <ProtectedRoute
                                exact path='/saved-movies'
                                component={SavedMovies}
                                loggedIn={loggedIn}
                                list={savedMovies}
                                onDeleteClick={handleDeleteMovie}
                                isError={isError}
                            />

                            <ProtectedRoute
                                exact path='/profile'
                                component={Profile}
                                loggedIn={loggedIn}
                                textMessage={textMessage}
                                onSignOut={handleSignOut}
                                onUpdate={handleUpdateProfile}
                            />

                            <Route path='/' exact>
                                <Main />
                            </Route>

                            <Route path='/signup'>
                                {loggedIn ? <Redirect to='/movies' /> : <Register textMessage={textMessage} onRegister={handleSignup}/>}
                            </Route>

                            <Route path='/signin'>
                                {loggedIn ? <Redirect to='/movies' /> : <Login textMessage={textMessage} onLogin={handleSignin}/>}
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
