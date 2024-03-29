import { getCookie } from "../cookie/cookie";
export const BASE_URL = 'https://norma.nomoreparties.space/api';

const headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
}

export const checkResponse = <T>(res: Response): Promise<T> => {
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

export const getNumberOrder = (data: string[]) => {
    const token = 'Bearer ' + getCookie('token')
    return fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            authorization: token,
        },
        body: JSON.stringify({
            ingredients: data
        })
    }).then(checkResponse);
}
