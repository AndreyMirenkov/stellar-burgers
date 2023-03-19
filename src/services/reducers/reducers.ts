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
  FINISH_LOADING_INGREDIENT_DETAILS} from "../actions/action"

import { TIngredient } from "../../utils/typescriptTypes/ingredient";
import { TMainActions } from "../actions/actionCreators";


type TMainState = {
  ingredients: Array<TIngredient>;
  ingredientsInConstructor: {
    buns: Array<TIngredient> | [];
    ingredients: Array<{
      details: TIngredient | [];
      key: string | null;
    }>;
  };
  watchIngredients: TIngredient | {};
  order: {
    number: string | null;
    name: string | null;
  };
  loadingIngredientDetails: boolean;
}

export const initialState: TMainState = {
    ingredients: [],
    ingredientsInConstructor: {
        buns: [],
        ingredients: [
          {
            details: [],
            key: null
          }
        ]
    },
    watchIngredients: {},
    order: {
      number: null,
      name: null,
    },
    loadingIngredientDetails: false
  }

export const rootReducer = (state = initialState, action: TMainActions): TMainState => {
    switch(action.type){
      case GET_ALL_INGREDIENTS: {
        return {
            ...state,
            ingredients: action.items
        };
      }
      case WATCH_INGREDIENTS: {
        return {
          ...state, 
          watchIngredients: action.data
        };
      }
      case DELETE_WATCH_INGREDIENTS: {
        return {
          ...state,
          watchIngredients: {}
        };
      }
      case GET_AND_UPDATE_ORDER: {
        return {
          ...state,
          order: {
          number: action.number,
          name: action.name,
        }
        };
      }
      case GET_CONSTRUCTOR_MAIN_INGREDIENTS: {
        return {
          ...state,
          ingredientsInConstructor: {
            buns: state.ingredientsInConstructor.buns,
            ingredients: [...state.ingredientsInConstructor.ingredients, {details: state.ingredients.filter(el => el._id === action.item.id)[0], key: action.key}]
          }
        };
      }
      case GET_CONSTRUCTOR_BUNS_INGREDIENTS: {
        return {
          ...state,
          ingredientsInConstructor: {
            buns: [...state.ingredients.filter(el => el._id === action.item.id)],
            ingredients: [...state.ingredientsInConstructor.ingredients],
          }
        };
      }
      case DELETE_CONSTRUCTOR_MAIN_INGREDIENTS: {
        return {
          ...state,
          ingredientsInConstructor: {
            buns: state.ingredientsInConstructor.buns,
            ingredients: [...state.ingredientsInConstructor.ingredients.filter(el => el.key !== action.key)]
          }
        };
      }
      case UPDATE_MAIN_INGREDIENTS: {
        return {
          ...state,
          ingredientsInConstructor: {
            buns: state.ingredientsInConstructor.buns,
            ingredients: action.data
          }
        }
      }
      case DELETE_CONSTRUCTOR_INGREDIENTS: {
        return {
          ...state,
          ingredientsInConstructor: {
            buns: [],
            ingredients: []
          }
        }
      }
      case LOADING_INGREDIENT_DETAILS: {
        return {
          ...state,
          loadingIngredientDetails: true
        }
      }
      case FINISH_LOADING_INGREDIENT_DETAILS: {
        return {
          ...state,
          loadingIngredientDetails: false
        }
      }
      default: {
        return state;
      }
    }
}