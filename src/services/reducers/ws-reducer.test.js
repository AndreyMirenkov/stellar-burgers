import { wsReducer } from "./ws-reducer";
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
        expect(wsReducer(undefined,{})).toEqual({
            startConnected: false,
            wsConnected: false,
            data: {
                success: false,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
        })
    });

    it('test ws connection start', () => {
        expect(wsReducer({
            startConnected: false,
            wsConnected: false,
            data: {
                success: false,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
        },{
            type: types.WS_CONNECTION_START,
        })).toEqual({
            startConnected: true,
            wsConnected: false,
            data: {
                success: false,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
        })
    });

    it('test ws connection success', () => {
        expect(wsReducer({
            startConnected: true,
            wsConnected: false,
            data: {
                success: false,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
        },{
            type: types.WS_CONNECTION_SUCCESS,
        })).toEqual({
            startConnected: false,
            wsConnected: true,
            data: {
                success: false,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
            error: undefined,
        })
    }); 

    it('test ws get message', () => {
        expect(wsReducer({
            startConnected: false,
            wsConnected: true,
            data: {
                success: false,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
        },{
            type: types.WS_GET_MESSAGE,
            payload: wsData,
        })).toEqual({
            startConnected: false,
            wsConnected: true,
            data: {
                success: wsData.success,
                orders: wsData.orders,
                total: wsData.total,
                totalToday: wsData.totalToday,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
            error: undefined,
        })
    });

    it('test ws connection error', () => {
        expect(wsReducer({
            startConnected: false,
            wsConnected: false,
            data: {
                success: null,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
        },{
            type: types.WS_CONNECTION_ERROR,
            payload: 'error'
        })).toEqual({
            startConnected: false,
            wsConnected: false,
            data: {
                success: null,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
            error: 'error',
        })
    });

    it('test ws connection closed', () => {
        expect(wsReducer({
            startConnected: false,
            wsConnected: true,
            data: {
                success: null,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
        },{
            type: types.WS_CONNECTION_CLOSED,
        })).toEqual({
            startConnected: false,
            wsConnected: false,
            data: {
                success: null,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
        })
    });

    it('test ws watch order closed', () => {
        expect(wsReducer({
            startConnected: false,
            wsConnected: true,
            data: {
                success: null,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
        },{
            type: types.WS_WATCH_ORDER,
            payload: wsDataWatchOrder,
        })).toEqual({
            startConnected: false,
            wsConnected: true,
            data: {
                success: null,
                orders: [],
                total: null,
                totalToday: null,
            },
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
            startConnected: false,
            wsConnected: true,
            data: {
                success: null,
                orders: [],
                total: null,
                totalToday: null,
            },
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
            startConnected: false,
            wsConnected: true,
            data: {
                success: null,
                orders: [],
                total: null,
                totalToday: null,
            },
            watchOrder: {
                number: null, 
                name: '', 
                data: [], 
                infoDate: '', 
                price: null, 
                statusText: '',
                styleStatus: ''
            },
        })
    });

})