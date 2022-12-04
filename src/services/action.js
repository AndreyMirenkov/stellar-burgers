import { getInfo } from '../utils/api';

export const GET_ALL_INGREDIENTS  = 'GET_ALL_INGREDIENTS';
export const GET_CONSTRUCTOR_BUNS_INGREDIENTS = 'GET_CONSTRUCTOR_BUNS_INGREDIENTS';
export const GET_CONSTRUCTOR_MAIN_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';
export const GET_CONSTRUCTOR_DELETE_MAIN_INGREDIENTS = 'GET_CONSTRUCTOR_DELETE_MAIN_INGREDIENTS';
export const WATCH_INGREDIENTS = 'WATCH_INGREDIENTS';
export const DELETE_WATCH_INGREDIENTS = 'DELETE_WATCH_INGREDIENTS';
export const GET_AND_UPDATE_ORDER = 'GET_AND_UPDATE_ORDER';
export const UPDATE_MAIN_INGREDIENTS = 'UPDATE_MAIN-INGREDIENTSs'

export function getIngredients(){
    return function(dispatch){
        getInfo()
        .then(res => {
          if (res && res.success) {
            dispatch({
              type: GET_ALL_INGREDIENTS,
              items: res.data
            });
          } else {
            alert('Возникла ошибка при получении данных с сервера.');
          }
        });
          }
}