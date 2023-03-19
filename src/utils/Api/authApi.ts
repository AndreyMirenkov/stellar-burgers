import { getCookie } from "../cookie/cookie";
import { BASE_URL } from "./api";
import { checkResponse } from "./api";

type TUser = {
  name?: string;
  email?: string;
  password?: string; 
  token?: string
}

const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
}


export const registerUser = ({name, email, password}: TUser) => {
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

export const loginUser = ({email, password}: TUser) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email, 
            password
        })
    }).then(checkResponse);
}

export const logoutUser = ({token}: TUser) => {
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

export const updateProfile = ({name, email}: TUser) => {
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

export const updateToken = ({token}: TUser) => {
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

export const forgotPassword = ({email}: TUser) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email
       })  
    }).then(checkResponse);
}

export const resetPassword = ({password, token}: TUser) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            password,
            token
       })
    }).then(checkResponse);
}
