import { wsReducer, initialState } from "./ws-reducer";
import * as types from '../actions/ws-action';

const wsData = {
    success: true,
    orders: [{_id: '1', name: 'name'}, {_id: '2', name: 'name1'}],
    total: 10,
    totalToday: 20,
}

const wsDataWatchOrder = {
    number: 10, 
    name: 'order1', 
    data: [{
        ingredient: {
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
        count: 1,
    }, {
        ingredient: {
            calories: 20,
            carbohydrates: 20,
            fat: 20,
            image: 'https://image1',
            image_large: 'https://image1',
            image_mobile: 'https://image1',
            name: 'Сыр',
            price: 20,
            proteins: 20,
            type: 'main',
            __v: 1,
            _id: '2',
        },
        count: 2,
    }, 
    ], 
    infoDate: '2023', 
    price: 100, 
    statusText: 'done',
    styleStatus: 'beautiful',
}

describe('test ws reducer', () => {
    it('test initial state reducer', () => {
        expect(wsReducer(undefined,{})).toEqual(initialState)
    });

    it('test ws connection start', () => {
        expect(wsReducer(initialState,{
            type: types.WS_CONNECTION_START,
        })).toEqual({
            ...initialState,
            startConnected: true,
        })
    });

    it('test ws connection success', () => {
        expect(wsReducer({
            ...initialState,
            startConnected: true,
        },{
            type: types.WS_CONNECTION_SUCCESS,
        })).toEqual({
            ...initialState,
            startConnected: false,
            wsConnected: true,
            error: undefined,
        })
    }); 

    it('test ws get message', () => {
        expect(wsReducer({
            ...initialState,
            wsConnected: true,
        },{
            type: types.WS_GET_MESSAGE,
            payload: wsData,
        })).toEqual({
            ...initialState,
            wsConnected: true,
            data: {
                success: wsData.success,
                orders: wsData.orders,
                total: wsData.total,
                totalToday: wsData.totalToday,
            },
            error: undefined,
        })
    });

    it('test ws connection error', () => {
        expect(wsReducer(initialState,{
            type: types.WS_CONNECTION_ERROR,
            payload: 'error'
        })).toEqual({
            ...initialState,
            error: 'error',
        })
    });

    it('test ws connection closed', () => {
        expect(wsReducer({
            ...initialState,
            wsConnected: true,
        },{
            type: types.WS_CONNECTION_CLOSED,
        })).toEqual(initialState)
    });

    it('test ws watch order closed', () => {
        expect(wsReducer({
            ...initialState,
            wsConnected: true,
        },{
            type: types.WS_WATCH_ORDER,
            payload: wsDataWatchOrder,
        })).toEqual({
            ...initialState,
            wsConnected: true,
            watchOrder: {
                number: wsDataWatchOrder.number, 
                name: wsDataWatchOrder.name, 
                data: wsDataWatchOrder.data, 
                infoDate: wsDataWatchOrder.infoDate, 
                price: wsDataWatchOrder.price, 
                statusText: wsDataWatchOrder.statusText,
                styleStatus: wsDataWatchOrder.styleStatus,
            },
        })
    });

    it('test ws delete watch order', () => {
        expect(wsReducer({
            ...initialState,
            wsConnected: true,
            watchOrder: {
                number: wsDataWatchOrder.number, 
                name: wsDataWatchOrder.name, 
                data: wsDataWatchOrder.data, 
                infoDate: wsDataWatchOrder.infoDate, 
                price: wsDataWatchOrder.price, 
                statusText: wsDataWatchOrder.statusText,
                styleStatus: wsDataWatchOrder.styleStatus,
            },
        },{
            type: types.WS_DELETE_WATCH_ORDER,
        })).toEqual({
            ...initialState,
            wsConnected: true,
        })
    });

})