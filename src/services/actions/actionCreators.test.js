import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from './action';
import * as actions from './actionCreators';
import { BASE_URL } from '../../utils/Api/api';

describe('ingredient actions test', () => {
    const fakeIngredientsData = {
        success: true,
        data: [{ number: '1', name: 'name' }],
      };

      const fakeOrderData = {
        success: true,
        data: { number: '1', name: 'name' },
      };

      beforeEach(() => {
        jest.resetAllMocks();
        window.alert = jest.fn();
      });

    it('test get ingredient action',() => {
        const list = [{id: 1, name: 'name'},{id: 2, name: 'name1'}];

        const expectedAction = {
            type: types.GET_ALL_INGREDIENTS,
            items: list
        }

        expect(actions.getIngredients(list)).toEqual(expectedAction);
    });

    it('test get constructor buns ingredient action',() => {
        const id = '12345';

        const expectedAction = {
            type: types.GET_CONSTRUCTOR_BUNS_INGREDIENTS,
            item: id
        }

        expect(actions.getConstructorBunsIngredients(id)).toEqual(expectedAction);
    });

    it('test get constructor main ingredient action',() => {
        const id = '12345';
        const key = '1';

        const expectedAction = {
            type: types.GET_CONSTRUCTOR_MAIN_INGREDIENTS,
            item: id,
            key
        }

        expect(actions.getConstructorMainIngredients(id,key)).toEqual(expectedAction);
    });

    it('test delete constructor main ingredient action',() => {
        const key = '1';

        const expectedAction = {
            type: types.DELETE_CONSTRUCTOR_MAIN_INGREDIENTS,
            key
        }

        expect(actions.deleteConstructorMainIngredient(key)).toEqual(expectedAction);
    });

    it('test watch ingredient action',() => {
        const item = [{id: 1, name: 'name'},{id: 2, name: 'name1'}]

        const expectedAction = {
            type: types.WATCH_INGREDIENTS,
            data: item,    
        }

        expect(actions.watchIngredient(item)).toEqual(expectedAction);
    });

    it('test delete watch ingredient action',() => {

        const expectedAction = {
            type: types.DELETE_WATCH_INGREDIENTS,
        }

        expect(actions.deleteWatchIngredient()).toEqual(expectedAction);
    });

    it('test get and updata order action',() => {
        const number = '1';
        const name = 'Вкусный бургер';

        const expectedAction = {
            type: types.GET_AND_UPDATE_ORDER,
            number,
            name,
        }

        expect(actions.getAndUpdateOrder(number,name)).toEqual(expectedAction);
    });

    it('test update main ingredient action',() => {
        const data = {
            details: [{id: 1, name: 'name'},{id: 2, name: 'name1'}],
            key: '1',
        }

        const expectedAction = {
            type: types.UPDATE_MAIN_INGREDIENTS,
            data
        }

        expect(actions.updateMainIngredients(data)).toEqual(expectedAction);
    });

    it('test delete constructor ingredients action',() => {

        const expectedAction = {
            type: types.DELETE_CONSTRUCTOR_INGREDIENTS,
        }

        expect(actions.deleteConstructorIngredients()).toEqual(expectedAction);
    });

    it('test loading ingredient details action',() => {
      
        const expectedAction = {
            type: types.LOADING_INGREDIENT_DETAILS,
        }

        expect(actions.loadingIngredientDetails()).toEqual(expectedAction);
    });

    it('test finish loading ingredient details action',() => {
    
        const expectedAction = {
            type: types.FINISH_LOADING_INGREDIENT_DETAILS,
        }

        expect(actions.finishLoadingIngredientDetails()).toEqual(expectedAction);
    });

    it('test get api ingredients', async () => {
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(fakeIngredientsData),
          ok: true,
        });
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});
    
        const expectedAction = {
            type: types.GET_ALL_INGREDIENTS,
            items: fakeIngredientsData.data,
        }
    
        await store.dispatch(actions.getApiIngredients());
    
        expect(actions.getIngredients(fakeIngredientsData.data)).toEqual(expectedAction);
        expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/ingredients`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            }
        });
      });

      it('test get api number and name order', async () => {
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(fakeOrderData),
          ok: true,
        });
        window.alert.mockClear();
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const store = mockStore({});
    
        const expectedAction = {
            type: types.GET_AND_UPDATE_ORDER,
            number: fakeOrderData.data.number,
            name: fakeOrderData.data.name,
        }
    
        await store.dispatch(actions.getApiNumberOrder(['1', '2']));
    
        expect(actions.getAndUpdateOrder(
            fakeOrderData.data.number, 
            fakeOrderData.data.name))
            .toEqual(expectedAction);

        expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/orders`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                authorization: 'Bearer ',

            }, body: JSON.stringify({
                ingredients: ['1','2']
            })
        });
      });

});


  