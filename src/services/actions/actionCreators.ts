import { getInfo, getNumberOrder } from '../../utils/Api/api';
import { TIngredient } from '../../utils/typescriptTypes/ingredient';
import { AppDispatch } from '../../utils/types'; 

import { GET_ALL_INGREDIENTS, 
    GET_CONSTRUCTOR_BUNS_INGREDIENTS, 
    GET_CONSTRUCTOR_MAIN_INGREDIENTS, 
    DELETE_CONSTRUCTOR_MAIN_INGREDIENTS, 
    WATCH_INGREDIENTS, 
    DELETE_WATCH_INGREDIENTS, 
    GET_AND_UPDATE_ORDER, 
    UPDATE_MAIN_INGREDIENTS, 
    DELETE_CONSTRUCTOR_INGREDIENTS,
    LOADING_INGREDIENT_DETAILS,
    FINISH_LOADING_INGREDIENT_DETAILS} from "./action"

export interface IItem {
    id: string;
}

export interface IMainIngredient {
    details: TIngredient;
    key: string;
}

export interface IGetIngredients {
    readonly type: typeof GET_ALL_INGREDIENTS;
    readonly items: Array<TIngredient>;
} 

export interface IGetConstructorBunsIngredients {
    readonly type: typeof GET_CONSTRUCTOR_BUNS_INGREDIENTS;
    readonly item: {
        id: string;
    };
} 

export interface IGetConstructorMainIngredients {
    readonly type: typeof GET_CONSTRUCTOR_MAIN_INGREDIENTS;
    readonly item: {
        id: string;
    };
    readonly key: string;
} 

export interface IDeleteConstructorMainIngredient {
    readonly type: typeof DELETE_CONSTRUCTOR_MAIN_INGREDIENTS;
    readonly key: string;
}

export interface IWatchIngredient {
    readonly type: typeof WATCH_INGREDIENTS;
    readonly data: TIngredient;
}

export interface IDeleteWatchIngredient {
    readonly type: typeof DELETE_WATCH_INGREDIENTS;
}

export interface IGetAndUpdateOrder {
    readonly type: typeof GET_AND_UPDATE_ORDER;
    readonly number: string;
    readonly name: string;
}

export interface IUpdateMainIngredients {
    readonly type: typeof UPDATE_MAIN_INGREDIENTS;
    readonly data: Array<IMainIngredient>;
}

export interface IDeleteConstructorIngredients {
    readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENTS;
}

export interface ILoadingIngredientDetails {
    readonly type: typeof LOADING_INGREDIENT_DETAILS;
}

export interface IFinishLoadingIngredientDetails {
    readonly type: typeof FINISH_LOADING_INGREDIENT_DETAILS;
}


export type TMainActions = | IGetIngredients 
    | IGetConstructorBunsIngredients 
    | IGetConstructorMainIngredients 
    | IDeleteConstructorMainIngredient 
    | IWatchIngredient 
    | IDeleteWatchIngredient 
    | IGetAndUpdateOrder 
    | IUpdateMainIngredients 
    | IDeleteConstructorIngredients 
    | ILoadingIngredientDetails 
    | IFinishLoadingIngredientDetails;


export const getIngredients = (items: Array<TIngredient>): IGetIngredients => {
    return {
        type: GET_ALL_INGREDIENTS,
        items
    }
}

export const getConstructorBunsIngredients = (item: IItem): IGetConstructorBunsIngredients => {
    return {
        type: GET_CONSTRUCTOR_BUNS_INGREDIENTS,
        item
    }
}

export const getConstructorMainIngredients = (item: IItem, key: string): IGetConstructorMainIngredients => {
    return {
        type: GET_CONSTRUCTOR_MAIN_INGREDIENTS,
        item,
        key
    }
}

export const deleteConstructorMainIngredient = (key: string): IDeleteConstructorMainIngredient => {
    return {
        type: DELETE_CONSTRUCTOR_MAIN_INGREDIENTS,
        key
    }
}

export const watchIngredient = (data: TIngredient): IWatchIngredient => {
    return {
        type: WATCH_INGREDIENTS,
        data
    }
}

export const deleteWatchIngredient = (): IDeleteWatchIngredient => {
    return {
        type: DELETE_WATCH_INGREDIENTS,
    }
}

export const getAndUpdateOrder = (number: string, name: string): IGetAndUpdateOrder => {
    return {
        type: GET_AND_UPDATE_ORDER,
        number,
        name
    }
}

export const updateMainIngredients = (data: Array<IMainIngredient>): IUpdateMainIngredients => {
    return {
        type: UPDATE_MAIN_INGREDIENTS,
        data
    }
}

export const deleteConstructorIngredients = (): IDeleteConstructorIngredients => {
    return {
        type: DELETE_CONSTRUCTOR_INGREDIENTS
    }
}

export const loadingIngredientDetails = (): ILoadingIngredientDetails => {
    return {
        type: LOADING_INGREDIENT_DETAILS
    }
}

export const finishLoadingIngredientDetails = (): IFinishLoadingIngredientDetails => {
    return {
        type: FINISH_LOADING_INGREDIENT_DETAILS
    }
}

export const getApiIngredients= () => {
    return function(dispatch: AppDispatch){
        getInfo()
        .then((res: any) => {
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

export const getApiNumberOrder = (data: string[]) => {
    return function(dispatch: AppDispatch){
        getNumberOrder(data)
        .then((res: any) => {
            dispatch(getAndUpdateOrder(res.order.number, res.name));
        }).catch((err) => {
            alert(`Возникла ошибка ${err}`)
        });
    }
}