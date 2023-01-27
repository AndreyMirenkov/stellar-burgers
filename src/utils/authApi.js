import { getCookie } from "./cookie";
export const BASE_URL = 'https://norma.nomoreparties.space/api';

const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
}

const checkResponse = (res) => {
    if (res.ok){
        return res.json()
    } else {
        return Promise.reject(res.status);
    }
}

export const registerUser = ({name, email, password}) => {
    return fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email, 
            password, 
            name 
        })
    }).then(checkResponse);
} 

export const loginUser = ({email, password}) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email, 
            password
        })
    }).then(checkResponse);
}

export const logoutUser = (token) => {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
             token
        })
    }).then(checkResponse);
}

export const getProfile = () => {
    return fetch(`${BASE_URL}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        }
    }).then(checkResponse);
}

export const updateProfile = ({name, email}) => {
    return fetch(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify({
            name,
            email
        })
    }).then(checkResponse);
}

export const updateToken = (token) => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        body: JSON.stringify({
            token
       })
    }).then(checkResponse);
}

export const forgotPassword = (email) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email
       })
    }).then(checkResponse);
}

export const resetPassword = ({password, token}) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            password,
            token
       })
    }).then(checkResponse);
}
