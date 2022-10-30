const apiURL = 'https://api.nailm.movies.students.nomoredomains.icu';

class MainApi {
    constructor({
        baseUrl,
        headers,
    }) {
        this._baseUrl = baseUrl;
        this._userUrl = `${this._baseUrl}/users/me`;
        this._moviesUrl = `${this._baseUrl}/movies`;
        this._token = headers['authorization'];
    };

    handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    updateUserProfile(name, email) {
        return fetch(this._userUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: this._token,
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                email,
            })
        })
            .then(res => {
                return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
            })
    };

    getUserData() {
        return fetch(this._userUrl, {
            headers: {
                authorization: this._token,
            },
            credentials: 'include',
        })
            .then(res => {
                console.log('ЗИС ТОКЕН ТАКОЙ ВОТ ' + this._token);
                return this.handleResponse(res);
            })
    };

    getUsersMovies() {
        return fetch(this._moviesUrl, {
            headers: {
                authorization: this._token,
            },
            credentials: 'include',
        })
            .then(res => {
                return this.handleResponse(res);
            })
    };

    saveNewMovie({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        id,
    }) {
        return fetch(this._moviesUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: this._token,
            },
            credentials: 'include',
            body: JSON.stringify({
                country: country,
                director,
                duration,
                year,
                description,
                image,
                trailer: trailerLink,
                nameRU: nameRU,
                nameEN: nameEN,
                thumbnail,
                movieId: id,
            })
        })
            .then(res => {
                return this.handleResponse(res);
            })
    };

    deleteMovie(movieId) {
        return fetch(`${this._moviesUrl}/${movieId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
            credentials: 'include',
        })
            .then(res => {
                return this.handleResponse(res);
            })
    };

    signup(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
            })
        })
            .then(res => {
                return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
            })
    };

    signin(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
            .then(res => {
                return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
            })
    };

    signout(token) {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => {
                return this.handleResponse(res);
            })
    };
};

const mainApi = new MainApi({
    baseUrl: apiURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default mainApi;