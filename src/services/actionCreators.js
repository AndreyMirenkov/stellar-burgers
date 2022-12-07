import { getInfo } from '../utils/api';

import { GET_ALL_INGREDIENTS, 
    GET_CONSTRUCTOR_BUNS_INGREDIENTS, 
    GET_CONSTRUCTOR_MAIN_INGREDIENTS, 
    DELETE_CONSTRUCTOR_MAIN_INGREDIENTS, 
    WATCH_INGREDIENTS, 
    DELETE_WATCH_INGREDIENTS, 
    GET_AND_UPDATE_ORDER, 
    UPDATE_MAIN_INGREDIENTS, 
    DELETE_CONSTRUCTOR_INGREDIENTS} from "./action"

export const getIngredients = (items) => {
    return {
        type: GET_ALL_INGREDIENTS,
        items
    }
}

export const getConstructorBunsIngredients = (item) => {
    return {
        type: GET_CONSTRUCTOR_BUNS_INGREDIENTS,
        item
    }
}

export const getConstructorMainIngredients = (item, key) => {
    return {
        type: GET_CONSTRUCTOR_MAIN_INGREDIENTS,
        item,
        key
    }
}

export const deleteConstructorMainIngredient = (key) => {
    return {
        type: DELETE_CONSTRUCTOR_MAIN_INGREDIENTS,
        key
    }
}

export const watchIngredient = (data) => {
    return {
        type: WATCH_INGREDIENTS,
        data
    }
}

export const deleteWatchIngredient = () => {
    return {
        type: DELETE_WATCH_INGREDIENTS,
    }
}

export const getAndUpdateOrder = (number, name) => {
    return {
        type: GET_AND_UPDATE_ORDER,
        number,
        name
    }
}

export const updateMainIngredients = (data) => {
    return {
        type: UPDATE_MAIN_INGREDIENTS,
        data
    }
}

export const deleteConstructorIngredients = () => {
    return {
        type: DELETE_CONSTRUCTOR_INGREDIENTS
    }
}

export const getApiIngredients= () => {
    return function(dispatch){
        getInfo()
        .then(res => {
          if (res && res.success) {
            dispatch(getIngredients(res.data));
          } else {
            alert('Возникла ошибка при получении данных с сервера.');
          }
        }).catch((err) => {
          alert(`Возникла ошибка ${err}`)
        });
    }
}