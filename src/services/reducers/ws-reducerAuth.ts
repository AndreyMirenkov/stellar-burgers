import { WS_AUTH_CONNECTION_START, 
    WS_AUTH_CONNECTION_SUCCESS, 
    WS_AUTH_GET_MESSAGE, 
    WS_AUTH_SEND_MESSAGE, 
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_WATCH_ORDER,
    WS_AUTH_DELETE_WATCH_ORDER } from "../actions/ws-authAction";

import { TWsResponse } from '../../utils/typescriptTypes/wsResponse';
import { TWSAuthAction } from '../actions/ws-authActionCreators'; 
import { TIngredient } from '../../utils/typescriptTypes/ingredient'; 
  
type TData = {
    ingredient: TIngredient;
    count: number;
}

  type TWSState = {
    startConnected: boolean;
    wsConnected: boolean;
    data: TWsResponse;
    watchOrder: {
        number: number | null , 
        name: string, 
        data: Array<TData>, 
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
        data: [], 
        infoDate: '', 
        price: null, 
        statusText: '',
        styleStatus: ''
    },
  };
  

  export const wsAuthReducer = (state = initialState, action: TWSAuthAction): TWSState => {
    switch (action.type) {
        case WS_AUTH_CONNECTION_START: {
            return {
            ...state,
                startConnected: true,
            };
        }
        case WS_AUTH_CONNECTION_SUCCESS:
            return {
            ...state,
                startConnected: false,
                wsConnected: true,
                error: undefined,
            };
        case WS_AUTH_GET_MESSAGE:
            return {
            ...state,
                error: undefined,
                data: action.payload
            };
        case WS_AUTH_CONNECTION_ERROR:
            return {
            ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_AUTH_CONNECTION_CLOSED:
            return {
            ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_AUTH_WATCH_ORDER:
            return {
                ...state,
                watchOrder: {
                    number: action.payload.number, 
                    name: action.payload.name, 
                    data: action.payload.data, 
                    infoDate: action.payload.infoDate, 
                    price: action.payload.price, 
                    statusText: action.payload.statusText,
                    styleStatus: action.payload.styleStatus,
                }
            }
        case WS_AUTH_DELETE_WATCH_ORDER: 
            return {
                ...state,
                watchOrder: {
                    number: null, 
                    name: '', 
                    data: [], 
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