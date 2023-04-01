import { initialState, rootReducer } from "./reducers";
import * as types from '../actions/action';

const arrayIngredient = [{
    calories: 10,
    carbohydrates: 10,
    fat: 10,
    image: 'https://image',
    image_large: 'https://image',
    image_mobile: 'https://image',
    name: 'Булочка',
    price: 10,
    proteins: 10,
    type: 'bun',
    __v: 1,
    _id: '1',
},
{
    calories: 10,
    carbohydrates: 10,
    fat: 10,
    image: 'https://image',
    image_large: 'https://image',
    image_mobile: 'https://image',
    name: 'Булочка № 2',
    price: 10,
    proteins: 10,
    type: 'bun',
    __v: 1,
    _id: '2',
}]

const newArrayMainIngredient = [{
    calories: 10,
    carbohydrates: 10,
    fat: 10,
    image: 'https://image',
    image_large: 'https://image',
    image_mobile: 'https://image',
    name: 'Булочка',
    price: 10,
    proteins: 10,
    type: 'bun',
    __v: 1,
    _id: '1',
},
{
    calories: 10,
    carbohydrates: 10,
    fat: 10,
    image: 'https://image',
    image_large: 'https://image',
    image_mobile: 'https://image',
    name: 'Булочка № 2',
    price: 10,
    proteins: 10,
    type: 'bun',
    __v: 1,
    _id: '2',
}]


const watchIngredient = {
    calories: 10,
    carbohydrates: 10,
    fat: 10,
    image: 'https://image',
    image_large: 'https://image',
    image_mobile: 'https://image',
    name: 'Булочка',
    price: 10,
    proteins: 10,
    type: 'bun',
    __v: 1,
    _id: '1',
}

describe('test ingredient reducer', () => {
    it('test initial state reducer', () => {
        expect(rootReducer(undefined, {})).toEqual(initialState)
    })

    it('test get all ingredients',() => {
        expect(rootReducer(initialState, {
              type: types.GET_ALL_INGREDIENTS,
              items: arrayIngredient
            })).toEqual({
              ...initialState,
              ingredients: arrayIngredient,
            })
    });

    it('test watch ingredient',() => {
        expect(rootReducer(initialState, {
            type: types.WATCH_INGREDIENTS,
            data: watchIngredient
        })).toEqual({
            ...initialState,
            watchIngredients: watchIngredient,
        })
    });

    it('test delete watch ingredient',() => {
        expect(rootReducer({
          ...initialState,
          watchIngredients: watchIngredient,
        }, {
            type: types.DELETE_WATCH_INGREDIENTS,
        })).toEqual(initialState)
    });

    it('test get and update order',() => {
        expect(rootReducer(initialState, {
            type: types.GET_AND_UPDATE_ORDER,
            number: '1',
            name: 'burger',
        })).toEqual({
            ...initialState,
            order: {
              number: '1',
              name: 'burger',
            },
        })
    });

    it('test get constructor main ingredient',() => {
        expect(rootReducer({
            ...initialState,
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [],
                ingredients: [
                  {
                    details: arrayIngredient[0],
                    key: '1'
                  }
                ]
            },
        }, {
            type: types.GET_CONSTRUCTOR_MAIN_INGREDIENTS,
            item: {id: '2'},
            key: '2',
        })).toEqual({
            ...initialState,
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [],
                ingredients: [
                    {
                    details: arrayIngredient[0],
                    key: '1'
                    },
                    {
                    details: arrayIngredient[1],
                    key: '2'
                    }
                ]
            },
        })
    });

    it('test get constructor buns ingredient',() => {
        expect(rootReducer({
            ...initialState,
            ingredients: arrayIngredient,
        }, {
            type: types.GET_CONSTRUCTOR_BUNS_INGREDIENTS,
            item: {id: '1'},
        })).toEqual({
            ...initialState,
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [arrayIngredient[0]],
                ingredients: [
                    ...initialState.ingredientsInConstructor.ingredients,
                ]
            },
        })
    });

    it('test delete constructor main ingredient',() => {
        expect(rootReducer({
            ...initialState,
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [],
                ingredients: [
                  {
                    details: arrayIngredient[0],
                    key: '1'
                  },
                  {
                    details: arrayIngredient[1],
                    key: '2'
                  }
                ]
            },
        }, {
            type: types.DELETE_CONSTRUCTOR_MAIN_INGREDIENTS,
            key: '2',
        })).toEqual({
            ...initialState,
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [],
                ingredients: [
                    {
                    details: arrayIngredient[0],
                    key: '1'
                    },
                ]
            },
        })
    });

    it('test update constructor main ingredient',() => {
        expect(rootReducer({
            ...initialState,
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [],
                ingredients: [
                  {
                    details: arrayIngredient[0],
                    key: '1'
                  },
                  {
                    details: arrayIngredient[1],
                    key: '2'
                  }
                ]
            },
        }, {
            type: types.UPDATE_MAIN_INGREDIENTS,
            data: newArrayMainIngredient,
        })).toEqual({
            ...initialState,
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [],
                ingredients: newArrayMainIngredient
            },
        })
    });

    it('test delete constructor ingredients',() => {
        expect(rootReducer({
            ...initialState,
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [],
                ingredients: [
                  {
                    details: arrayIngredient[0],
                    key: '1'
                  },
                  {
                    details: arrayIngredient[1],
                    key: '2'
                  }
                ]
            },
        }, {
            type: types.DELETE_CONSTRUCTOR_INGREDIENTS,

        })).toEqual({
            ...initialState,
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [],
                ingredients: []
            },
        })
    });

    it('test loading ingredient details',() => {
        expect(rootReducer(initialState, {
            type: types.LOADING_INGREDIENT_DETAILS,
        })).toEqual({
            ...initialState,
            loadingIngredientDetails: true
        })
    }); 

    it('test finish loading ingredient details',() => {
        expect(rootReducer({
            ...initialState,
            loadingIngredientDetails: true,
        }, {
            type: types.FINISH_LOADING_INGREDIENT_DETAILS,
        })).toEqual({
            ...initialState,
            loadingIngredientDetails: false,
        })
    }); 
})