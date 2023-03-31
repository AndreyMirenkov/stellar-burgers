import { rootReducer } from "./reducers";
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
        expect(rootReducer(undefined, {})).toEqual({
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
        })
    })

    it('test get all ingredients',() => {
        expect(rootReducer({
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
        }, {
            type: types.GET_ALL_INGREDIENTS,
            items: arrayIngredient
        })).toEqual({
            ingredients: arrayIngredient,
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
        })
    });

    it('test watch ingredient',() => {
        expect(rootReducer({
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
        }, {
            type: types.WATCH_INGREDIENTS,
            data: watchIngredient
        })).toEqual({
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
            watchIngredients: watchIngredient,
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        })
    });

    it('test delete watch ingredient',() => {
        expect(rootReducer({
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
        }, {
            type: types.DELETE_WATCH_INGREDIENTS,
        })).toEqual({
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
        })
    });

    it('test get and update order',() => {
        expect(rootReducer({
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
        }, {
            type: types.GET_AND_UPDATE_ORDER,
            number: '1',
            name: 'burger',
        })).toEqual({
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
              number: '1',
              name: 'burger',
            },
            loadingIngredientDetails: false
        })
    });

    it('test get constructor main ingredient',() => {
        expect(rootReducer({
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
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        }, {
            type: types.GET_CONSTRUCTOR_MAIN_INGREDIENTS,
            item: {id: '2'},
            key: '2',
        })).toEqual({
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
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        })
    });

    it('test get constructor buns ingredient',() => {
        expect(rootReducer({
            ingredients: arrayIngredient,
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
        }, {
            type: types.GET_CONSTRUCTOR_BUNS_INGREDIENTS,
            item: {id: '1'},
        })).toEqual({
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [arrayIngredient[0]],
                ingredients: [
                    {
                        details: [],
                        key: null,
                    }
                ]
            },
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        })
    });

    it('test delete constructor main ingredient',() => {
        expect(rootReducer({
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
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        }, {
            type: types.DELETE_CONSTRUCTOR_MAIN_INGREDIENTS,
            key: '2',
        })).toEqual({
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
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        })
    });

    it('test update constructor main ingredient',() => {
        expect(rootReducer({
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
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        }, {
            type: types.UPDATE_MAIN_INGREDIENTS,
            data: newArrayMainIngredient,
        })).toEqual({
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [],
                ingredients: newArrayMainIngredient
            },
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        })
    });

    it('test delete constructor ingredients',() => {
        expect(rootReducer({
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
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        }, {
            type: types.DELETE_CONSTRUCTOR_INGREDIENTS,

        })).toEqual({
            ingredients: arrayIngredient,
            ingredientsInConstructor: {
                buns: [],
                ingredients: []
            },
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        })
    });

    it('test loading ingredient details',() => {
        expect(rootReducer({
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
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        }, {
            type: types.LOADING_INGREDIENT_DETAILS,
        })).toEqual({
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
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: true
        })
    }); 

    it('test finish loading ingredient details',() => {
        expect(rootReducer({
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
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        }, {
            type: types.FINISH_LOADING_INGREDIENT_DETAILS,
        })).toEqual({
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
            watchIngredients: {},
            order: {
              number: null,
              name: null,
            },
            loadingIngredientDetails: false
        })
    }); 
})