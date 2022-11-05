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

export const getInfo = () => {
    return fetch(`${BASE_URL}/ingredients`, {
        method: 'GET',
        headers: headers,
    }).then(checkResponse);
}