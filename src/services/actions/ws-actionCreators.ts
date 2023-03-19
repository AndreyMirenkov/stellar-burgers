import { WS_CONNECTION_START, 
    WS_CONNECTION_SUCCESS, 
    WS_GET_MESSAGE, 
    WS_SEND_MESSAGE, 
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_WATCH_ORDER,
    WS_DELETE_WATCH_ORDER } from "./ws-action";

import { TWsResponse } from "../../utils/typescriptTypes/wsResponse";
import { TDataWatchOrder } from "../../utils/typescriptTypes/watchOrder";


export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START,
    readonly payload: string,
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS,
    readonly payload?: any,
}

export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE,
    readonly payload: TWsResponse,
}

export interface IWsSendMessage {
    readonly type: typeof WS_SEND_MESSAGE,
    readonly payload: any,
}

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR,
    readonly payload?: any,
}

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED,
    readonly payload?: any,
}

export interface IWsWatchOrder {
    readonly type: typeof WS_WATCH_ORDER,
    readonly payload: TDataWatchOrder
}

export interface IWsDeleteWatchOrder {
    readonly type: typeof WS_DELETE_WATCH_ORDER,
    readonly payload?: any
}

export type TWSAction = | IWsConnectionStart 
| IWsConnectionSuccess 
| IWsGetMessage 
| IWsSendMessage 
| IWsConnectionError 
| IWsConnectionClosed 
| IWsWatchOrder 
| IWsDeleteWatchOrder;



export const wsConnectionStart = (payload: string): IWsConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        payload
    }
}

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
    return {
        type: WS_CONNECTION_SUCCESS,
    }
}
export const wsGetMessage = (payload: TWsResponse): IWsGetMessage => {
    return {
        type: WS_GET_MESSAGE,
        payload,
    }
}

export const wsSendMessage = (payload: any): IWsSendMessage => {
    return {
        type: WS_SEND_MESSAGE,
        payload,
    }
}

export const wsConnectionError = (): IWsConnectionError => {
    return {
        type: WS_CONNECTION_ERROR,
    }
}

export const wsConnectionClosed = (): IWsConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED,
    }
}

export const wsWatchOrder = (payload: TDataWatchOrder): IWsWatchOrder => {
        return {
            type: WS_WATCH_ORDER,
            payload
        }
}

export const wsDeleteWatchOrder = (): IWsDeleteWatchOrder => {
    return {
        type: WS_DELETE_WATCH_ORDER,
    }
}
