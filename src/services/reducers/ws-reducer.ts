import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_WATCH_ORDER,
    WS_DELETE_WATCH_ORDER,
  } from '../actions/ws-action';

import { TWsResponse } from '../../utils/typescriptTypes/wsResponse';
import { TWSAction } from '../actions/ws-actionCreators'; 
import { TIngredient } from '../../utils/typescriptTypes/ingredient'; 
  
  type TWSState = {
    startConnected: boolean;
    wsConnected: boolean;
    data: TWsResponse;
    watchOrder: {
        number: number | null , 
        name: string, 
        array: Array<TIngredient>, 
        infoDate: string, 
        price: number | null, 
        statusText: string,
        styleStatus: string,
    };
    error?: Event;
  }
  
  const initialState: TWSState = {
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
        array: [], 
        infoDate: '', 
        price: null, 
        statusText: '',
        styleStatus: ''
    },
  };
  

  export const wsReducer = (state = initialState, action: TWSAction): TWSState => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
            ...state,
                startConnected: true,
            };
        }
        case WS_CONNECTION_SUCCESS:
            return {
            ...state,
                startConnected: false,
                wsConnected: true,
                error: undefined,
            };
        case WS_GET_MESSAGE:
            return {
            ...state,
                error: undefined,
                data: action.payload
            };
        case WS_CONNECTION_ERROR:
            return {
            ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_CONNECTION_CLOSED:
            return {
            ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_WATCH_ORDER:
            return {
                ...state,
                watchOrder: {
                    number: action.payload.number, 
                    name: action.payload.name, 
                    array: action.payload.array, 
                    infoDate: action.payload.infoDate, 
                    price: action.payload.price, 
                    statusText: action.payload.statusText,
                    styleStatus: action.payload.styleStatus,
                }
            }
        case WS_DELETE_WATCH_ORDER: 
            return {
                ...state,
                watchOrder: {
                    number: null, 
                    name: '', 
                    array: [], 
                    infoDate: '', 
                    price: null, 
                    statusText: '',
                    styleStatus: '',
                }
            }
        default:
            return state;
    }
  };